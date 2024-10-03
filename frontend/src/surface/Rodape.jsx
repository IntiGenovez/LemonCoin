import styles from "../estilos/Rodape.module.css"

export default function Rodape() {
    return (
        <footer className={styles.rodape}>
            <div>
                <h3>LemonCoin&#169;</h3>
            </div>
            <div className={styles.containerRedesSociais}>
                <i className='bx bxl-facebook-square' ></i>
                <i className='bx bxl-instagram' ></i>
            </div>
        </footer>
    )
}