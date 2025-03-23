import imgTelaInicial from "../assets/imgTelaInicial.png"
import { Navigate, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { DadosContexto } from "../store"
import { isUserSignedIn } from "../store/actionFirebase/firebase"
import Home from './Home.jsx'

import styles from '../estilos/Apresentacao.module.css'

export default function Apresentacao({ children }) { // Correção aqui
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(false)
    
    const location = useLocation()
    const pathAfterSlash = location.pathname.split("/")[1]

    useEffect(() => {
        isUserSignedIn(setUsuarioAutenticado) // Forma mais simples
    }, [])

    return (
        <>
            { 
                !usuarioAutenticado ? 
                    pathAfterSlash === 'home' ?
                        <Navigate to='/' /> 
                    :
                        <img className={styles.logo} src={imgTelaInicial} alt="logo" />
                :
                    pathAfterSlash === 'home' ?
                        <Home /> 
                    :
                        <Navigate to='/home' /> 
            }
        </>
    )
}