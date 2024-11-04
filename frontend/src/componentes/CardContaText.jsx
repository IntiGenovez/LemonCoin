import styles from "../estilos/CardContaText.module.css"

export default function CardContaText({conta, saldo}){
    
    return (
        <div className={styles.card}>
            {conta}
            <br />
            {saldo}
        </div>
    )
}