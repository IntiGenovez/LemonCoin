import { firestore } from './firebase.js'

const objetoValido = objeto => {
    for (const valor of Object.values(objeto)) {
        if (!valor) throw new Error('Preencha Todos Os Campos')
    }
}

const handleError = (dispatch, error, link) => {
    console.error(error.message)
    dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, titulo: 'ATENÇÃO', link } })
}

const movementsActions = {
    ordenarMovimentacoes: (dispatch, seletorOrdenador, invertido) => {
        dispatch({ type: 'ordenarMovimentacoes', payload: { seletorOrdenador, invertido } })
    },
    deletarMovimentacao: async (dispatch, movimentacao) => {
        try {
            const id = movimentacao.id
            const transacao =  movimentacao.tipo === 'Receita' ? 
                - movimentacao.valor :
                movimentacao.valor
                
            console.log(movimentacao.valor)

            await firestore('movimentações', 'delete', movimentacao.id)
            await firestore('contas', 'updatebalance', movimentacao.contaId, transacao)
            dispatch({ type: 'deletarMovimentacao', payload: { id } })
            dispatch({ 
                type: 'atualizarSaldo', 
                payload: 
                { 
                    valor: transacao,
                    id: movimentacao.contaId
                }})
        } catch (error) {
            handleError(dispatch, error, `${movimentacao.tipo.toLowerCase()}s`)
        }
    },
    atualizarMovimentacao: async (dispatch, movimentacao) => {
        try {
            const transacao = movimentacao.tipo === 'Receita' ?
                movimentacao.valor - movimentacao.valorAnterior :
                movimentacao.valorAnterior + movimentacao.valor

            objetoValido(movimentacao)
            const movimentacaoToFetch = { ...movimentacao }
            delete movimentacaoToFetch.conta
            delete movimentacaoToFetch.categoria
            delete movimentacaoToFetch.usuario
            delete movimentacaoToFetch.valorAnterior

            await firestore('movimentações', 'update', movimentacaoToFetch.id, movimentacaoToFetch)
            await firestore('contas', 'updatebalance', movimentacao.contaId, transacao)
            dispatch({ type: 'atualizarMovimentacao', payload: { movimentacao } })
            dispatch({ 
                type: 'atualizarSaldo', 
                payload: 
                { 
                    valor: transacao,
                    id: movimentacao.contaId
                }})
        } catch (error) {
            handleError(dispatch, error, `${movimentacao.tipo.toLowerCase()}s`)
        }
    },
    adicionarMovimentacao: async (dispatch, movimentacao) => {
        try {
            const transacao = movimentacao.tipo === 'Receita' ?
                movimentacao.valor :
                -movimentacao.valor

            objetoValido(movimentacao)
            movimentacao.data = new Date(movimentacao.data)
            const movimentacaoToFetch = { ...movimentacao }
            delete movimentacaoToFetch.conta
            delete movimentacaoToFetch.categoria
            delete movimentacaoToFetch.usuario

            const docRef = await firestore('movimentações', 'save', null, movimentacaoToFetch)
            await firestore('contas', 'updatebalance', movimentacao.contaId, transacao)
            dispatch({ type: 'adicionarMovimentacao', payload: { movimentacao, id: docRef.id } })
            dispatch({ 
                type: 'atualizarSaldo', 
                payload: 
                { 
                    valor: transacao, 
                    id: movimentacao.contaId
                }})
            dispatch({ type: 'exibirMensagem', payload: { mensagem: `${movimentacao.tipo} cadastrada com sucesso.`, titulo: 'Sucesso', tipo: 'success', link: `/${movimentacao.tipo.toLowerCase()}s` } })
            return true
        } catch (error) {
            console.log(error.message)
            handleError(dispatch, error, `/adicionar-${movimentacao.tipo.toLowerCase()}`)
            return true
        }
    }
}

export default movementsActions