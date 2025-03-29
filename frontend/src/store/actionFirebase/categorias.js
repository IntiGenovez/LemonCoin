import firebase, { firestore } from './firebase'
import { objetoValido, handleError } from '../utils'

const categoriesActions = {
    atualizarCategoria: async (dispatch, categoria) => {
        try {
            objetoValido({ nome: categoria.nome })
            await firestore('categorias', 'update', categoria.id, { nome: categoria.nome })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    },
    deletarCategoria: async (dispatch, id) => {
        try {
            await firestore('categorias', 'delete', id)
            
            const data = await firebase.getUserData()
            if (!data) return
            dispatch({ type: 'signin', payload: data })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    },
    adicionarCategoria: async (dispatch, categoria) => {
        try {
            objetoValido({ nome: categoria.nome })
            await firestore('categorias', 'save', categoria.id, { nome: categoria.nome })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    }
}

export default categoriesActions