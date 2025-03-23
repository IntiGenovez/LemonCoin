import styles from '../estilos/Botao.module.css'

export default function BotaoVoltar() {
    return (
        <button className={styles.btnVoltar} onClick={() => history.back()}><i className='bx bx-chevron-left'></i></button>
        
    )
}