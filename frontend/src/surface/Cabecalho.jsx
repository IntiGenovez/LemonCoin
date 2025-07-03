import { useContext, useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BotaoNavegar from '../componentes/BotaoNavegar'

import { DadosContexto } from '../store'
import { historyActions } from '../store/actionFirebase'
import { isUserSignedIn } from '../store/actionFirebase/firebase'

import styles from '../estilos/Cabecalho.module.css'
import logo from '../assets/logo.png'

export default function Cabecalho() {
    const contexto = useContext(DadosContexto)

    const [menuOpen, setMenuOpen] = useState(false)
    const [usuario, setUsuario] = useState(null) 
    let location = useLocation() //usado para saber o path atual
    const [titulo, setTitulo] = useState('')
    const ref = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setTamanho({
                largura: innerWidth,
                altura: innerHeight
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    const [tamanho, setTamanho] = useState({
        largura: innerWidth,
        altura: innerHeight
    })

    useEffect(() => {
        const unsubscribe = isUserSignedIn(setUsuario)

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if(location.pathname === '/relatorios') {
            setTitulo('Relatórios')
            return
        }
        if(location.pathname === '/'){
            setTitulo('')
        } else {
            setTitulo(location.pathname.replace('/', '').replace('-', ' ').split('/')[0])
        }
    }, [location.pathname])

    const handleMouseOver = () => {
        ref.current.style.display = 'flex'
    }
    
    const handleMouseOut = () => {
        ref.current.style.display = 'none'
    }

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
                            { tamanho.largura > 768 ?
                            <nav onClick={ () => setMenuOpen(prev => !prev) } className={ styles.subNav }
                                onMouseOver={ handleMouseOver}
                                onMouseOut={ handleMouseOut} 
                            >
                                Relatórios
                                <div className={ styles.menu } ref={ ref }>
                                    <a onClick={ () => {
                                        historyActions.mudarRelatorio(contexto.dispatch, 'Movimentações')
                                        navigate('/relatorios')
                                    } } >Movimentações</a>
                                    <hr />
                                    <a onClick={ () => {
                                        historyActions.mudarRelatorio(contexto.dispatch, 'Categorias')
                                        navigate('/relatorios')
                                    } } >Categorias</a>
                                </div>
                            </nav> :
                                <>
                                <Link to='/relatorios' onClick={ () => {
                                    setMenuOpen(prev => !prev)
                                    historyActions.mudarRelatorio(contexto.dispatch, 'Movimentações')
                                    navigate('/relatorios')
                                } }>Relatório Movimentação</Link>
                                <Link to='/relatorios' onClick={ () => {
                                    setMenuOpen(prev => !prev)
                                    historyActions.mudarRelatorio(contexto.dispatch, 'Categorias')
                                    navigate('/relatorios')
                                } }>Relatório Categoria</Link>
                                </>
                            }
                        </nav>
                    </>
            }
        </header>
    )
}