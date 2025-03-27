function movimentacoesReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'ordenarMovimentacoes':
            if (action.payload.invertido) {
                novoEstado = { ...estado, movimentacoes: estado.movimentacoes.sort((a, b) => b[action.payload.seletorOrdenador] <= a[action.payload.seletorOrdenador] ? -1 : 1 ) }
            } else {
                novoEstado = { ...estado, movimentacoes: estado.movimentacoes.sort((a, b) => a[action.payload.seletorOrdenador] <= b[action.payload.seletorOrdenador] ? -1 : 1 ) }
            }
            break
        case 'atualizarMovimentacoes':
            novoEstado = { ...estado, movimentacoes: action.payload }
            break
        default:
            novoEstado = estado      
    }

    return {
        next: nextReducer => nextReducer(novoEstado, action),
        end: () => novoEstado
    }
}

export default movimentacoesReducer