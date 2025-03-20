import { urlBaseAPI, userKey } from "../../global"

const errorMessageActions = {
    exibirMensagem: (dispatch, mensagem) => {
        dispatch({ type: 'exibirMensagem', payload: { mensagem }})
    },
    fecharMensagem: (dispatch) => {
        dispatch({ type: 'fecharMensagem' })
    }
}

export default errorMessageActions