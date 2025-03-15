import { urlBaseAPI, userKey } from "../../global.js"

const getToken = () => {
    const storedUser = JSON.parse(localStorage.getItem(userKey))
    return storedUser?.token || null
}

const categoriesActions = {
    obterCategorias: async (dispatch) => {
        const token = getToken()
        if(!token) {
            console.error("Token não encontrado")
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Token não encontrado" } })
            return
        }

        try {
            const response = await fetch(`${urlBaseAPI}/categorias`, {
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
            dispatch({ type: 'obterCategorias', payload: { categorias: data } })
        } catch (error) {
            console.error("Erro ao obter categorias: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } })
        }
    },
    atualizarCategoria: (dispatch, categoria) => {
        fetch(`${urlBaseAPI}/categorias/${categoria.id}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            },
            body: JSON.stringify(categoria)
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
            dispatch({ type: 'atualizarCategoria', payload: { categoria } })
            console.log("Categoria atualizada com sucesso")
        })
        .catch(error => dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } }))
    },
    deletarCategoria: (dispatch, id) => {
        fetch(`${urlBaseAPI}/categorias/${id}`, { 
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
            dispatch({ type: 'deletarCategoria', payload: { categoria: { id } } })
            console.log("Categoria deletada com sucesso")
        })
        .catch(error => dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } }))
    },
    adicionarCategoria: (dispatch, categoria) => {
        const jwt = JSON.parse(localStorage.getItem(userKey))?.token
        fetch(`${urlBaseAPI}/categorias`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            },
            body: JSON.stringify(categoria)
        })
        .then(resp => {
            if (!resp.ok) {
                return resp.text().then(msg => {
                    throw new Error(msg)
                })
            }
            return resp.json()
        })    
        .then(id => {
            console.log('id: ' + id)
            dispatch({ type: 'adicionarCategoria', payload: { categoria, id } })
            console.log("Categoria adicionada com sucesso")
        })
        .catch(error => dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message } }))
    }
}

export default categoriesActions