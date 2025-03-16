import { urlBaseAPI, userKey } from '../../global'

const userActions = {
    signup: async (dispatch, userData) => {
        try {
            const response = await fetch(`${urlBaseAPI}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const contentType = response.headers.get('content-type')
            let data;
    
            if (contentType && contentType.includes('application/json')) {
                data = await response.json() // Lê como JSON
            } else {
                data = await response.text() // Lê como texto
            }

            console.log('Resposta da API:', response)
            console.log('Dados retornados pela API:', data)

            if(!response.ok) {
                console.error('Erro ao cadastrar: ', data)
                throw new Error(data || 'Erro ao cadastrar')
            }

            dispatch({ type: 'signup', payload: data })
            await userActions.signin(dispatch, { email: userData.email, senha: userData.senha })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Cadastro Realizado com Sucesso', tipo: 'success', titulo: 'Cadastrado!', link: '/home' } })
            return true
        } catch (error) {
            console.error('Erro no cadastro: ', error.message)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: 'error', link: '/cadastro', titulo: 'ATENÇÃO!'  } })
            return false
        }
    },
    signin: async (dispatch, usuario) => {
        try {
            const response = await fetch(`${urlBaseAPI}/signin`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(usuario),
            })

            const data = await response.json()
            console.log('Resposta da API: ', response.status, response.statusText)
            console.log('Dados retornados pela API: ', data)

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao logar')
            }

            if (data.token) {
                dispatch({ type: 'signin', payload: { usuario: data }})
                localStorage.setItem(userKey, JSON.stringify(data))

                return true
            } else {
                console.error('Resposta inesperada: ', data)
                return false
            }
        } catch (error) {
            console.error('Erro no login: ', error)
            return false
        }
    },
    signout: (dispatch) => {
        localStorage.removeItem(userKey)
        dispatch({ type: 'signout' })
    }
}

export default userActions