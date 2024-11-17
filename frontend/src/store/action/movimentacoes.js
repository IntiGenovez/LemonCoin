import { urlBaseAPI, userKey } from "../../global.js"
const jwt = JSON.parse(localStorage.getItem(userKey))?.token

const movementsActions = {
    obterMovimentacoes: (dispatch) => {
        fetch(`${urlBaseAPI}/movimentacoes`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            }
        })
        .then(resp => resp.json())
        .then(movimentacoes => dispatch({ type: 'obterMovimentacoes', payload: { movimentacoes } }))
    },
    ordenarMovimentacoes: (dispatch, seletorOrdenador, invertido) => {
        dispatch({ type: 'ordenarMovimentacoes', payload: { seletorOrdenador, invertido } })
    },
    deletarMovimentacao: (dispatch, id) => {
        fetch(`${urlBaseAPI}/movimentacoes/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "aplication/json",
                "Authorization": `bearer ${jwt}`
            }
        })
        .then(resp => {
            if (!resp.ok) throw new Error(`Erro na requisição ${resp.statusText}`)
            return resp.status === 204 ? null : resp.json
        })
        .then(_ => {
            dispatch({ type: 'deletarMovimentacao', payload: { id } })
            console.log('Movimentação deletada com sucesso')
        })
        .catch(error => console.log("Erro ao deletar movimentação: " + error))
    },
    atualizarMovimentacao: (dispatch, movimentacao) => {
        const movimentacaoToFetch = { ...movimentacao }
        delete movimentacaoToFetch.conta
        delete movimentacaoToFetch.categoria
        delete movimentacaoToFetch.usuario
        fetch(`${urlBaseAPI}/movimentacoes/${movimentacaoToFetch.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            },
            body: JSON.stringify(movimentacaoToFetch)
        })
        .then(resp => {
            if (!resp.ok) throw new Error(`Erro na requisição: ${resp.statusText}`)
            return resp.status === 204 ? null : resp.json()
        })
        .then(_ => {
            dispatch({ type: 'atualizarMovimentacao', payload: { movimentacao }})
            console.log("Movimentação atualizada com sucesso")
        })
        .catch(error => console.log("Erro ao atualizar movimentação: " + error))
    },
    adicionarMovimentacao: (dispatch, movimentacao) => {
        const movimentacaoToFetch = { ...movimentacao }
        delete movimentacaoToFetch.conta
        delete movimentacaoToFetch.categoria
        delete movimentacaoToFetch.usuario
        console.log(JSON.stringify(movimentacaoToFetch))
        fetch(`${urlBaseAPI}/movimentacoes`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            },
            body: JSON.stringify(movimentacaoToFetch)
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`Erro na requisição: ${resp.statusText}`)
            }
            return resp.json()
        })    
        .then(data => {
            dispatch({ type: 'adicionarMovimentacao', payload: { movimentacao, id: data } })
            console.log("Movimentação adicionada com sucesso")
        })
        .catch(error => console.error("Erro ao adicionar movimentação:", error))
    }
}

export default movementsActions