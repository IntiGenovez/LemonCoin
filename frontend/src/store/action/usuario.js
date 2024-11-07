import { urlBaseAPI } from "../../global"

const userActions = {
    signup: (dispatch, usuario) => {
        dispatch({ type: 'signup', payload: { usuario } })
    },
    signin: (dispatch, usuario) => {
        fetch(`${urlBaseAPI}/signin`, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(usuario),
        })
        .then(resp => resp.json())
        .then(usuario => dispatch({ type: 'signin', payload: { usuario }}))
    }
}

export default userActions