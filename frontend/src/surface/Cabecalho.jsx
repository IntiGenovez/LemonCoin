import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BotaoNavegar from '../componentes/BotaoNavegar'

import { DadosContexto } from '../store'
import { isUserSignedIn } from '../store/actionFirebase/firebase'

import styles from '../estilos/Cabecalho.module.css'
import logo from '../assets/logo.png'

export default function Cabecalho() {
    const contexto = useContext(DadosContexto)

    const [menuOpen, setMenuOpen] = useState(false)
    const [usuario, setUsuario] = useState(null) 
    let location = useLocation() //usado para saber o path atual
    const [titulo, setTitulo] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = isUserSignedIn(setUsuario)

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if(location.pathname === '/'){
            setTitulo('')
        } else {
            setTitulo(location.pathname.replace('/', '').replace('-', ' ').split('/')[0])
        }
    }, [location.pathname])

    return (
        <header>
            <div className={ styles.cabecalho }>
                <div>
                    <Link to='/home' className={ styles.containerLogo }>
                        <img src={ logo } alt='Logo LemonCoin' />
                        <h1>LemonCoin</h1>
                    </Link>
                </div>
                <div>
                    <h2 className={styles.titulo}>{titulo}</h2>
                </div>
                <div>
                    <BotaoNavegar link={ usuario ? '/perfil' : '/login' }>{ usuario ? (<i className='bx bx-user' ></i>) : 'LOGIN' }</BotaoNavegar>
                </div>
            </div>
            
            {
                (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/cadastro') ?
                    null
                :
                    <>
                        <button className={ styles.botaoMenu } onClick={ () => setMenuOpen(prev => !prev) }>
                            <i className='bx bx-menu'></i> 
                        </button>
                        <nav className={`${styles.containerNavegacao} ${menuOpen ? styles.open : styles.close}`}>
                            <Link to='/despesas' onClick={ () => setMenuOpen(prev => !prev) }>Despesas</Link>
                            <Link to='/receitas' onClick={ () => setMenuOpen(prev => !prev) }>Receitas</Link>
                            <Link to='/categorias' onClick={ () => setMenuOpen(prev => !prev) }>Categorias</Link>
                            <Link to='/contas' onClick={ () => setMenuOpen(prev => !prev) }>Contas</Link>
                            <Link to='/relatorios' onClick={ () => setMenuOpen(prev => !prev) }>Relatórios</Link>
                        </nav>
                    </>
            }
        </header>
    )
}