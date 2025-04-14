import { useContext, useEffect, useState } from "react"

import { DadosContexto } from "../store"
import Coluna from "./Coluna"

import styles from "../estilos/Relatorio.module.css"

export default function RelatorioMovimentacao({ mudarRelatorio }) {
    const contexto = useContext(DadosContexto)
    const [ movimentacoesPorMes, setMovimentacoesPorMes ] = useState([{
        mes: '',
        valor: 0,
        tipo: ''
    }])
    const [ maiorValor, setMaiorValor ] = useState(0)

    useEffect(() => {
        const agrupamento = {}

        contexto.state.movimentacoes
            .sort((a, b) => a.data.toDate() - b.data.toDate())
            .forEach(movimentacao => {
                const dataMovimentacao = movimentacao.data.toDate().toLocaleString('pt-BR').split(',')[0] 
                const mes = dataMovimentacao.split('/')[1]
                const ano = dataMovimentacao.split('/')[2]
                const chaveMes = `${mes}/${ano}`

                if (!agrupamento[chaveMes]) {
                    agrupamento[chaveMes] = [0, 0]
                }

                if(movimentacao.tipo === 'Receita') agrupamento[chaveMes][0] += movimentacao.valor
                if(movimentacao.tipo === 'Despesa') agrupamento[chaveMes][1] += movimentacao.valor
            })

        const resultado = Object.entries(agrupamento).map(([mes, valor]) => ({
            mes,
            valor
        }))

        setMovimentacoesPorMes(resultado)
    }, [contexto.state.movimentacoes])

    useEffect(() => {
        setMaiorValor(movimentacoesPorMes.reduce((acc, { valor }) => {
            valor = valor[0] > valor[1] ? valor[0] : valor[1]
            return acc > valor ? acc: valor
        }, maiorValor))
    }, [movimentacoesPorMes])

    return (
        <div className={ styles.relatorio }>
            <div className={ styles.titulo } >
                <div></div>
                <h1>Movimentações</h1>
                <div className={ styles.legenda }>
                    <div>
                        <div></div>
                        <p>Receitas</p>
                    </div>
                    <div>
                        <div></div>
                        <p>Despesas</p>
                    </div>
                </div>
            </div>
            <div className={ styles.alinharRelatorio }>
                { movimentacoesPorMes.map((movimentacao, i) => {
                    return <Coluna key={i} movimentacao={ movimentacao } cemPorcento={ maiorValor } />
                }) }
                
            </div>
        </div>
    )
}