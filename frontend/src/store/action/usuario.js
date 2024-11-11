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
        .then(usuario => {
            localStorage.setItem(userKey, JSON.stringify(usuario))
        })
    },
    signin: (dispatch, usuario) => {
        console.log(userKey)
        fetch(`${urlBaseAPI}/signin`, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(usuario),
        })
        .then(resp => resp.json())
        .then(usuario => {
            dispatch({ type: 'signin', payload: { usuario }})
            localStorage.setItem(userKey, JSON.stringify(usuario))
        })
    }
}

export default userActions