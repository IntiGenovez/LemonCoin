import { fetchAPI, handleError } from "./fetchAPI.js"

const categoriesActions = {
    obterCategorias: async (dispatch) => {
        try {
            const data = await fetchAPI("categorias")
            dispatch({ type: 'obterCategorias', payload: { categorias: data } })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    },
    atualizarCategoria: async (dispatch, categoria) => {
        try {
            await fetchAPI(`categorias/${categoria.id}`, "PUT", categoria)
            dispatch({ type: 'atualizarCategoria', payload: { categoria } })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    },
    deletarCategoria: async (dispatch, id) => {
        try {
            await fetchAPI(`categorias/${id}`, "DELETE")
            dispatch({ type: 'deletarCategoria', payload: { categoria: { id } } })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    },
    adicionarCategoria: async (dispatch, categoria) => {
        try {
            const id = await fetchAPI("categorias", "POST", categoria)
            dispatch({ type: 'adicionarCategoria', payload: { categoria, id } })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    }
}

export default categoriesActions