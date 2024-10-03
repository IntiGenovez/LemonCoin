import styles from "../estilos/Movimentacoes.module.css"
import { useState } from "react"

export default function Seletor({ nome, isAtivo, setAtivo }) {
    const [isUp, setIsUp] = useState(false)

    const tratarClique = () => {
        isAtivo ? setIsUp(prev => !prev) : null
        setAtivo(nome)
    }

    return (
        <>
        {
            nome !== 'Filtro' ?
            (<div onClick={tratarClique}>
                <label>{ nome }</label>
                <i className={`bx ${isUp ? 'bx-chevron-up' : 'bx-chevron-down'} ${isAtivo ? styles.selecionado : ''}`}></i>  
            </div>)
            :
            (<div>
                <i class='bx bx-filter-alt'></i>
            </div>)
        }
        </>
    )
}
