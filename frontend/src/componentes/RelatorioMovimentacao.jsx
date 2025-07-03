import { useContext, useEffect, useState } from "react"

import InputFiltro from "./InputFiltro"
import Seletor from "./Seletor"

import { DadosContexto } from "../store"
import Coluna from "./Coluna"

import styles from "../estilos/Relatorio.module.css"

export default function RelatorioMovimentacao() {
    const contexto = useContext(DadosContexto)
    const [ movimentacoesPorMes, setMovimentacoesPorMes ] = useState([{
        mes: '',
        valor: 0,
        tipo: ''
    }])
    const [ maiorValor, setMaiorValor ] = useState(0)

    /* regras para filtragem */
    
    const [filtragem, setFiltragem] = useState(() => () => true)
    const [ filtroOpen, setFiltroOpen ] = useState(false)

    useEffect(() => {
        const agrupamento = {}

        contexto.state.movimentacoes
            .sort((a, b) => a.data.toDate() - b.data.toDate()).filter( filtragem )
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
    }, [contexto.state.movimentacoes, filtragem])

    useEffect(() => {
        const maior = movimentacoesPorMes.reduce((acc, { valor }) => {
            valor = valor[0] > valor[1] ? valor[0] : valor[1]
            return acc > valor ? acc : valor
        }, 0)
        setMaiorValor(maior)
    }, [movimentacoesPorMes])

    // useEffect(() => {
    //     console.log(maiorValor)
    // }, [maiorValor])
    // 
    // useEffect(() => {
    //     console.log('mudou: ' + maiorValor)
    // }, [filtragem])

    return (
        <div className={ styles.relatorio }>
            <div className={ styles.titulo } >
                <div className={ styles.legenda }>
                    <h1>Movimentações</h1>
                    <div>
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
                <Seletor
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                    esconder={ filtroOpen }
                    nome={ 'Filtro' }
                    setFiltroOpen={ () => {
                        setFiltroOpen(prev => !prev)
                        setFiltragem(() => () => true)
                    }} 
                />
                <InputFiltro
                    relatorio
                    open={ filtroOpen } 
                    setFiltroOpen={ () => {
                        setFiltroOpen(prev => !prev)
                        setFiltragem(() => () => true)
                    }} 
                    filtragem={ setFiltragem }
                />
            </div>
            <div className={ styles.alinharRelatorio }>
                { movimentacoesPorMes.map((movimentacao, i) => {
                    return <Coluna key={i} movimentacao={ movimentacao } cemPorcento={ maiorValor } />
                }) }
                { movimentacoesPorMes.length === 0 ? <p>Adicione movimentações para acompanhar os relatórios!</p> : null }
            </div>
        </div>
    )
}