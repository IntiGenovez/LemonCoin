import { useContext, useEffect, useState } from 'react'
import { DadosContexto } from "../store"
import { movementsActions } from "../store/actionFirebase"
import { useNavigate } from 'react-router-dom'
import formatarValor from '../store/utils/formatCurrency'

import styles from "../estilos/Movimentacoes.module.css"
import formatDateToInputDate from '../store/utils/formatDateToInputDate'


export default function Movimentacao({ movimentacaoListada, movimentacaoEditavel, setMovimentacaoEditavel }) {
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

    const navigate = useNavigate()
    const [ categoriaSelecionada, setCategoriaSelecionada ] = useState({ 
        nome: movimentacao.categoria,
        id: movimentacao.categoriaId,
    })

    const [ contaSelecionada, setContaSelecionada ] = useState({ 
        nome: movimentacao.conta,
        id: movimentacao.contaId,
    })

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

    const handleAtualizar = () => {
        const movimentacaoToFetch = { ...movimentacaoInput }
        movimentacaoToFetch.valor = movimentacaoToFetch.valor.replace('R$ ', '').replace(',', '.')
        movimentacaoToFetch.valor = +movimentacaoToFetch.valor

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
        movimentacao.valor = movimentacao.valor.replace('R$ ', '').replace(',', '.')
        movimentacao.valor = +movimentacao.valor
        movementsActions.deletarMovimentacao(contexto.dispatch, movimentacao)
    }

    return (
        <li className={ styles.movimentacao }>
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
                            onClick={ handleAtualizar }
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
                    <span><div className={styles.nomeLinha}>Categoria: </div>{ movimentacao.categoria }</span>
                    <span onClick={(() => navigate(`/editar-conta/${movimentacao.contaId}`))}>
                        <div className={styles.nomeLinha}>Conta: </div>
                        { movimentacao.conta }
                    </span>
                    <span>
                        <i
                            className='bx bx-edit-alt'
                            onClick={ () => setMovimentacaoEditavel(movimentacao.id) }
                        ></i>
                        <i
                            className='bx bx-trash'
                            onClick={ handleDeletar }
                        ></i>
                    </span>
                </>)
        }</li>
    )
}