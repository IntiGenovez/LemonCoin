function usuarioReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'signup':
            novoEstado = { ...estado, usuario: action.payload.usuario }
            break
        case 'signin':
            novoEstado = { ...estado, usuario: action.payload.usuario }
            break
        default:
            novoEstado = estado      
    }

    return {
        next: nextReducer => nextReducer(novoEstado, action),
        end: () => novoEstado
    }
}

export default usuarioReducer