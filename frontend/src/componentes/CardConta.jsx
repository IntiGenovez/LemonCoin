

import styles from '../estilos/CardConta.module.css'

export default function CardConta({icone, nome, saldo}) {
    
    return (
        <div className={styles.CardConta}>
            <img src={icone} alt="Icone" className={styles.icone} />
            <div className={styles.divTexto}>
                <span>{nome}</span>
                <span>{saldo}</span>
            </div>
        </div>
    )
}