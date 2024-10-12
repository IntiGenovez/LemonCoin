module.exports = app => {
    const { existeOuErro, naoExisteOuErro } = app.api.validacao

    const salvar = async (req, res) => {
        const conta = { ...req.body }
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