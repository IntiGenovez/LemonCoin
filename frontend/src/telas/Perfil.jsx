
import { DadosContexto } from '../store'
import { useContext, useRef } from 'react'
import { userActions } from '../store/actionFirebase'
import { utils, writeFileXLSX } from "xlsx";

export default function Perfil() {
    const contexto = useContext(DadosContexto)
    const tabelaRef = useRef(null)

    return (
        <>
            <p onClick={ () => userActions.signout(contexto.dispatch) }>logout</p>
            <p onClick={ () => {
                console.log('teste')
                const wb = utils.table_to_book(tabelaRef.current)
                writeFileXLSX(wb, "SheetJSReactExport.xlsx")
            } }>exportar Excel</p>
            <table ref={ tabelaRef } style={{ display: 'none' }}>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Conta</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>{ contexto.state.movimentacoes
                    .map((movimentacao, i) => {
                        return (
                            <tr key={i}>
                                <td>{movimentacao.tipo}</td>
                                <td>{movimentacao.valor}</td>
                                <td>{movimentacao.conta}</td>
                                <td>{movimentacao.categoria}</td>
                                <td>{ 
                                    movimentacao.data.toDate ? 
                                    movimentacao.data.toDate().toLocaleString('pt-BR').split(',')[0] :
                                    movimentacao.data
                                }</td>
                            </tr>
                        )
                    }) 
                }</tbody>
            </table>
        </>
    )
}