import { useContext, useEffect } from 'react'
import { DadosContexto } from '../store'
import { historyActions } from '../store/actionFirebase'

import styles from '../estilos/Botao.module.css'
import { useNavigate, useLocation } from 'react-router-dom'

export default function BotaoVoltar({ home }) {
    const contexto = useContext(DadosContexto)
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        console.log(home)
        if(home) {
            navigate('/home')
            return
        }
        const historico = contexto.state.historico
        historyActions.voltarHistorico(contexto.dispatch)
        navigate(historico[historico.length - 2])
    }

    const exibirBotao = () => {
        if(home && location.pathname === '/home') 
            return null

        if(home)
            return <button className={styles.btnVoltar} onClick={ handleClick }><i className='bx bx-home-alt-2'></i></button>

        if(contexto.state.historico.length > 1) 
            return <button className={styles.btnVoltar2} onClick={ handleClick }><i className='bx bx-chevron-left'></i></button>

        return null
    }

    return (
        <>
        { exibirBotao() }
        </>
    )
}