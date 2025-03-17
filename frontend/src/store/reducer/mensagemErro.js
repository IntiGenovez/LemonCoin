function mensagemErroReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'exibirMensagem':
            novoEstado = { ...estado, mensagemErro: { ...action.payload, openDialog: true } }
            break
        case 'fecharMensagem':
            novoEstado = { ...estado, mensagemErro: { openDialog: false } }
            break
        default:
            novoEstado = estado      
    }

    return {
        next: nextReducer => nextReducer(novoEstado, action),
        end: () => novoEstado
    }
}

export default mensagemErroReducer