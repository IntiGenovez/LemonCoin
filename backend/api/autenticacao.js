const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.senha) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const usuario = await app.bd('usuarios')
            .where({ email: req.body.email }).first()

        if (!usuario) return res.status(400).send('Usuário não encontrado!')

        const senhaCorreta = bcrypt.compareSync(req.body.senha, usuario.senha)
        if (!senhaCorreta) return res.status(401).send('Senha incorreta!')

        const agora = Math.floor(Date.now() / 1000)

        const payload = {
            id: usuario.id,
            nome: usuario.nome,
            iat: agora,
            exp: agora + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload, 
            token: jwt.encode(payload, authSecret)
        })
    }

    const validarToken = async (req, res) => {
        const dadosDoUsuario = req.body
        try {
            if(dadosDoUsuario) {
                const token = jwt.decode(dadosDoUsuario.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            // problema com o token
        }

        res.send(false)
    }

    const obterDadosUsuario = (req, res) => {
        const token = req.headers['authorization']?.split(' ')[1]

        if (!token) {
            return res.status(401).send('Token não encontrado!')
        }

        try {
            const tokenDecodificado = jwt.decode(token, authSecret)
            const usuarioId = tokenDecodificado.id

            app.bd('usuarios')
                .select('id', 'nome', 'email', 'genero', 'telefone')
                .where({ id: usuarioId })
                .first()
                .then(usuario => {
                    if (!usuario) {
                        return res.status(400).send('Usuário não encontrado!')
                    }
                    res.json(usuario)
                })
                .catch(err => res.status(500).send(err))
        } catch (e) {
            return res.status(401).send('Token inválido!')
        }
    }


    return { signin, validarToken, obterDadosUsuario }
}