import AdicionarMovimentacao from "../componentes/AdicionarMovimentacao";


export default function TelaAdicionarMovimentacao({ tipo }){
    return(<div className="tela-padrao"><AdicionarMovimentacao tipo={ tipo } /></div>);
}