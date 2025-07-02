import { useEffect, useState } from "react"

import styles from "../estilos/Relatorio.module.css"
import { formatarValor } from "../store/utils"

export default function Coluna({ movimentacao, cemPorcento }) {
    const [ porcentagemDespesa, setPorcentagemDespesa ] = useState()
    const [ porcentagemReceita, setPorcentagemReceita ] = useState()
    useEffect(() => {
        setPorcentagemReceita(((movimentacao.valor[0] / cemPorcento) * 100).toFixed(2))
        setPorcentagemDespesa(((movimentacao.valor[1] / cemPorcento) * 100).toFixed(2))
    }, [cemPorcento])

    const handleMouseOver = e => {
        if(e.target.firstChild.style) e.target.firstChild.style.opacity = '100%'
    }

    const handleMouseOut = e => {
        if (e.target.firstChild.style) e.target.firstChild.style.opacity = '0%'
      }

    return (
        <div className={ styles.dado }>
            <div className={ styles.coluna }>
                <div 
                    className={ styles.colunaPreenchida } 
                    style={{ height: `${porcentagemReceita}%` }}
                    onMouseOver={ handleMouseOver }
                    onMouseOut={ handleMouseOut }
                >
                    <div className={styles.tip}>{ 
                        movimentacao.valor[0] ? 
                            formatarValor(movimentacao.valor[0]) : null }</div>
                </div>
                <div
                    className={ `${styles.colunaPreenchida} ${styles.outraCor}` }   
                    style={{ height: `${porcentagemDespesa}%` }}
                    onMouseOver={ handleMouseOver }
                    onMouseOut={ handleMouseOut }
                >
                    <div className={styles.tip}>{ 
                        movimentacao.valor[1] ? 
                        formatarValor(movimentacao.valor[1]) : null }</div>
                </div>
            </div>
            <div className={ styles.legenda }>{ movimentacao.mes }</div>
        </div>
    )
}