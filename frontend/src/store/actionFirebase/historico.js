import { handleError } from '../utils'

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
    },
    mudarRelatorio: (dispatch, relatorio) => {
        dispatch({ type: 'mudarRelatorio', payload: relatorio })
    }
}

export default historyActions