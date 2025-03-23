import { firestore } from './firebase'

const handleError = (dispatch, error, link) => {
    console.log(error)
    console.error(error.message)
    dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, titulo: 'ATENÇÃO', link } })
}

const categoriesActions = {
    atualizarCategoria: async (dispatch, categoria) => {
        try {
            await firestore('categorias', 'update', categoria.id, { nome: categoria.nome })
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
            const docRef = await firestore('categorias', 'save', categoria.id, { nome: categoria.nome })
            dispatch({ type: 'adicionarCategoria', payload: { categoria, id: docRef.id } })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    }
}

export default categoriesActions