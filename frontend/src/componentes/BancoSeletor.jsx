import { useEffect, useRef } from 'react'

import iconeMap from '../store/utils/iconeMap'

import styles from '../estilos/BancoSeletor.module.css'

export default function BancoSeletor({ open, closeBancoSeletor, selecionarBanco }) {
    const refBancoSeletor = useRef(null) 
    const handleClick = e => {
        selecionarBanco(e.target.getAttribute('banco'))
        closeBancoSeletor()
    }

    const closePopup = e => {
        if(refBancoSeletor.current === e.target) closeBancoSeletor()
    }

    useEffect(() => {
        refBancoSeletor.current.focus()
    }, [open])

    return (
        <div 
            className={styles.bancoSeletor} 
            style={ open ? {display: 'flex'} : {display: 'none'}}
            onKeyDown={ e => closePopup(e) }
            onClick={ e => closePopup(e) }
            ref={ refBancoSeletor }
            tabIndex={ 0 }
        >
            <div className={styles.popup}>
                <div className={styles.scroll}>
                    {
                        Object
                            .entries(iconeMap)
                                .map(banco =>
                                    <div
                                        className={ styles.imagem }
                                        key={banco[0]}
                                        onClick={ handleClick }
                                    >
                                        <img src={banco[1]} banco={banco[0]} />
                                        <p>{ banco[0] }</p>
                                    </div>
                                )
                    }
                </div>
            </div>
        </div>
    )
}