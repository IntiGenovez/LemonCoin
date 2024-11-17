import { urlBaseAPI, userKey } from "../../global.js"
const jwt = JSON.parse(localStorage.getItem(userKey))?.token

const accountsActions = {
    obterContas: (dispatch) => {
        fetch(`${urlBaseAPI}/contas`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            }
         })
            .then(resp => resp.json())
            .then(data => dispatch({ type: 'obterContas', payload: { contas: data } }))
    },
    atualizarConta: (dispatch, conta) => {
        fetch(`${urlBaseAPI}/contas/${conta.id}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            },
            body: JSON.stringify(conta)
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`Erro na requisição: ${resp.statusText}`)
            }
            return resp.status === 204 ? null : resp.json()
        })    
        .then(_ => {
            dispatch({ type: 'atualizarConta', payload: { conta } })
            console.log("Conta atualizada com sucesso")
        })
        .catch(error => console.error("Erro ao atualizar conta:", error))
    },
    deletarConta: (dispatch, conta) => {
        fetch(`${urlBaseAPI}/contas/${conta.id}`, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            }
        })
        .then(resp => {
            if (!resp.ok) throw new Error(`Erro na requisição: ${resp.statusText}`)
            return resp.status === 204 ? null : resp.json()
        })    
        .then(_ => {
            dispatch({ type: 'deletarConta', payload: { conta } })
            console.log("Conta deletada com sucesso")
        })
        .catch(error => console.error("Erro ao deletar conta:", error))
    },
    adicionarConta: (dispatch, conta) => {
        fetch(`${urlBaseAPI}/contas`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            },
            body: JSON.stringify(conta)
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`Erro na requisição: ${resp.statusText}`)
            }
            return resp.json()
        })    
        .then(data => {
            dispatch({ type: 'adicionarConta', payload: { conta, id: data } })
            console.log("Conta adicionada com sucesso")
        })
        .catch(error => console.error("Erro ao adicionar conta:", error))
    }
}

export default accountsActions