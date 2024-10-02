import styles from "../estilos/Rodape.module.css"

export default function Rodape() {
    return (
        <footer className={styles.rodape}>
            <div>
                <h3>LemonCoin&#169;</h3>
            </div>
            <div className={styles.containerRedesSociais}>
                <i class='bx bxl-facebook-square' ></i>
                <i class='bx bxl-instagram' ></i>
            </div>
        </footer>
    )
}