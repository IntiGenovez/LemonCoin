import imgTelaInicial from "../assets/imgTelaInicial.png"

import styles from '../estilos/Apresentacao.module.css'

export default function Apresentacao() {
    return (
        <>
            <img className={styles.logo} src={imgTelaInicial} alt="logo" />
        </>
    )
}