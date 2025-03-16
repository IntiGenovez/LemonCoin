import { fetchAPI } from "./fetchAPI"

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
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    },
    deletarConta: async (dispatch, conta) => {
        try {
            await fetchAPI(`contas/${conta.id}`, "DELETE")
            dispatch({ type: 'deletarConta', payload: { conta } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    },
    adicionarConta: async (dispatch, conta) => {
        try {
            const id = await fetchAPI("contas", "POST", conta)
            dispatch({ type: 'adicionarConta', payload: { conta, id } })
        } catch (error) {
            handleError(dispatch, error, '/contas')
        }
    }
}

export default accountsActions