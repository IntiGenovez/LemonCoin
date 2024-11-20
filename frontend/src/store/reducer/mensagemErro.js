function mensagemErroReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'exibirMensagem':
            novoEstado = { ...estado, mensagemErro: { mensagem: action.payload.mensagem, openDialog: true } }
            break
        case 'fecharMensagem':
            novoEstado = { ...estado, mensagemErro: { mensagem: '', openDialog: false } }
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