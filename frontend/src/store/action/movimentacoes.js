import { urlBaseAPI } from "../../global.js"

const movementsActions = {
    obterDespesas: (dispatch, id) => {
        fetch(`${urlBaseAPI}/${8}/movimentacoes`)
            .then(resp => resp.json())
            .then(despesas => dispatch({ type: 'obterDespesas', payload: { despesas } }))
    },
    ordenarDespesas: (dispatch, invertido) => {
        dispatch({ type: 'ordenarDespesas', payload: { invertido } })
    },
    removerDespesa: (dispatch, id) => {
        dispatch({ type: 'removerDespesa', payload: { id } })
    },
    atualizarDespesa: (dispatch, despesa) => {
        dispatch({ type: 'atualizarDespesa', payload: { despesa }})
    },
    adicionarDespesa: (dispatch, despesa) => {
        dispatch({ type: 'adicionarDespesa', payload: { despesa }})
    }
}

export default movementsActions