

export default function TextGasto({nome, valor, tipo}){

    let ValorDespesa

    if (tipo === "Receita"){
        ValorDespesa = "+ " + valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    } else if(tipo === "Despesa") {
        ValorDespesa = "- " + valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{nome}</span>
            <span>{ValorDespesa}</span>
        </div>
    );
}