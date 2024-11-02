import { useNavigate } from 'react-router-dom';
import styles from '../estilos/Botao.module.css'

export default function BotaoAcao({ children, to }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button className={styles.btnAcao} onClick={handleClick}>{ children }</button>
    )
}