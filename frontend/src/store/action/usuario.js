import { urlBaseAPI, userKey } from "../../global"

const userActions = {
    signup: (_, usuario) => {
        fetch(`${urlBaseAPI}/signup`, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(usuario),
        })
        .then(resp => resp.json())
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