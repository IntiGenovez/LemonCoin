const { authSecret, auth } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const mailer = require('nodemailer')

module.exports = app => {
    const { existeOuErro, validarEmail, igualOuErro } = app.api.validacao
    const criptografarSenha = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

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

    const recuperarSenhaPedido = async (req, res) => {
        const email = req.body.email
        try {
            existeOuErro(email, 'Email não informado')
            validarEmail(email, 'Email não tem um formato válido')
            const usuario = await app.bd('usuarios')
                .where({ email: email }).first()

            existeOuErro(usuario, 'Usuário não existe')
            
            const token = jwt.encode({ email, exp: Date.now() + 3600000 }, authSecret )

            const resetLink = `http://localhost:5173/recuperar-senha?token=${token}`

            const config = {
                service: 'gmail',
                auth
            }

            const transporter = mailer.createTransport(config)

            const message = {
                from: 'lemoncoinfatec@gmail.com',
                to: email,
                subject: 'Recuperação de senha',
                text: `Clique no link para redefinir sua senha: ${resetLink}`
            }

            await transporter.sendMail(message, err => {
                if (err) {
                    console.log(err)
                    return res.status(500).send('Erro ao enviar email')
                }
                res.status(204).send()
            })
        } catch (msg) {
            console.log(msg)
            return res.status(400).send(msg)
        }
    }

    const recuperarSenha = async (req, res) => {
        const { token, novaSenha, confirmarNovaSenha  } = req.body
        try {
            existeOuErro(novaSenha, "Senha não informada")
            existeOuErro(confirmarNovaSenha, "Confirmar senha não informado")
            igualOuErro(novaSenha, confirmarNovaSenha, "Senhas não conferem")
            const decoded = jwt.decode(token, authSecret)
            novaSenha = criptografarSenha(novaSenha)

            await app.bd('usuarios')
                .update({ senha: novaSenha })
                .where({ email: decoded.email })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } catch (error) {
            res.status(400).send("Token inválido ou expirado")
        }
    }

    return { signin, validarToken, obterDadosUsuario, recuperarSenhaPedido, recuperarSenha }
}