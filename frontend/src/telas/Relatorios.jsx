import { useState } from "react"
import RelatorioCategoria from "../componentes/RelatorioCategoria"
import RelatorioMovimentacao from "../componentes/RelatorioMovimentacao"
import styles from "../estilos/Relatorio.module.css"

export default function Relatorios() {
    const [ relatorio, setRelatorio ] = useState('Despesas')
    const mudarRelatorio = () => {
        setRelatorio(prev => prev === 'Despesas' ? 'Categorias': 'Despesas') 
    }
    return (
        <div className='tela-padrao'>
            {
                relatorio === 'Despesas' ?
                    <RelatorioCategoria mudarRelatorio={mudarRelatorio} /> :
                    <RelatorioMovimentacao mudarRelatorio={mudarRelatorio} />
            }
        </div>
    )
}