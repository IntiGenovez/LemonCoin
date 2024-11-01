import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

import styles from "../estilos/Cabecalho.module.css"
import logo from "../assets/logo.png"

export default function Cabecalho() {

    let location = useLocation();

    // Pega o nome do path atual
    let titulo = location.pathname;
    if(titulo === "/"){
        titulo = "HOME"
    } else {
        titulo.toUpperCase()
        titulo = titulo.replace('/', '').replace('-', ' ')
    }

    return (
        <header>
            <div className={styles.cabecalho}>
                <div>
                    <Link to='/' className={styles.containerLogo}>
                        <img src={logo} alt='Logo LemonCoin' />
                        <h1>LemonCoin</h1>
                    </Link>
                </div>
                <div>
                    <h2>{titulo}</h2>
                </div>
                <div>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
            <nav className={styles.containerNavegacao}>
                <Link to='/despesas'>Despesas</Link>
                <Link to='/receitas'>Receitas</Link>
                <Link to='/categorias'>Categorias</Link>
                <Link to='/contas'>Contas</Link>
                <Link to='/relatorios'>Relatórios</Link>
            </nav>
        </header>
    )
}