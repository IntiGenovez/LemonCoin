import { useContext, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { DadosContexto } from "../store"
import { movementsActions, errorMessageActions } from "../store/actionFirebase"
import { useNavigate } from 'react-router-dom'
import { formatarValor, desformatarValor } from '../store/utils'

import styles from "../estilos/Movimentacoes.module.css"
import formatDateToInputDate from '../store/utils/formatDateToInputDate'


const Movimentacao = forwardRef(function Movimentacao({ movimentacaoListada, movimentacaoEditavel, setMovimentacaoEditavel }, ref) {
    const contexto = useContext(DadosContexto)
    const [ movimentacao, setMovimentacao ] = useState({ 
        ...movimentacaoListada, 
        valor: formatarValor(+movimentacaoListada.valor.toFixed(2)),
        data: movimentacaoListada.data.toDate ? 
            movimentacaoListada.data.toDate().toLocaleString('pt-BR').split(',')[0] :
            movimentacaoListada.data
    })
    const [ movimentacaoInput, setMovimentacaoInput ] = useState({ 
        ...movimentacaoListada,
        valor: formatarValor(+movimentacaoListada.valor.toFixed(2)),
        data: movimentacaoListada.data.toDate ? 
            formatDateToInputDate(false, movimentacaoListada.data.toDate()) : 
            movimentacaoListada.data
    })
    const [ movimentacaoMemento, setMovimentacaoMemento ] = useState()

    const navigate = useNavigate()
    const [ categoriaSelecionada, setCategoriaSelecionada ] = useState({ 
        nome: movimentacao.categoria ?? contexto.state.categorias[0]?.nome ?? '',
        id: movimentacao.categoria?  movimentacao.categoriaId : contexto.state.categorias[0]?.id ?? '',
    })

    const [ contaSelecionada, setContaSelecionada ] = useState({ 
        nome: movimentacao.conta ?? contexto.state.contas[0]?.nome ?? '',
        id: movimentacao.conta ? movimentacao.contaId : contexto.state.contas[0]?.id ?? '',
    })

    useImperativeHandle(ref, () => ({
        atualizarMovimentacao: e => {
            handleAtualizar(e)
        }
    }))

    useEffect(() => {
        setMovimentacao(prev => ({ ...prev, valor: formatarValor(movimentacaoInput.valor) }))
    }, [movimentacaoInput.valor])

    useEffect(() => {
        setMovimentacao({       
            ...movimentacaoListada, 
            valor: formatarValor(+movimentacaoListada.valor.toFixed(2)),
            data: movimentacaoListada.data.toDate ? 
                movimentacaoListada.data.toDate().toLocaleString('pt-BR').split(',')[0] :
                movimentacaoListada.data })
    }, [movimentacaoListada])

    const handleChangeCategoria = e => {
        setCategoriaSelecionada({
            nome: e.target.value,
            id: e.target[e.target.selectedIndex].id
        })
    }

    const handleChangeConta = e => {
        setContaSelecionada({
            nome: e.target.value,
            id: e.target[e.target.selectedIndex].id
        })
    }

    const handleChangeValor = e => {
        let valor = e.target.value;
    
        setMovimentacaoInput(prev => ({ ...prev, valor: formatarValor(valor) }));
    }

    const handleAtualizar = e => {
        if(e && e.type === 'keydown' && e.key !== 'Escape' && e.key !== 'Enter') return
        if(e && e.type === 'keydown' && e.key === 'Escape') {
            setMovimentacao(movimentacaoMemento)
            setMovimentacaoInput(movimentacaoMemento)
            setMovimentacaoEditavel(null)
            return
        }

        const movimentacaoToFetch = { ...movimentacaoInput }
        movimentacaoToFetch.valor = desformatarValor(movimentacaoToFetch.valor)

        movimentacaoToFetch.categoria = categoriaSelecionada.nome
        movimentacaoToFetch.categoriaId = categoriaSelecionada.id
        movimentacaoToFetch.conta = contaSelecionada.nome
        movimentacaoToFetch.contaId = contaSelecionada.id
        movimentacaoToFetch.valorAnterior = movimentacaoListada.valor

        movimentacaoToFetch.data = `${movimentacaoToFetch.data} 00:00:00`
        
        setMovimentacaoEditavel(null)
        movementsActions.atualizarMovimentacao(contexto.dispatch, movimentacaoToFetch)
    }

    const handleDeletar = () => {
        const newMovimentacao = { ...movimentacao }
        newMovimentacao.valor = desformatarValor(newMovimentacao.valor)
        movementsActions.deletarMovimentacao(contexto.dispatch, newMovimentacao)
    }

    const handleEditar = () => {
        if(contexto.state.contas.length <= 0) {
            errorMessageActions.exibirMensagem(contexto.dispatch, {
                mensagem: "Adicione uma conta antes de seguir.", 
                titulo: 'Aviso', 
                tipo: 'warning', 
                link: '/contas'
            })
            return
        }
        if(contexto.state.categorias.length <= 0) {
            errorMessageActions.exibirMensagem(contexto.dispatch, {
                mensagem: "Adicione uma categoria antes de seguir.", 
                titulo: 'Aviso', 
                tipo: 'warning', 
                link: '/categorias'
            })
            return
        }
        setMovimentacaoMemento(movimentacao)
        setMovimentacaoEditavel(movimentacao.id)
    }

    return (
        <li className={ styles.movimentacao } onKeyDown={ e => handleAtualizar(e) } tabIndex={0}>
            { movimentacaoEditavel ? 
                (<> 
                    <input type='date' value={ movimentacaoInput.data } 
                        onChange={ e => setMovimentacaoInput({ ...movimentacaoInput, data: e.target.value }) } 
                    />

                    <input value={movimentacaoInput.nome} onChange={ e => setMovimentacaoInput({ ...movimentacaoInput, nome: e.target.value }) } />

                    <input value={movimentacaoInput.valor} onChange={ e => handleChangeValor(e) } />

                    <select value={ categoriaSelecionada.nome } onChange={ handleChangeCategoria }>
                        { contexto.state.categorias.map((categoria, i) => (<option key={i} id={categoria.id}>{categoria.nome}</option>)) }
                    </select>

                    <select value={ contaSelecionada.nome } onChange={ handleChangeConta }>
                        { contexto.state.contas.map((conta, i) => (<option key={i} id={conta.id}>{conta.nome}</option>)) }
                    </select>

                    <span>
                        <i 
                            className='bx bx-check'
                            onClick={ e => handleAtualizar(e) }
                        ></i>
                        <i 
                            className='bx bx-trash' 
                            onClick={ handleDeletar }
                        ></i>
                    </span>
                </>)
            : 
                (<> 
                    <span><div className={styles.nomeLinha}>Data: </div>{ movimentacao.data }</span>
                    <span><div className={styles.nomeLinha}>Nome: </div>{ movimentacao.nome }</span>
                    <span><div className={styles.nomeLinha}>Valor: </div>{ movimentacao.valor }</span>
                    <span><div className={styles.nomeLinha}>Categoria: </div>{ movimentacao.categoria ?? 'Sem Categoria' }</span>
                    <span onClick={(() => navigate(`/editar-conta/${movimentacao.contaId}`))}>
                        <div className={styles.nomeLinha}>Conta: </div>
                        { movimentacao.conta ?? 'Sem Conta' }
                    </span>
                    <span>
                        { movimentacao.categoriaId !== 0 ?
                            <i  display={movimentacao.categoriaId === 0 ? 'none' : 'block'}
                                className='bx bx-edit-alt'
                                onClick={ handleEditar }
                            ></i>
                        :
                            null
                        }
                        
                        <i
                            className='bx bx-trash'
                            onClick={ handleDeletar }
                        ></i>
                    </span>
                </>)
        }</li>
    )
})

export default Movimentacao