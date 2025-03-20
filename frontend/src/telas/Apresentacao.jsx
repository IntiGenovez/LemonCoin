import imgTelaInicial from "../assets/imgTelaInicial.png"
import { Navigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { DadosContexto } from "../store"
import { isUserSignedIn } from "../store/actionFirebase/firebase"

import styles from '../estilos/Apresentacao.module.css'

export default function Apresentacao({ children }) { // Correção aqui
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(false)

    useEffect(() => {
        isUserSignedIn(setUsuarioAutenticado) // Forma mais simples
    }, [])

    return (
        <>
            { 
                !usuarioAutenticado ? 
                    <img className={styles.logo} src={imgTelaInicial} alt="logo" />
                :
                    children 
            }
        </>
    )
}