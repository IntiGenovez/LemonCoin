import firebase from './firebase'
import { handleError, objetoValido, emailValido, senhasValidas, telefoneValido } from '../utils'

const userActions = {
    ouvirMovimentacoes: dispatch => {
        return firebase.subscribeMoviments(dispatch)
    },
    ouvirContas: dispatch => {
        return firebase.subscribeAccounts(dispatch)
    },
    ouvirCategorias: dispatch => {
        return firebase.subscribeCategories(dispatch)
    },
    obterDadosUsuario: async (dispatch) => {
        try {
            const data = await firebase.getUserData()
            if (!data) return
            dispatch({ type: 'signin', payload: data })

            userActions.ouvirMovimentacoes(dispatch)
            userActions.ouvirContas(dispatch)
            userActions.ouvirCategorias(dispatch)
        } catch (error) {
            console.error('Erro no cadastro: ', error.code || error.message)
            handleError(dispatch, error, `/login`)
            return false
        }
    },
    signup: async (dispatch, usuario) => {
        try {
            objetoValido(usuario)
            emailValido(usuario.email)
            telefoneValido(usuario.telefone)
            senhasValidas(usuario.senha, usuario.confirmarSenha)
            usuario.dataNascimento = new Date(usuario.dataNascimento)
            await firebase.signUpUser(usuario)
            const cadastroUsuario = { ...usuario }
            delete cadastroUsuario.senha
            delete cadastroUsuario.confirmarSenha

            dispatch({ type: 'signin', payload: cadastroUsuario })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Cadastro Realizado com Sucesso', tipo: 'success', titulo: 'Cadastrado!', link: '/home' } })

            userActions.ouvirMovimentacoes(dispatch)
            userActions.ouvirContas(dispatch)
            userActions.ouvirCategorias(dispatch)
            return true
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') error.message = 'Esse endereço de email já foi utilizado'
            
            handleError(dispatch, error, `/cadastro`)
            console.error('Erro no cadastro: ', error.code || error.message)
            return false
        }
    },
    signin: async (dispatch, usuario) => {
        try {
            objetoValido(usuario)
            const data = await firebase.signInUser(usuario.email, usuario.senha)
            dispatch({ type: 'signin', payload: data })

            userActions.ouvirMovimentacoes(dispatch)
            userActions.ouvirContas(dispatch)
            userActions.ouvirCategorias(dispatch)
            return true
        } catch (error) {
            handleError(dispatch, error, `/login`)
            console.error('Erro no login: ', error)
            return false
        }
    },
    signout: async (dispatch) => {
        await firebase.signOutUser()
        dispatch({ type: 'signout' })
    },
    recuperarSenha: async (dispatch, usuario) => {
        try {
            await firebase.resetPassword(usuario.email)
            return true
        } catch (error) {
            handleError(dispatch, error, `/login`)
            console.error('Erro ao recuperar senha: ', error)
            return false
        }
    },
    atualizarSenha: async (dispatch, oobCode, novaSenha, confirmarNovaSenha) => {
        try {
            senhasValidas(novaSenha, confirmarNovaSenha)
            await firebase.updatePassword(oobCode, novaSenha)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Senha alterada', tipo: 'success', titulo: 'Senha alterada!', link: '/login' } })
            return true
        } catch (error) {
            console.error('Erro ao recuperar senha: ', error)
            return false
        }
    }   
}

export default userActions