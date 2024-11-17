import { useNavigate } from 'react-router-dom'

import iconeAdd from '../assets/add_box.png'
import styles from '../estilos/BotaoAdicionar.module.css'

export default function BotaoAdicionar({ path, onClick }) {
    const navigate = useNavigate()
    const handleClick = e => {
        if (path) {
            navigate(`${path}`)
        } else {
            onClick(e)
        }
    }
    return <img 
        src={iconeAdd} 
        alt="adicionar" 
        className={styles.iconeAdd}
        onClick={handleClick} />
}