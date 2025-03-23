import { useContext, useEffect, useState } from 'react'
import { DadosContexto } from "../store"
import { movementsActions } from "../store/actionFirebase"
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

    let dataFormatada = movimentacao.data.toLocaleString('pt-BR').split(',')[0] 

    const formatarValor = valor => {
        if (typeof valor === 'number') {
            valor = valor.toString()
            let centavos = valor.split('.')[1]
            if (!centavos) 
                valor = valor + ',00'
            if (centavos?.length === 1)
                valor = valor + '0'
        }

        // Remove tudo o que não for dígito
        valor = valor.replace(/\D/g, '');

        // Se o valor estiver vazio ou não tiver centavos, adiciona "00" como default
        if (valor.length <= 2) {
            valor = '00' + valor
        }

        let reais = valor.slice(0, -2)
        let centavos = valor.slice(-2)

        if (centavos.length === 1) {
            centavos = '0' + centavos;
        }

        // Se o valor de reais for menor que 100, remove os zeros à esquerda
        reais = reais.replace(/^0+/, '') || '0'; // Remove os zeros à esquerda ou garante que tenha pelo menos 1 dígito
    
        let valorFormatado = `R$ ${reais},${centavos}`;
        return valorFormatado

    }

    useEffect(() => {
        setMovimentacao(prev => ({ ...prev, valor: formatarValor(movimentacao.valor) }))
    }, [movimentacao.valor])

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
    
        setMovimentacao(prev => ({ ...prev, valor: formatarValor(valor) }));
    }


    return (
        <li className={ styles.movimentacao }>
            { movimentacaoEditavel ? 
                (<> 
                    <input type='date' value={movimentacao.data} onChange={ e => setMovimentacao({ ...movimentacao, data: e.target.value }) } />

                    <input value={movimentacao.nome} onChange={ e => setMovimentacao({ ...movimentacao, nome: e.target.value }) } />

                    <input value={movimentacao.valor} onChange={ e => handleChangeValor(e) } />

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
                                movimentacao.valor = movimentacao.valor.replace('R$ ', '').replace(',', '.')
                                movimentacao.valor = +movimentacao.valor

                                setMovimentacaoEditavel(null)
                                movimentacao.categoria = categoriaSelecionada.nome
                                movimentacao.categoriaId = categoriaSelecionada.id
                                movimentacao.conta = contaSelecionada.nome
                                movimentacao.contaId = contaSelecionada.id
                                movimentacao.valorAnterior = movimentacaoListada.valor
                                movementsActions.atualizarMovimentacao(contexto.dispatch, movimentacao)
                            }}
                        ></i>
                        <i 
                            className='bx bx-trash' 
                            onClick={() => {                                
                                movimentacao.valor = movimentacao.valor.replace('R$ ', '').replace(',', '.')
                                movimentacao.valor = +movimentacao.valor
                                movementsActions.deletarMovimentacao(contexto.dispatch, movimentacao)
                            }}
                        ></i>
                    </span>
                </>)
            : 
                (<> 
                    <span><div className={styles.nomeLinha}>Data: </div>{ dataFormatada }</span>
                    <span><div className={styles.nomeLinha}>Nome: </div>{ movimentacao.nome }</span>
                    <span><div className={styles.nomeLinha}>Valor: </div>{ movimentacao.valor }</span>
                    <span><div className={styles.nomeLinha}>Categoria: </div>{ movimentacao.categoria }</span>
                    <span onClick={(() => navigate(`/editar-conta/${movimentacao.contaId}`))}>
                        <div className={styles.nomeLinha}>Conta: </div>
                        { movimentacao.conta
                        .toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase())}
                    </span>
                    <span>
                        <i
                            className='bx bx-edit-alt'
                            onClick={() => setMovimentacaoEditavel(movimentacao.id)}
                        ></i>
                        <i
                            className='bx bx-trash'
                            onClick={() => {
                                movimentacao.valor = movimentacao.valor.replace('R$ ', '').replace(',', '.')
                                movimentacao.valor = +movimentacao.valor
                                movementsActions.deletarMovimentacao(contexto.dispatch, movimentacao)}
                            }
                        ></i>
                    </span>
                </>)
        }</li>
    )
}