import { Link } from 'react-router-dom'
import styles from '../estilos/Botao.module.css'

export default function BotaoNavegar({ link, children }) {
    return (
        <button className={styles.btnNavegar}><Link to={link}>{ children }</Link></button>
    )
}