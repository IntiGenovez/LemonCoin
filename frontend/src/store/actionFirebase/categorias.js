import { firestore } from './firebase'

const objetoValido = objeto => {
    for (const valor of Object.values(objeto)) {
        if (!valor) throw new Error('Preencha Todos Os Campos')
    }
}

const handleError = (dispatch, error, link) => {
    console.log(error)
    console.error(error.message)    
    dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Ocorreu um erro, tente novamente!', titulo: 'ATENÇÃO', link, tipo: 'error' } })

}

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