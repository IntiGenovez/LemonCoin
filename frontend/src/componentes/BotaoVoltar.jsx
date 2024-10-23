import { Link } from 'react-router-dom'
import styles from '../estilos/BotaoVoltar.module.css'

export default function BotaoAcao({ link }) {
    return (
        <button className={styles.btnVoltar} onClick={() => history.back()}><i className='bx bx-chevron-left'></i></button>
        
    )
}