import { fetchAPI } from "./fetchAPI.js"

const categoriesActions = {
    obterCategorias: async (dispatch) => {
        try {
            const data = await fetchAPI("categorias")
            dispatch({ type: 'obterCategorias', payload: { categorias: data } })
        } catch (error) {
            console.error("Erro ao obter categorias: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: '' } })
        }
    },
    atualizarCategoria: async (dispatch, categoria) => {
        try {
            await fetchAPI(`categorias/${categoria.id}`, "PUT", categoria)
            dispatch({ type: 'atualizarCategoria', payload: { categoria } })
        } catch (error) {
            console.error("Erro ao atualizar categoria: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: '' } })
        }
    },
    deletarCategoria: async (dispatch, id) => {
        try {
            await fetchAPI(`categorias/${id}`, "DELETE")
            dispatch({ type: 'deletarCategoria', payload: { categoria: { id } } })
        } catch (error) {
            console.error("Erro ao deletar categoria: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: 'error', titulo: 'ATENÇÃO!', link: '/categorias' } })
        }
    },
    adicionarCategoria: async (dispatch, categoria) => {
        try {
            const id = await fetchAPI("categorias", "POST", categoria)
            dispatch({ type: 'adicionarCategoria', payload: { categoria, id } })
        } catch (error) {
            console.error("Erro ao adicionar categoria: ", error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: '' } })
        }
    }
}

export default categoriesActions