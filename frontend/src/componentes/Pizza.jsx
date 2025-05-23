import { useEffect, useState } from "react"
import styles from "../estilos/Relatorio.module.css"

export default function Pizza({ dados, cemPorcento }) {
    const [ porcentagemPorCategoria, setPorcentagemPorCategoria ] = useState([])
    useEffect(() => {
        let soma = 0
        const porcentagens = dados.map((categoria, i) => {
            soma += ((360 * categoria.saldo) / cemPorcento)
            return cemPorcento > 0 ? soma : 0
        }
        )
        setPorcentagemPorCategoria(porcentagens)
    }, [cemPorcento, dados])

    return (
        <div className={ styles.graficoPizza } style={{
            backgroundImage: `conic-gradient(
                pink ${porcentagemPorCategoria[0] || 0}deg,
                lightblue 0 ${porcentagemPorCategoria[1] || 0}deg,
                orange 0 ${porcentagemPorCategoria[2] || 0}deg,
                aquamarine 0 ${porcentagemPorCategoria[3] || 0}deg,
                chartreuse 0 ${porcentagemPorCategoria[4] || 0}deg
            )`
        }}></div>
    )
}