import { useState, useEffect, useRef, useContext } from 'react'
import { DadosContexto } from '../store'

import iconeMapPersonalizar from '../store/utils/iconeMapPersonalizar'
import lapis from '../assets/lapis.png'

import styles from '../estilos/BancoSeletor.module.css'

export default function BancoSeletor({ open, closeBancoSeletor, selecionarBanco, setPersonalizada }) {
    const contexto = useContext(DadosContexto) 
    const refBancoSeletor = useRef(null) 

    const handleClick = e => {
        let bancoSelecionado
        if (e.target.tagName === 'IMG') 
            bancoSelecionado = e.target.parentElement.getAttribute('data-banco')
        else
            bancoSelecionado = e.target.getAttribute('data-banco')
        setPersonalizada(true)
        selecionarBanco(bancoSelecionado)
        closeBancoSeletor()
    }

    const closePopup = e => {
        if (refBancoSeletor.current === e.target) closeBancoSeletor()
    }

    const handleKeyDown = e => {
        if (e.code === 'Escape') closeBancoSeletor()
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
            <h2>Escolha um Ícone</h2>
                <div className={styles.scroll}>
                    {
                        Object
                            .entries(iconeMapPersonalizar)
                                .map(banco =>
                                    <div
                                        className={ styles.imagem }
                                        key={ banco[0] }
                                        onClick={ handleClick }
                                        data-banco={ banco[0] }
                                    >
                                        <img src={banco[1]} />
                                    </div>
                                )
                    }
                </div>
            </div>
        </div>
    )
}