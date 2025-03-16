import { fetchAPI, handleError } from "./fetchAPI.js"

const movementsActions = {
    obterMovimentacoes: async (dispatch) => {
        try {
            const data = await fetchAPI("movimentacoes")
            dispatch({ type: 'obterMovimentacoes', payload: { movimentacoes: data } })
        } catch (error) {
            handleError(dispatch, error, `${movimentacao.tipo.toLowerCase()}s`)
        }
    },
    ordenarMovimentacoes: (dispatch, seletorOrdenador, invertido) => {
        dispatch({ type: 'ordenarMovimentacoes', payload: { seletorOrdenador, invertido } })
    },
    deletarMovimentacao: async (dispatch, movimentacao) => {
        console.log(movimentacao)
        try {
            const id = movimentacao.id
            await fetchAPI(`movimentacoes/${id}`, "DELETE")
            dispatch({ type: 'deletarMovimentacao', payload: { id } })
        } catch (error) {
            handleError(dispatch, error, `${movimentacao.tipo.toLowerCase()}s`)
        }
    },
    atualizarMovimentacao: async (dispatch, movimentacao) => {
        try {
            const movimentacaoToFetch = { ...movimentacao }
            console.log(movimentacaoToFetch)
            delete movimentacaoToFetch.conta
            delete movimentacaoToFetch.categoria
            delete movimentacaoToFetch.usuario

            await fetchAPI(`movimentacoes/${movimentacaoToFetch.id}`, "PUT", movimentacaoToFetch)
            dispatch({ type: 'atualizarMovimentacao', payload: { movimentacao } })
        } catch (error) {
            handleError(dispatch, error, `${movimentacao.tipo.toLowerCase()}s`)
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
            handleError(dispatch, error, `${movimentacao.tipo.toLowerCase()}s`)
        }
    }
}

export default movementsActions