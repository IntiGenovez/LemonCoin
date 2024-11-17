import { urlBaseAPI, userKey } from "../../global.js"
const jwt = JSON.parse(localStorage.getItem(userKey))?.token

const categoriesActions = {
    obterCategorias: (dispatch) => {
        fetch(`${urlBaseAPI}/categorias`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${jwt}`
            }
         })
            .then(resp => resp.json())
            .then(data => dispatch({ type: 'obterCategorias', payload: { categorias: data } }))
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
                throw new Error(`Erro na requisição: ${resp.statusText}`)
            }
            return resp.status === 204 ? null : resp.json()
        })    
        .then(_ => {
            dispatch({ type: 'atualizarCategoria', payload: { categoria } })
            console.log("Categoria atualizada com sucesso")
        })
        .catch(error => console.error("Erro ao atualizar categoria:", error))
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
                throw new Error(`Erro na requisição: ${resp.statusText}`)
            }
            return resp.status === 204 ? null : resp.json()
        })    
        .then(_ => {
            dispatch({ type: 'deletarCategoria', payload: { categoria: { id } } })
            console.log("Categoria deletada com sucesso")
        })
        .catch(error => console.error("Erro ao deletar categoria:", error))
    },
    adicionarCategoria: (dispatch, categoria) => {
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
                throw new Error(`Erro na requisição: ${resp.statusText}`)
            }
            return resp.json()
        })    
        .then(data => {
            dispatch({ type: 'adicionarCategoria', payload: { categoria, id: data } })
            console.log("Categoria adicionada com sucesso")
        })
        .catch(error => console.error("Erro ao adicionar categoria:", error))
    }
}

export default categoriesActions