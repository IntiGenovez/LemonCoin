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
                return resp.text().then(msg => {
                    throw new Error(msg)
                })
            }
            return resp.status === 204 ? null : resp.json()
        })    
        .then(_ => {
            dispatch({ type: 'atualizarConta', payload: { conta } })
            console.log("Conta atualizada com sucesso")
        })
        .catch(error => dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } }))
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
            if (!resp.ok) {
                return resp.text().then(msg => {
                    throw new Error(msg)
                })
            }
            return resp.status === 204 ? null : resp.json()
        })    
        .then(_ => {
            dispatch({ type: 'deletarConta', payload: { conta } })
            console.log("Conta deletada com sucesso")
        })
        .catch(error => dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } }))
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
                return resp.text().then(msg => {
                    throw new Error(msg)
                })
            }
            return resp.json()
        })    
        .then(data => {
            dispatch({ type: 'adicionarConta', payload: { conta, id: data } })
            console.log("Conta adicionada com sucesso")
        })
        .catch(error => dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } }))
    }
}

export default accountsActions