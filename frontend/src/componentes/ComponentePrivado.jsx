import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getToken } from "../store/action/fetchAPI"

export default function ComponentePrivado({ children }) {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getToken()
        setUsuarioAutenticado(!!token)
        setLoading(false)
    }, [])

    if (loading) return <p>Carregando...</p>

    return (
        <>
            { 
                !usuarioAutenticado ? 
                    <Navigate to='/home' replace />
                :
                    children 
            }
        </>
    )
} 