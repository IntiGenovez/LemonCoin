import { Link } from "react-router-dom"

import styles from "../estilos/Cabecalho.module.css"
import logo from "../assets/logo.png"

export default function Cabecalho() {
    return (
        <header>
            <div className={styles.cabecalho}>
                <div>
                    <div className={styles.containerLogo}>
                        <img src={logo} alt="Logo LemonCoin" />
                        <h1>LemonCoin</h1>
                    </div>
                </div>
                <div>
                    <h2>Home</h2>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </div>
            <nav className={styles.containerNavegacao}>
                <Link to="/despesas">Despesas</Link>
                <Link to="/receitas">Receitas</Link>
                <Link to="/categorias">Categorias</Link>
                <Link to="/contas">Contas</Link>
                <Link to="/relatorios">Relatórios</Link>
            </nav>
        </header>
    )
}