module.exports = app => {
    const { existeOuErro, naoExisteOuErro } = app.api.validacao

    const salvar = async (req, res) => {
        const categoria = { ...req.body }
        categoria.usuarioId = req.user.id
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
                .returning('id')
                .then(ids => {
                    const id = ids[0]
                    res.json(id)
                })
                .catch(err => res.status(500).send(err))
        }
    }

    const deletar = async (req, res) => {
        try {
            existeOuErro(req.params.id, 'Código da categoria não infomado')

            const movimentacao = await app.bd('movimentacoes')
                .where({ categoriaId: req.params.id })

            naoExisteOuErro(movimentacao, 'Há movimentações associadas à categoria')

            const registroDeletado = await app.bd('categorias')
                .where({ id: req.params.id }).del()
            existeOuErro(registroDeletado, 'A categoria não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const obter = (req, res) => {
        app.bd('categorias')
            .join('usuarios', 'categorias.usuarioId', '=', 'usuarios.id')
            .select('categorias.*')
            .select('usuarios.nome as usuario_nome')
            .where('categorias.usuarioId', req.user.id)
            .then(categorias => res.json(categorias))
            .catch(err => res.status(500).send(err))
    }

    return { salvar, deletar, obter }
}