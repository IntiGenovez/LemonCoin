function historicoReducer(estado, action) {
    let novoEstado
    switch (action.type) {
            case 'atualizarHistorico':
                if(estado.historico[estado.historico.length - 1] === action.payload || action.payload === '/') {
                    novoEstado = estado   
                    break
                }
                novoEstado = { ...estado, historico: [ ...estado.historico, action.payload] }
                break
            case 'voltarHistorico':
                novoEstado = { 
                    ...estado, 
                    historico:
                        estado.historico.filter((path, i, historico) => {
                            if(i <= (historico.length - 2))
                                return path
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

export default historicoReducer