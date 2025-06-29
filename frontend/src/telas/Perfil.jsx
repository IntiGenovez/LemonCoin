
import { DadosContexto } from '../store'
import { useContext, useRef, useState } from 'react'
import { userActions } from '../store/actionFirebase'
import { utils, writeFileXLSX } from "xlsx"

import styles from '../estilos/Perfil.module.css'

export default function Perfil() {
    const [open, setOpen] = useState(false)
    const [senha, setSenha] = useState('')
    const contexto = useContext(DadosContexto)
    const tabelaRef = useRef(null)

    const handleClickExcluir = () => setOpen(true)
    const handleClickNao = () => setOpen(false)

    const exportarExcel = () => {
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
    }

    return (
        <div className="tela-padrao" style={{ alignItems: 'center' }}>
            <div className={ styles.conteiner }>
                <div>
                    <p>Nome do Usuário: <span  className={ styles.nomeUsuario }>{ contexto.state.usuario.nome }</span></p>
                    <p className={ styles.link } onClick={ exportarExcel }>Exportar Movimentações</p>
                </div>
                <div>
                    <button className={ styles.botao } onClick={ () => userActions.signout(contexto.dispatch) }>Sair</button>
                    <button className={ styles.botaoExcluir } onClick={ handleClickExcluir }>Excluir Conta</button>
                </div>
            </div>
            <div className={ styles.popup } style={ open ? { display: 'flex' } : { display: 'none' }} >
                <h1>Deseja realmente excluir a conta?</h1>
                <p>Você está excluindo sua conta, todas as suas informações serão deletas de maneira irreversível.</p>
                <p>Para excluir sua conta insira sua senha novamente:</p>
                <input type="password" value={ senha } onChange={ e => setSenha(e.target.value) } />
                <div>
                    <button onClick={ handleClickNao }>Não</button>
                    <button onClick={ () => userActions.removeUser(contexto.dispatch, senha) }>Sim</button>
                </div>
            </div>




            <table ref={ tabelaRef } style={{ display: 'none' }}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Conta</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>{ contexto.state.movimentacoes
                    .map((movimentacao, i) => {
                        console.log(movimentacao)
                        return (
                            <tr key={i}>
                                <td>{movimentacao.nome}</td>
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
        </div>
    )
}