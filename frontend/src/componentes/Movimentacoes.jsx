import { useState } from "react";
import Movimentacao from "../componentes/Movimentacao";
import Seletor from "../componentes/Seletor";
import BotaoAcao from "../componentes/BotaoAcao";
import styles from "../estilos/Movimentacoes.module.css"

import { despesas } from "../store"

export default function Movimentacoes({ tipo }) {
    const [ seletorAtivo, setSeletorAtivo ] = useState(null)
    const [ isUp, setIsUp ] = useState(false)
    const seletores = ['Data', 'Nome', 'Valor', 'Categoria', 'Conta', 'Filtro']

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
                { despesas.map(despesa =>
                    (<Movimentacao  
                        tipo="despesa" 
                        key={ despesa.id } 
                        descricao={ despesa.descricao }
                        categoria={ despesa.categoria } 
                        valor={ despesa.valor } 
                        data={ despesa.data } 
                        conta={ despesa.conta }
                />)) }
            </ul>
            <div className={styles.total}>
                <p>Total: <span>R$ 2.000,00</span></p>
                <BotaoAcao>Adicionar { tipo }</BotaoAcao>
            </div>
        </section>
    )
}