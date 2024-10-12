
import InputAno from "./InputAno";
import InputMes from "./InputMes";
import InputDia from "./InputDia";

export default function AdicionarMovimentacao({ tipo }){

    return(
        <form action="">
                <h1>{tipo}</h1>
                <input type="text" name="nome" id="nome" />
                <input type="text" name="valor" id="valor" />
                <input type="text" name="categoria" id="categoria" />
                <input type="text" name="recorrencia" id="recorrencia" />
                <input type="text" name="conta" id="conta" />
                <span>Data</span>
                <InputDia />
                <InputMes />
                <InputAno />
                <button>Confirmar</button>
                <button>Cancelar</button>          
                    
        </form>
    );
}