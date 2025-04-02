import styles from '../estilos/CardContaText.module.css'
import { formatarValor } from '../store/utils'

import { useNavigate } from 'react-router-dom'

export default function CardContaText({ conta }){
    const navigate = useNavigate()
    return (
        <div className={ styles.card } onClick={ () => navigate(`/editar-conta/${conta.id}`) } >
            { conta.nome }
            <br />
            { formatarValor(conta.saldo) }
        </div>
    )
}