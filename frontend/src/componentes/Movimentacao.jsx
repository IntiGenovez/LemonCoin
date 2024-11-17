import { useContext, useEffect, useState } from 'react'
import { DadosContexto } from "../store"
import { movementsActions } from "../store/action"

import styles from "../estilos/Movimentacoes.module.css"


export default function Movimentacao({ movimentacaoListada, movimentacaoEditavel, setMovimentacaoEditavel }) {
    const contexto = useContext(DadosContexto)
    const [ movimentacao, setMovimentacao ] = useState({ ...movimentacaoListada, valor: +movimentacaoListada.valor.toFixed(2) })
    const [ categoriaSelecionada, setCategoriaSelecionada ] = useState({ 
        nome: movimentacao.categoria,
        id: movimentacao.categoriaId,
    })
    const [ contaSelecionada, setContaSelecionada ] = useState({ 
        nome: movimentacao.conta,
        id: movimentacao.contaId,
    })

    let dataFormatada = movimentacao.data.split('T')[0].split('-').reverse().join('/')

    let valorFormatado = movimentacao.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

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


    return (
        <li className={ styles.movimentacao }>
            { movimentacaoEditavel ? 
                (<> <input value={movimentacao.data} onChange={ e => setMovimentacao({ ...movimentacao, data: e.target.value }) } />
                    <input value={movimentacao.nome} onChange={ e => setMovimentacao({ ...movimentacao, nome: e.target.value }) } />
                    <input type='number' value={movimentacao.valor} onChange={ e => setMovimentacao({ ...movimentacao, valor: +e.target.value }) } step={0.01}/>
                    <select value={ categoriaSelecionada.nome } onChange={ handleChangeCategoria }>
                        { contexto.state.categorias.map((categoria, i) => (<option key={i} id={categoria.id}>{categoria.nome}</option>)) }
                    </select>
                    <select value={ contaSelecionada.nome } onChange={ handleChangeConta }>
                        { contexto.state.contas.map((conta, i) => (<option key={i} id={conta.id}>{conta.nome}</option>)) }
                    </select>
                    <span>
                        <i 
                            className='bx bx-check'
                            onClick={() => {
                                setMovimentacaoEditavel(null)
                                movimentacao.categoria = categoriaSelecionada.nome
                                movimentacao.categoria = categoriaSelecionada.nome
                                movimentacao.conta = contaSelecionada.nome
                                movimentacao.conta = contaSelecionada.nome
                                movementsActions.atualizarMovimentacao(contexto.dispatch, movimentacao)
                            }}
                        ></i>
                        <i 
                            className='bx bx-trash' 
                            onClick={() => {
                                movementsActions.deletarMovimentacao(contexto.dispatch, movimentacao.id)
                            }}
                        ></i>
                    </span></>)
            : 
                (<> <span>{ dataFormatada }</span>
                    <span>{ movimentacao.nome }</span>
                    <span>{ valorFormatado }</span>
                    <span>{ movimentacao.categoria }</span>
                    <span>{ movimentacao.conta }</span>
                    <span> 
                        <i 
                            className='bx bx-edit-alt'
                            onClick={() => setMovimentacaoEditavel(movimentacao.id)}
                        ></i>
                        <i 
                            className='bx bx-trash' 
                            onClick={() => movementsActions.deletarMovimentacao(contexto.dispatch, movimentacao.id)}
                        ></i>
                    </span></>)
            }
            
        </li>
    )
}