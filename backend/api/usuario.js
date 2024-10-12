const bcrypt = require("bcrypt-nodejs")

module.exports = app => {
    const { existeOuErro, naoExisteOuErro, igualOuErro, validarGenero, validarEmail, validarTelefone } = app.api.validacao
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
            validarEmail(usuario.email, 'Email não tem um formato válido')
            existeOuErro(usuario.senha, 'Senha não informado')
            existeOuErro(usuario.confirmarSenha, 'Confirmar senha não informado')
            igualOuErro(usuario.senha, usuario.confirmarSenha, 'Senhas diferentes')
            existeOuErro(usuario.telefone, 'Telefone não informado')
            validarTelefone(usuario.telefone, 'Telefone não tem um formato válido')
            existeOuErro(usuario.genero, 'Gênero não informado')
            validarGenero(usuario.genero, 'Gênero não é um valor válido')

            let usuarioDoBD = await app.bd('usuarios')
                .where({ email: usuario.email }).first()
            if (!usuario.id) naoExisteOuErro(usuarioDoBD, 'Email já cadastrado')
            usuarioDoBD = await app.bd('usuarios')
                .where({ telefone: usuario.telefone }).first()
            if (!usuario.id) naoExisteOuErro(usuarioDoBD, 'Telefone já cadastrado')
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

    const obter = (req, res) => {
        app.bd('usuarios')
            .select('id', 'nome', 'email')
            .then(usuarios => res.json(usuarios))
            .catch(err => res.status(500).send(err))
    }

    const obterPorId = (req, res) => {
        app.bd('usuarios')
            .select('id', 'nome', 'email')
            .where({ id: req.params.id }).first()
            .then(usuario => res.json(usuario))
            .catch(err => res.status(500).send(err))
    }

    return { salvar, obter, obterPorId }
}