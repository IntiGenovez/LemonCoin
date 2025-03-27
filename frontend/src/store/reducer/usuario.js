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
                usuario: {
                    id: null,
                    nome: '',
                    email: '',
                    telefone: '',
                    genero: '',
                } }
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