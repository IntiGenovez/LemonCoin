import lapis from '../assets/lapis.png'
import iconeMap from '../store/utils/iconeMap'
import iconeMapPersonalizar from '../store/utils/iconeMapPersonalizar'
import { formatarValor } from '../store/utils'

import { useNavigate } from 'react-router-dom'

import styles from '../estilos/CardConta.module.css'

export default function CardConta({ id, nome, saldo, imgId }) {
    const iconeSrc = iconeMapPersonalizar[imgId] || iconeMap[nome] || lapis 
    let saldoFormatado = saldo || saldo === 0 ? formatarValor(saldo) : ''

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