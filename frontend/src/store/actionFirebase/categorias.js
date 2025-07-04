import firebase, { firestore } from './firebase'
import { objetoValido, handleError, jaExiste } from '../utils'

const categoriesActions = {
    atualizarCategoria: async (dispatch, estado, categoria) => {
        try {
            if (!estado.categorias.some(cat => cat.id === categoria.id && cat.nome.toLowerCase() === categoria.nome.toLowerCase())) {
                jaExiste(estado, categoria.nome, 'categoria')
            }
            objetoValido({ nome: categoria.nome })
            await firestore('categorias', 'update', categoria.id, { nome: categoria.nome })
            dispatch({ type: 'atualizarMovimentacao', payload: { tipo: 'categoria', id: categoria.id, nome: categoria.nome } })
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
    adicionarCategoria: async (dispatch, estado, categoria) => {
        try {
            objetoValido({ nome: categoria.nome })
            console.log(estado.categorias)
            jaExiste(estado, categoria.nome, 'categoria')
            await firestore('categorias', 'save', categoria.id, { nome: categoria.nome })
        } catch (error) {
            handleError(dispatch, error, '/categorias')
        }
    }
}

export default categoriesActions