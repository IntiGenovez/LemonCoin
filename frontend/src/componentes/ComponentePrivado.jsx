import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { isUserSignedIn } from "../store/actionFirebase/firebase"

export default function ComponentePrivado({ children }) {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = isUserSignedIn(user => {
            setUsuarioAutenticado(user)
            setLoading(false)
        })
        
        return () => unsubscribe()
    }, [])

    if (loading) return <p>Carregando...</p>

    return (
        <>
            { 
                !usuarioAutenticado ? 
                    <Navigate to='/' replace />
                :
                    children 
            }
        </>
    )
} 