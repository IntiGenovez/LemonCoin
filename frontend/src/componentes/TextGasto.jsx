
import { useNavigate } from 'react-router-dom'
import { formatarValor } from '../store/utils'

export default function TextGasto({nome, valor, tipo}){
    const navigate = useNavigate()

    let valorMovimentacao
    let caminho

    if (tipo === 'Receita') {
        valorMovimentacao = '+ ' + formatarValor(valor)
        caminho = '/receitas'
    } else if(tipo === 'Despesa') {
        valorMovimentacao = '- ' + formatarValor(valor)
        caminho = '/despesas'
    }

    return (
        <div onClick={() => navigate(caminho)}
        style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{nome}</span>
            <span>{valorMovimentacao}</span>
        </div>
    );
}