import { useNavigate } from 'react-router-dom'

import iconeAdd from '../assets/add_box.png'
import styles from '../estilos/BotaoAdicionar.module.css'

export default function BotaoAdicionar({ path }) {
    const navigate = useNavigate()
    const handleClick = e => {
        navigate(`${path}`)
    }
    return <img 
        src={iconeAdd} 
        alt="adicionar" 
        className={styles.iconeAdd}
        onClick={handleClick} />
}