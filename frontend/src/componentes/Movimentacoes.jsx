import { useState, useContext, useEffect } from "react";
import Movimentacao from "../componentes/Movimentacao";
import Seletor from "../componentes/Seletor";
import BotaoAcao from "../componentes/BotaoAcao";
import styles from "../estilos/Movimentacoes.module.css"


import { DadosContexto } from "../store"

export default function Movimentacoes({ tipo }) {
    const [ seletorAtivo, setSeletorAtivo ] = useState(null)
    const [ isUp, setIsUp ] = useState(false)
    const [ movimentacaoEditavel, setMovimentacaoEditavel ] = useState(null)
    const seletores = ['data', 'nome', 'valor', 'categoria', 'conta', 'Filtro']
    
    const contexto = useContext(DadosContexto)

    const tratarClique = (seletor) => {
        if (seletor === seletorAtivo) {
            setIsUp(prev => !prev)
        } else {
            setSeletorAtivo(seletor)
            setIsUp(false)
        }
        contexto.dispatch( { type: 'ordenarDespesas', payload: { seletorOrdenador: seletor, invertido: isUp } } )
    }

    useEffect(() => contexto.dispatch( { type: 'ordenarDespesas', payload: { seletorOrdenador: seletorAtivo, invertido: isUp } } ), [isUp, seletorAtivo])
    
    return (
        <section className={ styles.containerMovimentacoes }>
            <div className={ styles.seletores }>
                { seletores.map((seletor) =>
                    (<Seletor  
                        nome={ seletor }
                        key={ seletor } 
                        isAtivo={ seletorAtivo === seletor }
                        isUp= { isUp && seletorAtivo === seletor }
                        setAtivo={ tratarClique }
                    />)
                )}
            </div>
            <ul>
                { contexto.state.despesas.map(despesa => 
                    (<Movimentacao  
                        tipo="despesa" 
                        key={ despesa.id } 
                        id={ despesa.id }
                        nome={ despesa.nome }
                        categoria={ despesa.categoria } 
                        valor={ despesa.valor } 
                        data={ despesa.data } 
                        conta={ despesa.conta }
                        movimentacaoEditavel={ movimentacaoEditavel === despesa.id }
                        setMovimentacaoEditavel={ setMovimentacaoEditavel }
                />)) }
            </ul>
            <div className={styles.total}>
                <p>Total: <span>{ contexto.state.despesas.reduce((acc, atual) => acc + atual.valor, 0)
                    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }</span></p>
                <BotaoAcao link='/adicionar-despesa'>Adicionar { tipo }</BotaoAcao>
            </div>
        </section>
    )
}