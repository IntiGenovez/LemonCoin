import { firestore } from "./firebase"

const handleError = (dispatch, error, link) => {
    console.error(error.message)
    dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, titulo: 'ATENÇÃO', link } })
}

const accountsActions = {
    obterContas: async (dispatch) => {
        try {
            const data = await firestore('contas', 'read')
            dispatch({ type: 'obterContas', payload: { contas: data } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    },
    atualizarConta: async (dispatch, conta) => {
        try {
            await firestore('contas', 'update', conta)
            dispatch({ type: 'atualizarConta', payload: { conta } })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta atualizada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    },
    deletarConta: async (dispatch, conta) => {
        try {
            await firestore('contas', 'delete', conta.id)
            dispatch({ type: 'deletarConta', payload: { conta } })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta deletada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    },
    adicionarConta: async (dispatch, conta) => {
        try {
            const id = await firestore('contas', 'save', conta)
            dispatch({ type: 'adicionarConta', payload: { conta, id } })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta cadastrada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    }
}

export default accountsActions