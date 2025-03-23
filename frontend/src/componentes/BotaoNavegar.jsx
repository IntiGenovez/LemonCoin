import styles from '../estilos/Botao.module.css'
import { useNavigate } from 'react-router-dom'

export default function BotaoNavegar({ link, children }) {
    const navigate = useNavigate()
    return (
        <button className={styles.btnNavegar} onClick={ () => navigate(link)}>{ children }</button>
    ) 
}