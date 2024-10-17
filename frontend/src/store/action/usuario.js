const userActions = {
    signup: (dispatch, usuario) => {
        dispatch({ type: 'signup', payload: { usuario } })
    },
    signin: (dispatch, usuario) => {
        dispatch({ type: 'signin', payload: { usuario }})
    }
}

export default userActions