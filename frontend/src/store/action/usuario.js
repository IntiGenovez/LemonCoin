import { urlBaseAPI, userKey } from "../../global"

const userActions = {
    signup: async (dispatch, userData) => {
        try {
            console.log("enviando dados para API")
            const response = await fetch(`${urlBaseAPI}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const data = await response.json()

            console.log('Resposta da API:', response)
            console.log('Dados retornados pela API:', data)

            if(!response.ok) {
                console.error('Erro ao cadastrar: ', data)
                throw new Error(data.message || 'Erro ao cadastrar')
            }

            dispatch({ type: 'signup', payload: data })
            return true
        } catch (error) {
            console.error("Erro no cadastro: ", error.message)
            return false
        }
    },
    signin: async (dispatch, usuario) => {
        try {
            const response = await fetch(`${urlBaseAPI}/signin`, { 
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
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
            console.error("Erro no login: ", error)
            return false
        }
    },
    signout: (dispatch) => {
        localStorage.removeItem(userKey)
        dispatch({ type: 'signout' })
    }
}

export default userActions