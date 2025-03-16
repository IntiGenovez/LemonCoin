import { fetchAPI } from "./fetchAPI"

const accountsActions = {
    obterContas: async (dispatch) => {
        try {
            const data = await fetchAPI("contas")
            dispatch({ type: 'obterContas', payload: { contas: data } })
        } catch (error) {
            console.error("Erro ao obter contas: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
    },
    atualizarConta: async (dispatch, conta) => {
        try {
            await fetchAPI(`contas/${conta.id}`, "PUT", conta)
            dispatch({ type: 'atualizarConta', payload: { conta } })
        } catch (error) {
            console.error("Erro ao atualizar conta: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
    },
    deletarConta: async (dispatch, conta) => {
        try {
            await fetchAPI(`contas/${conta.id}`, "DELETE")
            dispatch({ type: 'deletarConta', payload: { conta } })
        } catch (error) {
            console.error("Erro ao deletar conta: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
    },
    adicionarConta: async (dispatch, conta) => {
        try {
            const id = await fetchAPI("contas", "POST", conta)
            dispatch({ type: 'adicionarConta', payload: { conta, id } })
        } catch (error) {
            console.error("Erro ao adicionar conta: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
    }
}

export default accountsActions