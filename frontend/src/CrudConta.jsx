import AdicionarConta from "../telas/AdicionarConta"
import lapis from '../assets/lapis.png'
import styles from '../estilos/CrudConta.module.css'

export default function CrudConta({ tipo }){
    return(
        <form className={styles}>
            <h1>{tipo} Conta</h1>
            <div className={styles.formulario}>
                <img src={lapis} alt="imagem-conta" />
                <div className={styles.dados}>
                    <div className={styles.cabecalho}>
                        <select name="" id=""></select>
                        
                    </div>
                </div>
            </div>
        </form>
    )
}