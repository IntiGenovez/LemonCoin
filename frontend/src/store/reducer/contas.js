function contasReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'atualizarContas':
            novoEstado = { ...estado, contas: action.payload }
            break
        default:
            novoEstado = estado      
    }

    return {
        next: nextReducer => nextReducer(novoEstado, action),
        end: () => novoEstado
    }
}

export default contasReducer