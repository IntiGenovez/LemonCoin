function contasReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'obterContas':
            novoEstado = { ...estado, contas: action.payload.contas }
            break
        case 'adicionarConta':
            novoEstado = { ...estado, contas: [ ...estado.contas, action.payload.conta ]}
            console.log(novoEstado)
        default:
            novoEstado = estado      
    }

    return {
        next: nextReducer => nextReducer(novoEstado, action),
        end: () => novoEstado
    }
}

export default contasReducer