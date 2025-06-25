import { useState, useEffect, useRef, useContext } from 'react'
import { DadosContexto } from '../store'

import iconeMap from '../store/utils/iconeMap'

import styles from '../estilos/BancoSeletor.module.css'

export default function BancoSeletor({ open, closeBancoSeletor, selecionarBanco, contaSelecionada }) {
    const contexto = useContext(DadosContexto) 
    const refBancoSeletor = useRef(null) 

    const nomeContasExistentes = new Set(contexto.state.contas.map(conta => conta.nome))
    const iconesFiltrados = {}
    for (const bancoNome in iconeMap) {
        if (!nomeContasExistentes.has(bancoNome)) {
            iconesFiltrados[bancoNome] = iconeMap[bancoNome]
        }
    }

    const [icones, setIcones] = useState(iconesFiltrados)

    const handleClick = e => {
        setIcones(prev => {
            prev[contaSelecionada] = iconeMap[contaSelecionada]
            delete prev[e.target.getAttribute('banco')]
            return prev
        })
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
                            .entries(icones)
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