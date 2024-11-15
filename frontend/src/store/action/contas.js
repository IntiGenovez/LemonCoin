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
        console.log(JSON.stringify(conta))
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
                    throw new Error(`Erro na requisição: ${resp.statusText}`);
                }
                return resp.status === 204 ? null : resp.json();
            })    
            .then(_ => {
                dispatch({ type: 'adicionarConta', payload: { conta } });
                console.log("Conta adicionada com sucesso");
            })
            .catch(error => console.error("Erro ao adicionar conta:", error));
        
    }
}

export default accountsActions