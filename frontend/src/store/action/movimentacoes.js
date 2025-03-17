import { fetchAPI } from "./fetchAPI.js"

const handleError = (dispatch, error, link) => {
    console.error(error.message)
    dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, titulo: 'ATENÇÃO', link } })
}

const movementsActions = {
    obterMovimentacoes: async (dispatch) => {
        try {
            const data = await fetchAPI("movimentacoes")
            dispatch({ type: 'obterMovimentacoes', payload: { movimentacoes: data } })
        } catch (error) {
            handleError(dispatch, error, `${movimentacao.tipo.toLowerCase()}s`)
        }
    },
    ordenarMovimentacoes: (dispatch, seletorOrdenador, invertido) => {
        dispatch({ type: 'ordenarMovimentacoes', payload: { seletorOrdenador, invertido } })
    },
    deletarMovimentacao: async (dispatch, movimentacao) => {
        console.log(movimentacao)
        try {
            const id = movimentacao.id
            await fetchAPI(`movimentacoes/${id}`, "DELETE")
            dispatch({ type: 'deletarMovimentacao', payload: { id } })
            dispatch({ 
                type: 'atualizarSaldo', 
                payload: 
                { 
                    valor: movimentacao.tipo === "Receita" ?
                        - movimentacao.valor :
                        movimentacao.valor,
                    id: movimentacao.contaId
                }})
        } catch (error) {
            handleError(dispatch, error, `${movimentacao.tipo.toLowerCase()}s`)
        }
    },
    atualizarMovimentacao: async (dispatch, movimentacao) => {
        try {
            const movimentacaoToFetch = { ...movimentacao }
            delete movimentacaoToFetch.conta
            delete movimentacaoToFetch.categoria
            delete movimentacaoToFetch.usuario
            delete movimentacaoToFetch.valorAnterior

            await fetchAPI(`movimentacoes/${movimentacaoToFetch.id}`, "PUT", movimentacaoToFetch)
            dispatch({ type: 'atualizarMovimentacao', payload: { movimentacao } })
            dispatch({ 
                type: 'atualizarSaldo', 
                payload: 
                { 
                    valor: movimentacao.tipo === "Receita" ?
                        movimentacao.valor - movimentacao.valorAnterior :
                        movimentacao.valorAnterior + movimentacao.valor,
                    id: movimentacao.contaId
                }})
        } catch (error) {
            handleError(dispatch, error, `${movimentacao.tipo.toLowerCase()}s`)
        }
    },
    adicionarMovimentacao: async (dispatch, movimentacao) => {
        try {
            const movimentacaoToFetch = { ...movimentacao }
            delete movimentacaoToFetch.conta
            delete movimentacaoToFetch.categoria
            delete movimentacaoToFetch.usuario

            const id = await fetchAPI("movimentacoes", "POST", movimentacaoToFetch)
            dispatch({ type: 'adicionarMovimentacao', payload: { movimentacao, id } })
            dispatch({ 
                type: 'atualizarSaldo', 
                payload: 
                { 
                    valor: movimentacao.tipo === "Receita" ?
                        movimentacao.valor :
                        -movimentacao.valor, 
                    id: movimentacao.contaId
                }})
            dispatch({ type: 'exibirMensagem', payload: { mensagem: `${movimentacao.tipo} cadastrada com sucesso.`, titulo: 'Sucesso', tipo: 'success', link: `/${movimentacao.tipo.toLowerCase()}s` } })
        } catch (error) {
            console.log(error.message)
            handleError(dispatch, error, `/adicionar-${movimentacao.tipo.toLowerCase()}`)
        }
    }
}

export default movementsActions