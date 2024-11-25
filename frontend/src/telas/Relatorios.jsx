import { useState } from "react"
import RelatorioCategoria from "../componentes/RelatorioCategoria"
import RelatorioMovimentacao from "../componentes/RelatorioMovimentacao"
import styles from "../estilos/Relatorio.module.css"

export default function Relatorios() {
    const [ rel, setRel ] = useState('Despesas')
    return (
        <div className='tela-padrao'>
            <p className={ styles.mudarTelas } onClick={ () => setRel(prev => prev === 'Despesas' ? 'Categorias': 'Despesas') }>{ rel }</p>
            {
                rel === 'Despesas' ?
                    <RelatorioCategoria /> :
                    <RelatorioMovimentacao />
            }
        </div>
    )
}