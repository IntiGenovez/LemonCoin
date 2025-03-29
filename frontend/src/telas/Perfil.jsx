
import { userActions } from '../store/actionFirebase'

export default function Perfil() {
    return (<><p onClick={ () => userActions.signout() }>logout</p></>)
}