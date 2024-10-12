module.exports = app => {
    const { existeOuErro, naoExisteOuErro } = app.api.validacao

    const salvar = async (req, res) => {
        const movimentacao = { ...req.body }
        if (req.params.id) movimentacao.id = req.params.id

        try {
            existeOuErro(movimentacao.valor, "Valor não informado")
            existeOuErro(movimentacao.recorrencia, "Recorrência não informada")
            existeOuErro(movimentacao.data, "Data não informada")
            existeOuErro(movimentacao.usuarioId, "Usuário não informado")
            existeOuErro(movimentacao.contaId, "Conta não informada")
            existeOuErro(movimentacao.categoriaId, "Categoria não informada")
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (movimentacao.id) {
            app.bd('movimentacoes')
                .update(movimentacao)
                .where({ id: movimentacao.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.bd('movimentacoes')
                .insert(movimentacao)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const deletar = async (req, res) => {

    }

    const obter = async (req, res) => {
        app.bd('movimentacoes')
            .select()
            .then(movimentacoes => res.json(movimentacoes))        
            .catch(err => res.status(500).send(err))
    }

    const obterPorId = async (req, res) => {

    }

    return { salvar, obter }
}