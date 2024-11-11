import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"

import { DadosContexto } from "../store"
import { userActions } from "../store/action"

import styles from "../estilos/Cabecalho.module.css"
import logo from "../assets/logo.png"

export default function Cabecalho() {
    const contexto = useContext(DadosContexto)
    
    let location = useLocation(); //usado para saber o path atual
    let btnLogin //define se botao de login vai estar escrito login ou logout
    let lista //lista de telas no cabecalho
    let linkLogo //para onde o logo vai levar ao clicar

    // Pega o nome do path atual
    let titulo = location.pathname;
    if(titulo === '/'){
        titulo = ''
    } else {
        titulo = titulo.replace('/', '').replace('-', ' ')
    }

    // muda o cabecalho de acordo com a tela atual
    if (titulo === '' || titulo === 'login' || titulo === 'cadastro'){
        lista = (
            <></>
        )
        btnLogin = 'LOGIN'
        linkLogo = '/'
    } else {
        lista = (
            <>
                <Link to='/despesas'>Despesas</Link>
                <Link to='/receitas'>Receitas</Link>
                <Link to='/categorias'>Categorias</Link>
                <Link to='/contas'>Contas</Link>
                <Link to='/relatorios'>Relatórios</Link>
            </>
        )
        btnLogin = 'LOGOUT'
        linkLogo = '/home'
    }

    const handleClick = () => {
        if (btnLogin === 'LOGOUT') {
            userActions.signout(contexto.dispatch)
        }
    }

    return (
        <header>
            <div className={styles.cabecalho}>
                <div>
                    <Link to={linkLogo} className={styles.containerLogo}>
                        <img src={logo} alt='Logo LemonCoin' />
                        <h1>LemonCoin</h1>
                    </Link>
                </div>
                <div>
                    <h2>{titulo}</h2>
                </div>
                <div>
                    <Link to='/login' onClick={handleClick}>{btnLogin}</Link>
                </div>
            </div>
            <nav className={styles.containerNavegacao}>
                {lista}
            </nav>
        </header>
    )
}