import { firestore } from './firebase'

const handleError = (dispatch, error, link) => {
    console.error(error.message)
    dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, titulo: 'ATENÇÃO', link } })
}

const categoriesActions = {
    obterCategorias: async (dispatch) => {
        try {
            const data = await firestore('categorias', 'read')
            dispatch({ type: 'obterCategorias', payload: { categorias: data } })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    },
    atualizarCategoria: async (dispatch, categoria) => {
        try {
            await firestore('categorias', 'update', categoria)
            dispatch({ type: 'atualizarCategoria', payload: { categoria } })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    },
    deletarCategoria: async (dispatch, id) => {
        try {
            await firestore('categorias', 'delete', id)
            dispatch({ type: 'deletarCategoria', payload: { categoria: { id } } })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    },
    adicionarCategoria: async (dispatch, categoria) => {
        try {
            const id = await firestore('categorias', 'save', categoria)
            dispatch({ type: 'adicionarCategoria', payload: { categoria, id } })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    }
}

export default categoriesActions