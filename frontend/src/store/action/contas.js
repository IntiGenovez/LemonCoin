import { fetchAPI } from "./fetchAPI"

const handleError = (dispatch, error, link) => {
    console.error(error.message)
    dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, titulo: 'ATENÇÃO', link } })
}

const accountsActions = {
    obterContas: async (dispatch) => {
        try {
            const data = await fetchAPI("contas")
            dispatch({ type: 'obterContas', payload: { contas: data } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    },
    atualizarConta: async (dispatch, conta) => {
        try {
            await fetchAPI(`contas/${conta.id}`, "PUT", conta)
            dispatch({ type: 'atualizarConta', payload: { conta } })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta atualizada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    },
    deletarConta: async (dispatch, conta) => {
        try {
            await fetchAPI(`contas/${conta.id}`, "DELETE")
            dispatch({ type: 'deletarConta', payload: { conta } })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta deletada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    },
    adicionarConta: async (dispatch, conta) => {
        try {
            const id = await fetchAPI("contas", "POST", conta)
            dispatch({ type: 'adicionarConta', payload: { conta, id } })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta cadastrada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    }
}

export default accountsActions