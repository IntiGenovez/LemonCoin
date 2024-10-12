const bcrypt = require("bcrypt-nodejs")

module.exports = app => {
    const { existeOuErro, naoExisteOuErro, igualOuErro } = app.api.validacao
    const criptografarSenha = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const salvar = async (req, res) => {
        const usuario = { ...req.body }
        if (req.params.id) usuario.id = req.params.id

        try {
            existeOuErro(usuario.nome, 'Nome não informado')
            existeOuErro(usuario.email, 'Email não informado')
            existeOuErro(usuario.senha, 'Senha não informado')
            existeOuErro(usuario.confirmarSenha, 'Confirmar senha não informado')
            igualOuErro(usuario.senha, usuario.confirmarSenha, 'Senhas diferentes')
            existeOuErro(usuario.telefone, 'Telefone não informado')
            existeOuErro(usuario.genero, 'Gênero não informado')

            const usuarioDoBD = await app.bd('usuarios')
                .where({ email: usuario.email }).first()
            if (!usuario.id) naoExisteOuErro(usuarioDoBD, 'Usuário já cadastrado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        usuario.senha = criptografarSenha(usuario.senha)
        delete usuario.confirmarSenha

        if (usuario.id) {
            app.bd('usuarios')
                .update(usuario)
                .where({ id: usuario.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.bd('usuarios')
                .insert(usuario)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.bd('usuarios')
            .select('id', 'nome', 'email')
            .then(usuarios => res.json(usuarios))
            .catch(err => res.status(500).send(err))
    }

    return { salvar, get }
}