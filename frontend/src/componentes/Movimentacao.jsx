import { useContext, useEffect, useState } from 'react'
import { DadosContexto } from "../store"
import { movementsActions } from "../store/action"

import styles from "../estilos/Movimentacoes.module.css"


export default function Movimentacao({ movimentacaoListada, movimentacaoEditavel, setMovimentacaoEditavel }) {
    const contexto = useContext(DadosContexto)
    const [ movimentacao, setMovimentacao ] = useState({ ...movimentacaoListada, valor: +movimentacaoListada.valor.toFixed(2) })

    let dataFormatada = movimentacao.data.split('T')[0].split('-').reverse().join('/')

    let valorFormatado = movimentacao.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    return (
        <li className={ styles.movimentacao }>
            { movimentacaoEditavel ? 
                (<> <input value={movimentacao.data} onChange={ e => setMovimentacao({ ...movimentacao, data: e.target.value }) } />
                    <input value={movimentacao.nome} onChange={ e => setMovimentacao({ ...movimentacao, nome: e.target.value }) } />
                    <input type='number' value={movimentacao.valor} onChange={ e => setMovimentacao({ ...movimentacao, valor: +e.target.value }) } step={0.01}/>
                    <input value={movimentacao.categoria} onChange={ e => setMovimentacao({ ...movimentacao, categoria: e.target.value }) } />
                    <input value={movimentacao.conta} onChange={ e => setMovimentacao({ ...movimentacao, conta: e.target.value }) } />
                    <span>
                        <i 
                            className='bx bx-check'
                            onClick={() => {
                                setMovimentacaoEditavel(null)
                                movementsActions.atualizarMovimentacao(contexto.dispatch, movimentacao)
                            }}
                        ></i>
                        <i 
                            className='bx bx-trash' 
                            onClick={() => movementsActions.deletarMovimentacao(contexto.dispatch, movimentacao.id)}
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