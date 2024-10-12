module.exports = app => {
    const { existeOuErro, naoExisteOuErro } = app.api.validacao

    const salvar = async (req, res) => {
        const categoria = { ...req.body }
        if (req.params.id) categoria.id = req.params.id

        try {
            existeOuErro(categoria.nome, "Nome não informado")
            existeOuErro(categoria.usuarioId, "Usuário não informado")
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (categoria.id) {
            app.bd('categorias')
                .update(categoria)
                .where({ id: categoria.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.bd('categorias')
                .insert(categoria)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const deletar = async (req, res) => {

    }

    const obter = async (req, res) => {
        
    }

    const obterPorId = async (req, res) => {

    }

    return { salvar }
}