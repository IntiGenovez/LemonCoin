import { useContext } from 'react'
import { DadosContexto } from '../store'
import { historyActions } from '../store/actionFirebase'

import styles from '../estilos/Botao.module.css'
import { useNavigate } from 'react-router-dom'

export default function BotaoVoltar() {
    const contexto = useContext(DadosContexto)
    const navigate = useNavigate()

    const handleClick = () => {
        const historico = contexto.state.historico
        historyActions.voltarHistorico(contexto.dispatch)
        navigate(historico[historico.length - 2])
    }
    return (
        <button className={styles.btnVoltar} onClick={ handleClick }><i className='bx bx-chevron-left'></i></button>
    )
}