import iconeMap from '../store/utils/iconeMap'

import styles from '../estilos/BancoSeletor.module.css'

export default function BancoSeletor({ open, closeBancoSeletor, selecionarBanco }) {
    const handleClick = e => {
        selecionarBanco(e.target.getAttribute('banco'))
        closeBancoSeletor()
    }
    return (
        <div className={styles.bancoSeletor} style={ open ? {display: 'block'} : {display: 'none'}}>
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
    )
}