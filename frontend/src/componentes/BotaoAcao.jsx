import styles from '../estilos/botao.module.css'

export default function BotaoAcao({ children }) {
    return (
        <button className={styles}>{ children }</button>
    )
}