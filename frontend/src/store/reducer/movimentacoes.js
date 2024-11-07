function movimentacoesReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'obterDespesas':
            novoEstado = { ...estado, despesas: action.payload.despesas }
            break
        case 'ordenarDespesas':
            if (action.payload.invertido) {
                novoEstado = { ...estado, despesas: estado.despesas.sort((a, b) => b[action.payload.seletorOrdenador] <= a[action.payload.seletorOrdenador] ? -1 : 1 ) }
            } else {
                novoEstado = { ...estado, despesas: estado.despesas.sort((a, b) => a[action.payload.seletorOrdenador] <= b[action.payload.seletorOrdenador] ? -1 : 1 ) }
            }
            break
        case 'removerDespesa':
            novoEstado = { ...estado, despesas: estado.despesas.filter(despesa => despesa.id !== action.payload.id) }
            break
        case 'atualizarDespesa':
            novoEstado = { ...estado, despesas: estado.despesas.map(despesa => 
                despesa.id === action.payload.despesa.id ? 
                    action.payload.despesa :
                    despesa
                )}
            break
        case 'adicionarDespesa':
            console.log(action.payload.despesa)
            // novoEstado = { ...estado, despesas: estado.despesas.push(action.payload.despesa) }
            // console.log(novoEstado)
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