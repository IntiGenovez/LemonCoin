import iconeAdd from '../assets/add_box.png'
import styles from '../estilos/BotaoAdicionar.module.css'

export default function BotaoAdicionar(){
    return <img src={iconeAdd} alt="adicionar" className={styles.iconeAdd} />
}