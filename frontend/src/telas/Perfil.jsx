
import { DadosContexto } from '../store'
import { useContext } from 'react'
import { userActions } from '../store/actionFirebase'

export default function Perfil() {
    const contexto = useContext(DadosContexto)
    return (<><p onClick={ () => userActions.signout(contexto.dispatch) }>logout</p></>)
}