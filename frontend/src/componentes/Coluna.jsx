import { useEffect, useState } from "react"
import styles from "../estilos/Relatorio.module.css"

export default function Coluna({ movimentacao, cemPorcento }) {
    const [ porcentagem, setPorcentagem ] = useState()
    const [ mes, setMes ] = useState()
    useEffect(() => {
        setPorcentagem(((movimentacao.saldo / cemPorcento) * 100).toFixed(2))
        console.log(movimentacao.mes.split('-')[1])
        switch (movimentacao.mes.split('-')[1]) {
            case '01':
                setMes('Janeiro')
                break
            case '02':
                setMes('Fevereiro')
                break
            case '03':
                setMes('Março')
                break
            case '04':
                setMes('Abril')
                break
            case '05':
                setMes('Maio')
                break
            case '06':
                setMes('Junho')
                break
            case '07':
                setMes('Julho')
                break
            case '08':
                setMes('Agosto')
                break
            case '09':
                setMes('Setembro')
                break
            case '10':
                setMes('Outubro')
                break
            case '11':
                setMes('Novembro')
                break
            case '12':
                setMes('Dezembro')
                break
        }
    }, [cemPorcento])

    return (
        <div className={ styles.dado }>
            <div className={ styles.coluna }>
                <div className={ styles.colunaPreenchida } style={{ height: `${porcentagem}%` }}></div>
            </div>
            <div className={ styles.legenda }>{ mes }/{ movimentacao.mes.split('-')[1] }</div>
        </div>
    )
}