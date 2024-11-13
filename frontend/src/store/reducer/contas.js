function contasReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'obterContas':
            novoEstado = { ...estado, contas: action.payload.contas }
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