import { urlBaseAPI, userKey } from "../../global.js"

const getToken = () => {
    const storedUser = JSON.parse(localStorage.getItem(userKey))
    return storedUser?.token || null
}

const accountsActions = {
    obterContas: async (dispatch) => {
        const token = getToken()
        if(!token) {
            console.error("Token não encontrado")
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Token não encontrado" } })
            return
        }

        try {
            const response = await fetch(`${urlBaseAPI}/contas`, { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                }
            })

            if(!response.ok) {
                throw new Error(`Erro ${response.status}: ${await response.text()}`)
            }
            const data = await response.json()
            dispatch({ type: 'obterContas', payload: { contas: data } })
        } catch (error) {
            console.error("Erro ao obter contas: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
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