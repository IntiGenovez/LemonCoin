import lapis from '../assets/lapis.png'
import iconeMap from '../store/utils/iconeMap'
import formatarValor from '../store/utils/formatCurrency'

import { useNavigate } from 'react-router-dom'

import styles from '../estilos/CardConta.module.css'

export default function CardConta({ id, nome, saldo }) {
    const iconeSrc = iconeMap[nome] || lapis 
    let saldoFormatado = saldo ? formatarValor(saldo) : ''

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/editar-conta/${id}`)
    }

    return (
        <div className={ styles.CardConta } onClick={ handleClick }>
            <img src={ iconeSrc } alt={ iconeSrc } className={ styles.icone }/>
            <div className={ styles.divTexto }>
                <span>{ nome || '' }</span>
                <span>{ saldoFormatado }</span>
            </div>
        </div>
    )
}