import styles from "../estilos/CardContaText.module.css"

export default function CardContaText({conta, saldo}){
    
    conta = conta.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase())
    saldo = saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    return (
        <div className={styles.card}>
            {conta}
            <br />
            {saldo}
        </div>
    )
}