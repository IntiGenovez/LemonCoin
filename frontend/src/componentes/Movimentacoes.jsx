import { useState, useContext, useReducer } from "react";
import Movimentacao from "../componentes/Movimentacao";
import Seletor from "../componentes/Seletor";
import BotaoAcao from "../componentes/BotaoAcao";
import styles from "../estilos/Movimentacoes.module.css"


import { DadosContexto } from "../store/index.js"

export default function Movimentacoes({ tipo }) {
    const [ seletorAtivo, setSeletorAtivo ] = useState(null)
    const [ isUp, setIsUp ] = useState(null)
    const [ movimentacaoEditavel, setMovimentacaoEditavel ] = useState(null)
    const seletores = ['Data', 'Nome', 'Valor', 'Categoria', 'Conta', 'Filtro']
    
    const contexto = useContext(DadosContexto)
    const [ total, setTotal ] = useState()
    

    const tratarClique = (seletor) => {
        if (seletor === seletorAtivo) {
            setIsUp(prev => !prev)
        } else {
            setIsUp(false)
            setSeletorAtivo(seletor)
        }
    }
    
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
                        descricao={ despesa.descricao }
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
                <BotaoAcao>Adicionar { tipo }</BotaoAcao>
            </div>
        </section>
    )
}