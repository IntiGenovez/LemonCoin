module.exports = app => {
    const { existeOuErro } = app.api.validacao

    const salvar = async (req, res) => {
        const movimentacao = { ...req.body }
        movimentacao.usuarioId = req.user.id
        if (req.params.id) movimentacao.id = req.params.id

        try {
            existeOuErro(movimentacao.valor, "Valor não informado")
            existeOuErro(movimentacao.data, "Data não informada")
            existeOuErro(movimentacao.usuarioId, "Usuário não informado")
            existeOuErro(movimentacao.contaId, "Conta não informada")
            existeOuErro(movimentacao.categoriaId, "Categoria não informada")
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (movimentacao.id) {
            console.log(movimentacao)
            app.bd('movimentacoes')
                .update(movimentacao)
                .where({ id: movimentacao.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.bd('movimentacoes')
                .insert(movimentacao)
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
            const registroDeletado = await app.bd('movimentacoes')
                .where({ id: req.params.id }).del()
            existeOuErro(registroDeletado, "Movimentação não encontrada")

            res.status(204).send()
        } catch (msg) {
            console.log(msg)
            return res.status(400).send(msg)
        }
    }

    const obter = (req, res) => {
        app.bd('movimentacoes')
            .join('contas', 'movimentacoes.contaId', '=', 'contas.id')
            .join('categorias', 'movimentacoes.categoriaId', '=', 'categorias.id')
            .join('usuarios', 'movimentacoes.usuarioId', '=', 'usuarios.id')
            .select('movimentacoes.*')
            .select('contas.nome as conta')
            .select('categorias.nome as categoria')
            .select('usuarios.nome as usuario')
            .then(movimentacoes => res.json(movimentacoes))        
            .catch(err => res.status(500).send(err))
    }

    const obterPorIddoUsuario = (req, res) => {
        app.bd('movimentacoes')
            .join('contas', 'movimentacoes.contaId', '=', 'contas.id')
            .join('categorias', 'movimentacoes.categoriaId', '=', 'categorias.id')
            .join('usuarios', 'movimentacoes.usuarioId', '=', 'usuarios.id')
            .select('movimentacoes.*')
            .select('contas.nome as conta')
            .select('categorias.nome as categoria')
            .select('usuarios.nome as usuario')
            .where('movimentacoes.usuarioId', req.user.id)
            .then(movimentacoes => res.json(movimentacoes))        
            .catch(err => res.status(500).send(err))
    }

    return { salvar, obter, deletar, obterPorIddoUsuario }
}