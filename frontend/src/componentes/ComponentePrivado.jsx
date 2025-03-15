import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { DadosContexto } from "../store"

export default function ComponentePrivado({ children }) {
    const { state } = useContext(DadosContexto)
    const usuarioAutenticado = state.usuario && state.usuario.token

    if (!usuarioAutenticado) {
        return <Navigate to='/login' replace />
    } else {
        return <>{ children }</>
    }
}