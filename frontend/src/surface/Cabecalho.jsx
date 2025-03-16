import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { DadosContexto } from "../store"
import { userActions } from "../store/action"
import { getToken } from "../store/action/fetchAPI"

import styles from "../estilos/Cabecalho.module.css"
import logo from "../assets/logo.png"

export default function Cabecalho() {
    const contexto = useContext(DadosContexto)

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const [btnLogin, setBtnLogin] = useState('') //define se botao de login vai estar escrito login ou logout
    useEffect(() => {
        setBtnLogin(getToken() ? 'LOGOUT' : 'LOGIN')
    }, [contexto.state.usuario])
   
    let location = useLocation(); //usado para saber o path atual
    let barraNav //lista de telas no cabecalho
    let linkLogo //para onde o logo vai levar ao clicar
    let iconeLista //serve para manipular o botão de lista

    // Pega o nome do path atual
    let titulo = location.pathname;
    if(titulo === '/'){
        titulo = ''
    } else {
        titulo = titulo.replace('/', '').replace('-', ' ');
        titulo = titulo.split('/')[0];
    }

    // muda o cabecalho de acordo com a tela atual
    if (titulo === '' || titulo === 'login' || titulo === 'cadastro'){
        barraNav = (<></>)
        iconeLista = (<></>)
        linkLogo = '/'
    } else {
        iconeLista = (
            <button className={styles.botaoMenu} onClick={toggleMenu}>
                &#9776; {/*icone de lista*/}
            </button>
        )
        if (menuOpen){
            barraNav = (
                <nav className={`${styles.containerNavegacao} ${styles.open}`}>
                    <Link to='/despesas'>Despesas</Link>
                    <Link to='/receitas'>Receitas</Link>
                    <Link to='/categorias'>Categorias</Link>
                    <Link to='/contas'>Contas</Link>
                    <Link to='/relatorios'>Relatórios</Link>
                </nav>
            )
        } else {
            barraNav = (
                <nav className={`${styles.containerNavegacao} ${styles.close}`}>
                    <Link to='/despesas'>Despesas</Link>
                    <Link to='/receitas'>Receitas</Link>
                    <Link to='/categorias'>Categorias</Link>
                    <Link to='/contas'>Contas</Link>
                    <Link to='/relatorios'>Relatórios</Link>
                </nav>
            )
        }
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
                    <h2 className={styles.titulo}>{titulo}</h2>
                </div>
                <div>
                    <Link to='/login' onClick={handleClick}>{btnLogin}</Link>
                </div>
            </div>
            {iconeLista}
            {barraNav}
        </header>
    )
}