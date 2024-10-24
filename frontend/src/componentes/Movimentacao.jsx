import { useContext, useState } from 'react'

import styles from "../estilos/Movimentacoes.module.css"

import { DadosContexto } from "../store/index.js"

export default function Movimentacao({ tipo, id, data, categoria, valor, nome, conta, movimentacaoEditavel, setMovimentacaoEditavel }) {
    const contexto = useContext(DadosContexto)
    const [ despesa, setDespesa ] = useState({
        id,
        data,
        valor: valor.toFixed(2),
        nome,
        categoria,
        conta
    })

    let dataFormatada = data.split('T')[0].split('-').reverse().join('/')

    valor = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    return (
        <li className={ styles.movimentacao }>
            { movimentacaoEditavel ? 
                (<> <input value={despesa.data} onChange={ e => setDespesa({ ...despesa, data: e.target.value }) } />
                    <input value={despesa.nome} onChange={ e => setDespesa({ ...despesa, nome: e.target.value }) } />
                    <input type='number' value={despesa.valor} onChange={ e => setDespesa({ ...despesa, valor: +e.target.value }) } step={0.01}/>
                    <input value={despesa.categoria} onChange={ e => setDespesa({ ...despesa, categoria: e.target.value }) } />
                    <input value={despesa.conta} onChange={ e => setDespesa({ ...despesa, conta: e.target.value }) } />
                    <span>
                        <i 
                            className='bx bx-check'
                            onClick={() => {
                                setMovimentacaoEditavel(null)
                                contexto.dispatch({ type: 'atualizarDespesa', payload: { despesa } })
                            }}
                        ></i>
                        <i 
                            className='bx bx-trash' 
                            onClick={() => contexto.dispatch({ type: 'atualizarDespesa', payload: { despesa } })}
                        ></i>
                    </span></>)
            : 
                (<> <span>{ dataFormatada }</span>
                    <span>{ nome }</span>
                    <span>{ valor }</span>
                    <span>{ categoria }</span>
                    <span>{ conta }</span>
                    <span>
                        <i 
                            className='bx bx-edit-alt'
                            onClick={() => setMovimentacaoEditavel(id)}
                        ></i>
                        <i 
                            className='bx bx-trash' 
                            onClick={() => contexto.dispatch({ type: 'removerDespesa', payload: { id: id } })}
                        ></i>
                    </span></>)
            }
            
        </li>
    )
}