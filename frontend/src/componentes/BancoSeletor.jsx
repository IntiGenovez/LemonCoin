import { useState, useEffect, useRef, useContext } from 'react'
import { DadosContexto } from '../store'

import iconeMap from '../store/utils/iconeMap'
import lapis from '../assets/lapis.png'

import styles from '../estilos/BancoSeletor.module.css'

export default function BancoSeletor({ open, closeBancoSeletor, selecionarBanco, contaSelecionada, abrirPersonalizar, setPersonalizada }) {
    const contexto = useContext(DadosContexto) 
    const refBancoSeletor = useRef(null) 

    const nomeContasExistentes = new Set(contexto.state.contas.map(conta => conta.nome))
    const [icones, setIcones] = useState({})

    useEffect(() => {
        const iconesFiltrados = {}
        for (const bancoNome in iconeMap) {
            if (bancoNome === contaSelecionada) continue
            if (!nomeContasExistentes.has(bancoNome)) {
                iconesFiltrados[bancoNome] = iconeMap[bancoNome]
            }
        }
        setIcones(iconesFiltrados)
    }, [contaSelecionada])

    const handleClick = e => {
        let bancoSelecionado
        if (e.target.tagName === 'IMG') 
            bancoSelecionado = e.target.parentElement.getAttribute('data-banco')
        else
            bancoSelecionado = e.target.getAttribute('data-banco')
        setPersonalizada(false)
        selecionarBanco(bancoSelecionado)
        closeBancoSeletor()
    }

    const closePopup = e => {
        if (refBancoSeletor.current === e.target) closeBancoSeletor()
    }

    const handleKeyDown = e => {
        if (e.code === 'Escape') closeBancoSeletor()
    }

    const personalizar = () => {
        abrirPersonalizar()
        closeBancoSeletor()
    }

    useEffect(() => {
        if (open && refBancoSeletor.current)
            refBancoSeletor.current.focus()
    }, [open])
    
    return (
        <div 
            className={styles.bancoSeletor} 
            style={ open ? {display: 'flex'} : {display: 'none'}}
            onKeyDown={ e => handleKeyDown(e) }
            onClick={ e => closePopup(e) }
            ref={ refBancoSeletor }
            tabIndex={ 0 }
        >
            <div className={styles.popup}>
                <div className={styles.scroll} >
                    {
                        Object
                            .entries(icones)
                                .map(banco =>
                                    <div
                                        className={ styles.imagem }
                                        key={ banco[0] }
                                        onClick={ handleClick }
                                        data-banco={ banco[0] }
                                    >
                                        <img src={banco[1]} />
                                        <p>{ banco[0] }</p>
                                    </div>
                                )
                    }
                    <div
                        className={ styles.imagem }
                        onClick={ personalizar }
                    >
                        <img src={lapis} />
                        <p>Personalizar</p>
                    </div>
                </div>
            </div>
        </div>
    )
}