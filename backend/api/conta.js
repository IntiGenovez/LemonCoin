module.exports = app => {
    const { existeOuErro, naoExisteOuErro } = app.api.validacao

    const salvar = async (req, res) => {
        const conta = { ...req.body }
        conta.usuarioId = req.user.id
        if (req.params.id) conta.id = req.params.id

        try {
            existeOuErro(conta.nome, "Nome não informado")
            existeOuErro(conta.saldo, "Saldo não informado")
            existeOuErro(conta.usuarioId, "Usuário não informado")
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (conta.id) {
            app.bd('contas')
                .update(conta)
                .where({ id: conta.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.bd('contas')
                .insert(conta)
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
            existeOuErro(req.params.id, 'Código da conta não infomado')

            const movimentacao = await app.bd('movimentacoes')
                .where({ contaId: req.params.id })

            naoExisteOuErro(movimentacao, 'Há movimentações associadas à categoria')

            const registroDeletado = await app.bd('contas')
                .where({ id: req.params.id }).del()
            existeOuErro(registroDeletado, 'A conta não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const obterPorId = (req, res) => {
        app.bd('contas')
            .join('usuarios', 'contas.usuarioId', '=', 'usuarios.id')
            .select('contas.*')
            .select('usuarios.nome as usuario_nome')
            .where({ usuarioId: req.user.id })
            .then(contas => res.json(contas))
            .catch(err => res.status(500).send(err))
    }

    return { salvar, obterPorId, deletar }
}