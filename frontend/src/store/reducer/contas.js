function contasReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'obterContas':
            novoEstado = { ...estado, contas: action.payload.contas }
            break
        case 'adicionarConta':
            const novaConta = { ...action.payload.conta, id: action.payload.id }
            novoEstado = { ...estado, contas: [ ...estado.contas, novaConta ]}
            break
        case 'atualizarConta':
            novoEstado = { ...estado, contas: estado.contas.map(conta => {
                    return conta.id === action.payload.conta.id ? action.payload.conta : conta
                }) 
            }
            break
        case 'deletarConta':
            novoEstado = { ...estado, contas: estado.contas.filter(conta => {
                    return conta.id !== action.payload.conta.id
                }) 
            }
            break
        case 'atualizarSaldo':
            novoEstado = { ...estado, contas: estado.contas.map(conta => {
                    return conta.id === +action.payload.id ? { ...conta, saldo: (conta.saldo + action.payload.valor) } : conta
                })
            }
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