import { useContext } from "react"
import { DadosContexto } from "../store"
import RelatorioCategoria from "../componentes/RelatorioCategoria"
import RelatorioMovimentacao from "../componentes/RelatorioMovimentacao"

export default function Relatorios() {
    const contexto = useContext(DadosContexto)
    return (
        <div className='tela-padrao'>
            {
                contexto.state.relatorio === 'Movimentações' ? 
                    <RelatorioMovimentacao />
                :
                    null
            }
            {
                contexto.state.relatorio === 'Categorias' ? 
                    <RelatorioCategoria />
                :
                    null
            }
        </div>
    )
}