function categoriasReducer(estado, action) {
    let novoEstado
    switch (action.type) {
            case 'atualizarCategorias':
                novoEstado = { ...estado, categorias: action.payload }
                break
        default:
            novoEstado = estado      
    }

    return {
        next: nextReducer => nextReducer(novoEstado, action),
        end: () => novoEstado
    }
}

export default categoriasReducer