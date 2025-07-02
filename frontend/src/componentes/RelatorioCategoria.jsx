import { useContext, useEffect, useState } from "react"

import { DadosContexto } from "../store"
import { formatarValor } from "../store/utils"
import Pizza from "./Pizza"

import styles from "../estilos/Relatorio.module.css"

export default function RelatorioCategoria({ home = false }) {
    const contexto = useContext(DadosContexto)
    const [ despesasPorCategoria, setDespesasPorCategoria ] = useState([{
        categoria: '',
        saldo: 0
    }])
    const [ receitasPorCategoria, setReceitasPorCategoria ] = useState([{
        categoria: '',
        saldo: 0
    }])
    const [ saldoTotalReceitas, setSaldoTotalReceitas ] = useState(0)
    const [ saldoTotalDespesas, setSaldoTotalDespesas ] = useState(0)

    useEffect(() => {
        const agrupamentoReceitas = {}
        const agrupamentoDespesas = {}

        contexto.state.movimentacoes.forEach(movimentacao => {
            if (movimentacao.categoriaId === 0) return
            let categoria = movimentacao.categoria
            if(categoria?.length > 10) categoria = categoria.substring(0, 9) + '...'
            if (movimentacao.tipo === "Receita") {
                if (!agrupamentoReceitas[categoria]) {
                    agrupamentoReceitas[categoria] = 0
                }

                agrupamentoReceitas[categoria] += movimentacao.valor
            } else if (movimentacao.tipo === "Despesa") {
                if (!agrupamentoDespesas[categoria]) {
                    agrupamentoDespesas[categoria] = 0
                }

                agrupamentoDespesas[categoria] += movimentacao.valor
            }

        })

        let quatroMaioresCategoriasDespesa = []
        let quatroMaioresCategoriasReceita = []

        let somaOutrosDespesa = 0
        let somaOutrosReceita = 0

        Object.entries(agrupamentoDespesas).forEach(([categoria, saldo]) => {
            if (quatroMaioresCategoriasDespesa.length >= 4) {
                const menorSaldo = quatroMaioresCategoriasDespesa.reduce((acc, atual) => {
                    return acc.saldo < atual.saldo ? acc : atual
                }, false)

                if (menorSaldo.saldo < saldo) {
                    somaOutrosDespesa += menorSaldo.saldo
                    quatroMaioresCategoriasDespesa = quatroMaioresCategoriasDespesa.filter(categoria => categoria.saldo >= saldo)
                    quatroMaioresCategoriasDespesa.push({ categoria, saldo })
                } else {
                    somaOutrosDespesa += saldo
                }
            } else {
                quatroMaioresCategoriasDespesa.push({ categoria, saldo })
            }
        })
        if(somaOutrosDespesa !== 0)
            quatroMaioresCategoriasDespesa.push({ categoria: 'Outros', saldo: somaOutrosDespesa })

        Object.entries(agrupamentoReceitas).forEach(([categoria, saldo]) => {
            if (quatroMaioresCategoriasReceita.length >= 4) {
                const menorSaldo = quatroMaioresCategoriasReceita.reduce((acc, atual) => {
                    return acc.saldo < atual.saldo ? acc : atual
                }, false)

                if (menorSaldo.saldo < saldo) {
                    somaOutrosReceita += menorSaldo.saldo
                    quatroMaioresCategoriasReceita = quatroMaioresCategoriasReceita.filter(categoria => categoria.saldo >= saldo)
                    quatroMaioresCategoriasReceita.push({ categoria, saldo })
                } else {
                    somaOutrosReceita += saldo
                }
            } else {
                quatroMaioresCategoriasReceita.push({ categoria, saldo })
            }
        })
        if(somaOutrosReceita !== 0)
            quatroMaioresCategoriasReceita.push({ categoria: 'Outros', saldo: somaOutrosReceita })

        setDespesasPorCategoria(quatroMaioresCategoriasDespesa)
        setReceitasPorCategoria(quatroMaioresCategoriasReceita)
    }, [contexto.state.movimentacoes])

    useEffect(() => {
        setSaldoTotalReceitas(
            receitasPorCategoria.reduce((acc, { saldo }) => acc + saldo, 0)
        )
    }, [receitasPorCategoria])

    useEffect(() => {
        setSaldoTotalDespesas(
            despesasPorCategoria.reduce((acc, { saldo }) => acc + saldo, 0)
        )
    }, [despesasPorCategoria])


    return (
        <div className={ styles.relatorioPizzas }>
            { home ? null : <h1>Categorias</h1> } 
            <div className={styles.viewPizza}>
                { receitasPorCategoria.length === 0 && despesasPorCategoria.length === 0 ? <p>Adicione movimentações para acompanhar os relatórios!</p> : <>
                { receitasPorCategoria.length === 0 || home ? null :
                <>
                    <div className={styles.dadoPizza}>
                        <div>
                            <h2>Receitas</h2>
                            <ul>
                                { receitasPorCategoria[0] && receitasPorCategoria[0].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor1 }></div><p>{ receitasPorCategoria[0]?.categoria }</p><p>{ ((receitasPorCategoria[0]?.saldo / saldoTotalReceitas) * 100).toFixed() }%</p><p>{ formatarValor(receitasPorCategoria[0]?.saldo) }</p></li> : null
                                }
                                { receitasPorCategoria[1] && receitasPorCategoria[1].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor2 }></div><p>{ receitasPorCategoria[1]?.categoria }</p><p>{ ((receitasPorCategoria[1]?.saldo / saldoTotalReceitas) * 100).toFixed() }%</p><p>{ formatarValor(receitasPorCategoria[1]?.saldo) }</p></li> : null
                                }
                                { receitasPorCategoria[2] && receitasPorCategoria[2].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor3 }></div><p>{ receitasPorCategoria[2]?.categoria }</p><p>{ ((receitasPorCategoria[2]?.saldo / saldoTotalReceitas) * 100).toFixed() }%</p><p>{ formatarValor(receitasPorCategoria[2]?.saldo) }</p></li> : null
                                }
                                { receitasPorCategoria[3] && receitasPorCategoria[3].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor4 }></div><p>{ receitasPorCategoria[3]?.categoria }</p><p>{ ((receitasPorCategoria[3]?.saldo / saldoTotalReceitas) * 100).toFixed() }%</p><p>{ formatarValor(receitasPorCategoria[3]?.saldo) }</p></li> : null
                                }
                                { receitasPorCategoria[4] && receitasPorCategoria[4].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor5 }></div><p>{ receitasPorCategoria[4]?.categoria }</p><p>{ ((receitasPorCategoria[4]?.saldo / saldoTotalReceitas) * 100).toFixed() }%</p><p>{ formatarValor(receitasPorCategoria[4]?.saldo) }</p></li> : null
                                }
                            </ul>
                        </div>
                        <Pizza dados={ receitasPorCategoria } cemPorcento={ saldoTotalReceitas.toFixed() } />
                    </div>
                </> }

                { despesasPorCategoria.length === 0 ? (home ? <p>Adicione despesas para ver o relatório!</p> : null) : <>
                    <div className={styles.dadoPizza}>
                        <div>
                            { home ? null : <h2>Despesas</h2> }
                            <ul>
                                { despesasPorCategoria[0] && despesasPorCategoria[0].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor1 }></div><p>{ despesasPorCategoria[0]?.categoria }</p><p>{ ((despesasPorCategoria[0]?.saldo / saldoTotalDespesas) * 100).toFixed() }%</p><p>{ formatarValor(despesasPorCategoria[0]?.saldo) }</p></li> : null
                                }
                                { despesasPorCategoria[1] && despesasPorCategoria[1].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor2 }></div><p>{ despesasPorCategoria[1]?.categoria }</p><p>{ ((despesasPorCategoria[1]?.saldo / saldoTotalDespesas) * 100).toFixed() }%</p><p>{ formatarValor(despesasPorCategoria[1]?.saldo) }</p></li> : null
                                }
                                { despesasPorCategoria[2] && despesasPorCategoria[2].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor3 }></div><p>{ despesasPorCategoria[2]?.categoria }</p><p>{ ((despesasPorCategoria[2]?.saldo / saldoTotalDespesas) * 100).toFixed() }%</p><p>{ formatarValor(despesasPorCategoria[2]?.saldo) }</p></li> : null
                                }
                                { despesasPorCategoria[3] && despesasPorCategoria[3].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor4 }></div><p>{ despesasPorCategoria[3]?.categoria }</p><p>{ ((despesasPorCategoria[3]?.saldo / saldoTotalDespesas) * 100).toFixed() }%</p><p>{ formatarValor(despesasPorCategoria[3]?.saldo) }</p></li> : null
                                }
                                { despesasPorCategoria[4] && despesasPorCategoria[4].saldo !== 0 ?
                                    <li className={ styles.legenda }><div className={ styles.cor5 }></div><p>{ despesasPorCategoria[4]?.categoria }</p><p>{ ((despesasPorCategoria[4]?.saldo / saldoTotalDespesas) * 100).toFixed() }%</p><p>{ formatarValor(despesasPorCategoria[4]?.saldo) }</p></li> : null
                                }
                            </ul>
                        </div>
                        <Pizza dados={ despesasPorCategoria } cemPorcento={ saldoTotalDespesas.toFixed() } />
                    </div>
                </> } </> }
            </div>
        </div>
    )
}