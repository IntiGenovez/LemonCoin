import styles from '../estilos/CrudConta.module.css'

export default function NomeBanco({ valor, onClick }) {
    return(
        <>
            <p onClick={ onClick } className={valor ? '' : styles.naoSelecionado} >{ valor || 'Conta' }</p>
        </>
    )
}