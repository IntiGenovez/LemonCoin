const handleError = (dispatch, error, link) => {
    console.error(error.message)
    dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, titulo: 'ATENÇÃO', link } })
}

const historyActions = {
    atualizarHistorico: async (dispatch, novoPath) => {
        try {
            dispatch({ type: 'atualizarHistorico', payload: novoPath })
            return true
        } catch (error) {
            handleError(dispatch, error, '/home')
            return false
        }
    },
    voltarHistorico: async (dispatch) => {
        try {
            dispatch({ type: 'voltarHistorico' })
            return true
        } catch (error) {
            handleError(dispatch, error, '/home')
            return false
        }
    }
}

export default historyActions