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

            let data;
            try {
                data = await response.json();
            } catch (error) {
                data = null;
                console.error("Erro ao analisar JSON:", error);
            }

            console.log('Resposta da API:', response)
            console.log('Dados retornados pela API:', data)

            if (response.ok) {
                dispatch({ type: 'signup', payload: data })
                return true
            } else {
                console.error('Resposta inesperada: ', data)
                return false
            }
        } catch (error) {
            console.error("Erro no cadastro: ", error)
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

            if (!response.ok) throw new Error("Erro de autenticação");

            const data = await response.json()
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