import styles from "../estilos/Movimentacoes.module.css"
import { useState } from "react"

export default function Seletor({ nome, isAtivo, isUp, setAtivo }) {
    return (
        <>
        {
            nome !== 'Filtro' ?
            (<div onClick={() => setAtivo(nome)}>
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
