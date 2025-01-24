import { useContext, useEffect, useState } from "react"

import { DadosContexto } from "../store"
import Coluna from "./Coluna"

import styles from "../estilos/Relatorio.module.css"

export default function RelatorioMovimentacao({ mudarRelatorio }) {
    const contexto = useContext(DadosContexto)
    const [ movimentacoesPorMes, setMovimentacoesPorMes ] = useState([{
        mes: '',
        saldo: 0
    }])
    const [ maiorSaldo, setMaiorSaldo ] = useState(0)

    useEffect(() => {
        const agrupamento = {}

        contexto.state.movimentacoes.forEach(movimentacao => {
            const mes = movimentacao.data.split('-')[1]
            const ano = movimentacao.data.split('-')[0]
            const chaveMes = `${ano}-${mes}`

            if (!agrupamento[chaveMes]) {
                agrupamento[chaveMes] = 0
            }

            if (movimentacao.tipo === 'Receita') {
                agrupamento[chaveMes] += movimentacao.valor
            }
        })

        const resultado = Object.entries(agrupamento).map(([mes, saldo]) => ({
            mes,
            saldo
        }))

        setMovimentacoesPorMes(resultado)
    }, [contexto.state.movimentacoes])

    useEffect(() => {
        setMaiorSaldo(movimentacoesPorMes.reduce((acc, {saldo}) => {
            return acc > saldo ? acc: saldo
        }, maiorSaldo))
    }, [movimentacoesPorMes])

    return (
        <div className={ styles.relatorio }>
            <p className={ styles.mudarTelas } onClick={mudarRelatorio}>Despesas</p>
            <div className={ styles.alinharRelatorio }>
                { movimentacoesPorMes.map((movimentacao, i) => {
                    return <Coluna key={i} movimentacao={ movimentacao } cemPorcento={ maiorSaldo } />
                }) }
            </div>
        </div>
    )
}