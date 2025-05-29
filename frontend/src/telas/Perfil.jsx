
import { DadosContexto } from '../store'
import { useContext, useRef } from 'react'
import { userActions } from '../store/actionFirebase'
import { utils, writeFileXLSX } from "xlsx"

export default function Perfil() {
    const contexto = useContext(DadosContexto)
    const tabelaRef = useRef(null)

    return (
        <>
            <p onClick={ () => userActions.signout(contexto.dispatch) }>logout</p>
            <p onClick={() => {
                const dados = contexto.state.movimentacoes.map(mov => ({
                    Tipo: mov.tipo,
                    Valor: parseFloat(mov.valor),
                    Conta: mov.conta,
                    Categoria: mov.categoria,
                    Data: mov.data.toDate 
                        ? mov.data.toDate().toLocaleDateString('pt-BR')
                        : mov.data
                }));

                // Cria a planilha a partir dos dados
                const ws = utils.json_to_sheet(dados);

                // Aplica filtro no cabeçalho
                const range = utils.decode_range(ws['!ref']);
                ws['!autofilter'] = { ref: utils.encode_range(range) };

                // Formata a coluna "Valor" (coluna B = índice 1) como moeda
                for (let R = range.s.r + 1; R <= range.e.r; ++R) {
                    const cellRef = utils.encode_cell({ c: 1, r: R });
                    const cell = ws[cellRef];
                    if (cell) {
                        cell.t = 'n';
                        cell.z = '"R$" #,##0.00';
                    }
                }

                // Cria e salva o arquivo
                const wb = utils.book_new();
                utils.book_append_sheet(wb, ws, "Movimentações");
                writeFileXLSX(wb, "Movimentacoes.xlsx");

            }}>exportar Excel</p>
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