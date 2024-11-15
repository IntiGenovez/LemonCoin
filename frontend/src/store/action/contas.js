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
        dispatch({ type: 'atualizarConta', payload: { conta }})
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
            .then(resp => resp.json())
            .then(data => dispatch({ type: 'adicionarConta', payload: { conta: data }}))
        
    }
}

export default accountsActions