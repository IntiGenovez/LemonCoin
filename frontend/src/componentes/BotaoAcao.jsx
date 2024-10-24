import { Link } from 'react-router-dom'
import styles from '../estilos/Botao.module.css'

export default function BotaoAcao({ children }) {
    return (
        <button className={styles.btnAcao} onClick={() => console.log('executar acao')}>{ children }</button>
        
    )
}