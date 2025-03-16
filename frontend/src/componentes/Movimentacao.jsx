import { useContext, useEffect, useState } from 'react'
import { DadosContexto } from "../store"
import { movementsActions } from "../store/action"
import { useNavigate } from 'react-router-dom'

import styles from "../estilos/Movimentacoes.module.css"


export default function Movimentacao({ movimentacaoListada, movimentacaoEditavel, setMovimentacaoEditavel }) {
    const contexto = useContext(DadosContexto)
    const [ movimentacao, setMovimentacao ] = useState({ ...movimentacaoListada, valor: +movimentacaoListada.valor.toFixed(2) })
    const navigate = useNavigate()
    const [ categoriaSelecionada, setCategoriaSelecionada ] = useState({ 
        nome: movimentacao.categoria,
        id: movimentacao.categoriaId,
    })

    const [ contaSelecionada, setContaSelecionada ] = useState({ 
        nome: movimentacao.conta,
        id: movimentacao.contaId,
    })

    let dataFormatada = movimentacao.data.split('T').length === 2 ? 
        movimentacao.data.split('T')[0].split('-').reverse().join('/') : 
        movimentacao.data.split(' ')[0].split('-').reverse().join('/')

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
                (<> 
                    <input value={movimentacao.data} onChange={ e => setMovimentacao({ ...movimentacao, data: e.target.value }) } />

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
                            className='bx bx'
                            onClick={() => {
                                setMovimentacaoEditavel(null)
                                movimentacao.categoria = categoriaSelecionada.nome
                                movimentacao.categoriaId = categoriaSelecionada.id
                                movimentacao.conta = contaSelecionada.nome
                                movimentacao.contaId = contaSelecionada.id
                                movementsActions.atualizarMovimentacao(contexto.dispatch, movimentacao)
                            }}
                        ></i>
                        <i 
                            className='bx bx' 
                            onClick={() => {
                                console.log('alooo')
                                movementsActions.deletarMovimentacao(contexto.dispatch, movimentacao)
                            }}
                        ></i>
                    </span>
                </>)
            : 
                (<> 
                    <span><div className={styles.nomeLinha}>Data: </div>{ dataFormatada }</span>
                    <span><div className={styles.nomeLinha}>Nome: </div>{ movimentacao.nome }</span>
                    <span><div className={styles.nomeLinha}>Valor: </div>{ valorFormatado }</span>
                    <span><div className={styles.nomeLinha}>Categoria: </div>{ movimentacao.categoria }</span>
                    <span onClick={(() => navigate(`/editar-conta/${movimentacao.contaId}`))}>
                        <div className={styles.nomeLinha}>Conta: </div>
                        { movimentacao.conta
                        .replace(/_/g, ' ')
                        .toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase())}
                    </span>
                    <span>
                        <i
                            className='bx bx-edit-alt'
                            onClick={() => setMovimentacaoEditavel(movimentacao.id)}
                        ></i>
                        <i
                            className='bx bx-trash'
                            onClick={() => movementsActions.deletarMovimentacao(contexto.dispatch, movimentacao.id)}
                        ></i>
                    </span>
                </>)
        }</li>
    )
}