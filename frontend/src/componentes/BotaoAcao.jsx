import styles from '../estilos/botao.module.css'
import { Link } from 'react-router-dom'

export default function BotaoAcao({ link, children }) {
    return (
        <button className={styles.btnAcao}><Link to={link}>{ children }</Link></button>
    )
}