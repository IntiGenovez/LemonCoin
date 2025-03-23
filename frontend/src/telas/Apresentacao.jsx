import imgTelaInicial from '../assets/imgTelaInicial.png'
import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isUserSignedIn } from '../store/actionFirebase/firebase'
import Home from './Home.jsx'

import styles from '../estilos/Apresentacao.module.css'

export default function Apresentacao() { 
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(false)
    
    const location = useLocation()
    const pathAfterSlash = location.pathname.split('/')[1]

    useEffect(() => {
        const unsubscribe = isUserSignedIn(setUsuarioAutenticado)
        
        return () => unsubscribe()
    }, [])

    return (
        <>
            { 
                !usuarioAutenticado ? 
                    pathAfterSlash === 'home' ?
                        <Navigate to='/' /> 
                    :
                        <img className={ styles.logo } src={ imgTelaInicial } alt='logo' />
                :
                    pathAfterSlash === 'home' ?
                        <Home /> 
                    :
                        <Navigate to='/home' /> 
            }
        </>
    )
}