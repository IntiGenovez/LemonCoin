import styles from '../estilos/Rodape.module.css'

export default function Rodape() {
    return (
        <footer className={styles.rodape}>
            <div>
                <h3>LemonCoin&#169;</h3>
            </div>
            <div className={styles.containerRedesSociais}>
                <a href='https://www.facebook.com'>
                    <i className='bx bxl-facebook-square' ></i>
                </a>
                <a href='https://www.instagram.com'>
                    <i className='bx bxl-instagram' ></i>
                </a>
            </div>
        </footer>
    )
}