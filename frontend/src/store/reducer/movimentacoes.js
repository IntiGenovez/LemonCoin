function movimentacoesReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'obterMovimentacoes':
            novoEstado = { ...estado, movimentacoes: action.payload.movimentacoes }
            break
        case 'ordenarMovimentacoes':
            if (action.payload.invertido) {
                novoEstado = { ...estado, movimentacoes: estado.movimentacoes.sort((a, b) => b[action.payload.seletorOrdenador] <= a[action.payload.seletorOrdenador] ? -1 : 1 ) }
            } else {
                novoEstado = { ...estado, movimentacoes: estado.movimentacoes.sort((a, b) => a[action.payload.seletorOrdenador] <= b[action.payload.seletorOrdenador] ? -1 : 1 ) }
            }
            break
        case 'deletarMovimentacao':
            novoEstado = { ...estado, movimentacoes: estado.movimentacoes.filter(movimentacao => movimentacao.id !== action.payload.id) }
            break
        case 'atualizarMovimentacao':
            novoEstado = { ...estado, movimentacoes: estado.movimentacoes.map(movimentacao => 
                movimentacao.id === action.payload.movimentacao.id ? 
                    action.payload.movimentacao :
                    movimentacao
                )}
            break
        case 'adicionarMovimentacao':
            console.log(action.payload.movimentacao)
            // novoEstado = { ...estado, movimentacoes: estado.movimentacoes.push(action.payload.movimentacao) }
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