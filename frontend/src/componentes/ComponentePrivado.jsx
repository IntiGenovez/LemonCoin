import { Navigate } from "react-router-dom"
import { userKey } from "../global"

export default function ComponentePrivado({ children }) {
    const token = localStorage.getItem(userKey)
    if (!token) {
        return <Navigate to='/login' replace />
    } else {
        return <>{ children }</>
    }
}