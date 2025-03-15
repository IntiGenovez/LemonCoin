import { urlBaseAPI, userKey } from "../../global.js"

const getToken = () => {
    const storedUser = JSON.parse(localStorage.getItem(userKey))
    return storedUser?.token || null
}

const movementsActions = {
    obterMovimentacoes: async (dispatch) => {
        const token = getToken()

        if(!token) {
            console.error("Token não encontrado")
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Token não encontrado" } })
            return
        }

        try {
            const response = await fetch(`${urlBaseAPI}/movimentacoes`, {
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
            dispatch({ type: 'obterMovimentacoes', payload: { movimentacoes: data } })
        } catch (error) {
            console.error("Erro ao obter movimentações: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }




        // fetch(`${urlBaseAPI}/movimentacoes`, { 
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `bearer ${jwt}`
        //     }
        // })
        // .then(resp => resp.json())
        // .then(movimentacoes => dispatch({ type: 'obterMovimentacoes', payload: { movimentacoes } }))
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
            if (!resp.ok) {
                return resp.text().then(msg => {
                    throw new Error(msg)
                })
            }
            return resp.status === 204 ? null : resp.json
        })
        .then(_ => {
            dispatch({ type: 'deletarMovimentacao', payload: { id } })
            console.log('Movimentação deletada com sucesso')
        })
        .catch(error => dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } }))
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
            if (!resp.ok) {
                return resp.text().then(msg => {
                    throw new Error(msg)
                })
            }
            return resp.status === 204 ? null : resp.json()
        })
        .then(_ => {
            dispatch({ type: 'atualizarMovimentacao', payload: { movimentacao }})
            console.log("Movimentação atualizada com sucesso")
        })
        .catch(error => dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } }))
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
                return resp.text().then(msg => {
                    throw new Error(msg)
                })
            }
            return resp.json()
        })    
        .then(data => {
            dispatch({ type: 'adicionarMovimentacao', payload: { movimentacao, id: data } })
            console.log("Movimentação adicionada com sucesso")
        })
        .catch(error => dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } }))
    }
}

export default movementsActions