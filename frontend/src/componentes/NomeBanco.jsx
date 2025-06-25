import styles from '../estilos/CrudConta.module.css'

export default function NomeBanco({ valor, onClick, onChange, personalizada }) {
    return(
        <>
            <input 
                onClick={ onClick } 
                className={styles.nomeConta}
                value={ personalizada ? valor || '' : valor || 'Conta' }
                onChange={ onChange }
                ></input>
        </>
    )
}