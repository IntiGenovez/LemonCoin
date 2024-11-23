
import { useNavigate } from "react-router-dom"

export default function TextGasto({nome, valor, tipo}){
    const navigate = useNavigate()

    let valorDespesa
    let caminho

    if (tipo === "Receita") {
        valorDespesa = "+ " + valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        caminho = "/receitas"
    } else if(tipo === "Despesa") {
        valorDespesa = "- " + valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        caminho = "/despesas"
    }

    return (
        <div onClick={() => navigate(caminho)}
        style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{nome}</span>
            <span>{valorDespesa}</span>
        </div>
    );
}