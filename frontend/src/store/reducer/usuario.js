function usuarioReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'signin':
            novoEstado = { ...estado, ...action.payload }
            break
        case 'signout': 
            novoEstado = { 
                ...estado, 
                movimentacoes: [],
                contas: [],
                categorias: [],
                historico: [],
                usuario: {
                    id: null,
                    nome: '',
                    email: '',
                    telefone: '',
                    genero: '',
                } }
            break
        case 'loaded': {
            novoEstado = { ...estado, loading: false }
            break
        }
        case 'atualizarUsuario':
            novoEstado = { ...estado, usuario: action.payload }
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