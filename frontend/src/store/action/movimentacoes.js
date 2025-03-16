import { fetchAPI } from "./fetchAPI.js"

const movementsActions = {
    obterMovimentacoes: async (dispatch) => {
        try {
            const data = await fetchAPI("movimentacoes")
            dispatch({ type: 'obterMovimentacoes', payload: { movimentacoes: data } })
        } catch (error) {
            console.error("Erro ao obter movimentações: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
    },
    ordenarMovimentacoes: (dispatch, seletorOrdenador, invertido) => {
        dispatch({ type: 'ordenarMovimentacoes', payload: { seletorOrdenador, invertido } })
    },
    deletarMovimentacao: async (dispatch, id) => {
        try {
            await fetchAPI(`movimentacoes/${id}`, "DELETE")
            dispatch({ type: 'deletarMovimentacao', payload: { id } })
        } catch (error) {
            console.error("Erro ao deletar movimentação: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
    },
    atualizarMovimentacao: async (dispatch, movimentacao) => {
        try {
            const movimentacaoToFetch = { ...movimentacao }
            delete movimentacaoToFetch.conta
            delete movimentacaoToFetch.categoria
            delete movimentacaoToFetch.usuario

            await fetchAPI(`movimentacoes/${movimentacaoToFetch.id}`, "PUT", movimentacaoToFetch)
            dispatch({ type: 'atualizarMovimentacao', payload: { movimentacao } })
        } catch (error) { 
            console.error("Erro ao atualizar movimentação: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
    },
    adicionarMovimentacao: (dispatch, movimentacao) => {
        try {
            const movimentacaoToFetch = { ...movimentacao }
            delete movimentacaoToFetch.conta
            delete movimentacaoToFetch.categoria
            delete movimentacaoToFetch.usuario

            const id = fetchAPI("movimentacoes", "POST", movimentacaoToFetch)
            dispatch({ type: 'adicionarMovimentacao', payload: { movimentacao, id } })
        } catch (error) {
            console.error("Erro ao adicionar movimentação: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
    }
}

export default movementsActions