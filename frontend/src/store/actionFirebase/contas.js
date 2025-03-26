import { firestore } from "./firebase"

const objetoValido = objeto => {
    for (const valor of Object.values(objeto)) {
        if (!valor) throw new Error('Preencha Todos Os Campos')
    }
}

const handleError = (dispatch, error, link) => {
    console.error(error.message)
    dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, titulo: 'ATENÇÃO', link } })
}

const accountsActions = {
    atualizarConta: async (dispatch, conta) => {
        try {
            objetoValido(conta)
            await firestore('contas', 'update', conta.id, conta)
            // dispatch({ type: 'atualizarConta', payload: { conta } })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta atualizada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
            return true
        } catch (error) {
            handleError(dispatch, error, '/editar-conta/' + conta.id)
            return false
        }
    },
    deletarConta: async (dispatch, conta) => {
        try {
            await firestore('contas', 'delete', conta.id)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta deletada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
            return true
        } catch (error) {
            handleError(dispatch, error, '/contas')
            return false
        }
    },
    adicionarConta: async (dispatch, conta) => {
        try {
            objetoValido(conta)
            await firestore('contas', 'save', conta.id, conta)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta cadastrada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
            return true
        } catch (error) {
            handleError(dispatch, error, '/adicionar-conta')
            return false
        }
    }
}

export default accountsActions