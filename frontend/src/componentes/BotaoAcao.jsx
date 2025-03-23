import styles from '../estilos/Botao.module.css'

export default function BotaoAcao({ children, onClick }) {

    return (
        <button className={styles.btnAcao} onClick={e => onClick(e)}>{ children }</button>
    )
}