import { useContext, useEffect, useState } from "react"

import { DadosContexto } from "../store"
import Pizza from "./Pizza"

import styles from "../estilos/Relatorio.module.css"

export default function RelatorioCategoria({ mudarRelatorio }) {
    const contexto = useContext(DadosContexto)
    const [ movimentacoesPorCategoria, setMovimentacoesPorCategoria ] = useState([{
        categoria: '',
        saldo: 0
    }])
    const [ saldoTotal, setSaldoTotal ] = useState(0)

    useEffect(() => {
        const agrupamento = {}

        contexto.state.movimentacoes.forEach(movimentacao => {
            const categoria = movimentacao.categoria
            if (!agrupamento[categoria]) {
                agrupamento[categoria] = 0
            }

            if (movimentacao.tipo === "Receita") {
                agrupamento[categoria] += movimentacao.valor
            } else if (movimentacao.tipo === "Despesa") {
                agrupamento[categoria] -= movimentacao.valor
            }

        })

        let quatroMaioresCategorias = []
        let somaOutros = 0
        Object.entries(agrupamento).forEach(([categoria, saldo]) => {
            if (quatroMaioresCategorias.length >= 4) {
                const menorSaldo = quatroMaioresCategorias.reduce((acc, atual) => {
                    return acc.saldo < atual.saldo ? acc : atual
                }, false)

                if (menorSaldo.saldo < saldo) {
                    somaOutros += menorSaldo.saldo
                    quatroMaioresCategorias = quatroMaioresCategorias.filter(categoria => categoria.saldo >= saldo)
                    quatroMaioresCategorias.push({ categoria, saldo })
                } else {
                    somaOutros += saldo
                }
            } else {
                quatroMaioresCategorias.push({ categoria, saldo })
            }
        })
        quatroMaioresCategorias.push({ categoria: 'Outros', saldo: somaOutros })

        setMovimentacoesPorCategoria(quatroMaioresCategorias)
    }, [contexto.state.movimentacoes])

    useEffect(() => {
        setSaldoTotal(
            movimentacoesPorCategoria.reduce((acc, { saldo }) => acc + saldo, 0)
        )
    }, [movimentacoesPorCategoria])


    return (
        <div className={ styles.relatorio }>
            <p className={ styles.mudarTelas } onClick={mudarRelatorio}>Categorias</p>
            <div className={styles.alinharRelatorio}>
                <ul>
                    <li><div className={ styles.cor1 }></div>{ movimentacoesPorCategoria[0]?.categoria || ''  }</li>
                    <li><div className={ styles.cor2 }></div>{ movimentacoesPorCategoria[1]?.categoria || '' }</li>
                    <li><div className={ styles.cor3 }></div>{ movimentacoesPorCategoria[2]?.categoria || '' }</li>
                    <li><div className={ styles.cor4 }></div>{ movimentacoesPorCategoria[3]?.categoria || '' }</li>
                    <li><div className={ styles.cor5 }></div>{ movimentacoesPorCategoria[4]?.categoria || '' }</li>
                </ul>
                <Pizza dados={ movimentacoesPorCategoria } cemPorcento={ saldoTotal.toFixed(2) } />
            </div>
        </div>
    )
}