import firebase, { firestore } from "./firebase"
import { objetoValido, handleError } from '../utils'

const accountsActions = {
    atualizarConta: async (dispatch, conta) => {
        try {
            console.log({nome: conta.nome, saldo: conta.saldo})
            objetoValido({ nome: conta.nome, saldo: conta.saldo })
            await firestore('contas', 'update', conta.id, conta)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta atualizada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
            return true
        } catch (error) {
            handleError(dispatch, error, '/editar-conta/' + conta.id)
            return false
        }
    },
    deletarConta: async (dispatch, conta) => {
        try {
            await firestore('contas', 'delete', conta.id)
            
            const data = await firebase.getUserData()
            if (!data) return
            dispatch({ type: 'signin', payload: data })

            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta deletada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
            return true
        } catch (error) {
            handleError(dispatch, error, '/contas')
            return false
        }
    },
    adicionarConta: async (dispatch, conta) => {
        try {
            objetoValido({nome: conta.nome, saldo: conta.saldo})
            await firestore('contas', 'save', conta.id, conta)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: "Conta cadastrada.", titulo: 'Sucesso', tipo: 'success', link: '/contas' } })
            return true
        } catch (error) {
            handleError(dispatch, error, '/adicionar-conta')
            return false
        }
    }
}

export default accountsActions