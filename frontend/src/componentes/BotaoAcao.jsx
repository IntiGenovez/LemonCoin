import { Link } from 'react-router-dom'
import styles from '../estilos/Botao.module.css'

export default function BotaoAcao({ link }) {
    return (
        <button className={styles.btnAcao} onClick={() => console.log('executar acao')}><i className='bx bx-chevron-left'></i></button>
        
    )
}