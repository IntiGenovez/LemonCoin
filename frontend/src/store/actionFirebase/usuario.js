import firebase from './firebase'

const userActions = {
    signup: async (dispatch, usuario) => {
        try {
            await firebase.signUpUser(usuario.email, usuario.senha)

            dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Cadastro Realizado com Sucesso', tipo: 'success', titulo: 'Cadastrado!', link: '/home' } })
            return true
        } catch (error) {
            console.error('Erro no cadastro: ', error.code)
            return false
        }
    },
    signin: async (dispatch, usuario) => {
        try {
            await firebase.signInUser(usuario.email, usuario.senha)
            console.log('teste')
            return true
        } catch (error) {
            console.error('Erro no login: ', error)
            return false
        }
    },
    signout: async (dispatch) => {
        await firebase.signOutUser()
        dispatch({ type: 'signout' })
    },
    obterDadosUsuario: async (_) => {
        try {
            await firebase.isUserSignedIn()
        } catch (error) {
            console.error('Erro ao obter dados do usuário: ', error)
        }
    },
    recuperarSenhaPedido: async (_, usuario) => {
        try {
            await firebase.resetPassword(usuario.email)
            return true
        } catch (error) {
            console.error('Erro ao recuperar senha: ', error)
            return false
        }
    },
    recuperarSenha: async (dispatch, token, novaSenha, confirmarNovaSenha) => {
        try {
            const response = await fetch(`${urlBaseAPI}/recuperarsenha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, novaSenha, confirmarNovaSenha })
            })
            const contentType = response.headers.get('content-type')
            let data;
    
            if (contentType && contentType.includes('application/json')) {
                data = await response.json() // Lê como JSON
            } else {
                data = await response.text() // Lê como texto
            }

            console.log('Resposta da API: ', response.status, response.statusText)
            console.log('Dados retornados pela API: ', data)

            if (!response.ok) {
                throw new Error(data || 'Erro ao recuperar senha')
            }

            dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Senha alterada', tipo: 'success', titulo: 'Senha alterada!', link: '/login' } })
            return true
        } catch (error) {
            console.error('Erro ao recuperar senha: ', error)
            return false
        }
    }   
}

export default userActions