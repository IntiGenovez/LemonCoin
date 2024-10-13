import InputAno from "./InputAno";
import InputMes from "./InputMes";
import InputDia from "./InputDia";
import InputRecorrencia from "./InputRecorrencia";
import { useState } from "react";

import Styles from '../estilos/AdicionarMovimentacao.module.css';

export default function AdicionarMovimentacao({ tipo }){

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [conta, setConta] = useState('');

    const tratarInput = (setter, event) => {
        setter(event.target.value);
    };

    return(
        <form className={Styles}>
                <div className={Styles.formulario}>
                    <h1>Adicionar {tipo}</h1>

                    <input 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        placeholder="Nome: " 
                        value={nome} 
                        onChange={e => tratarInput(setNome, e)} 
                    />

                    <div>
                         <input 
                            type="text" 
                            name="valor" 
                            id="valor" 
                            placeholder="Valor: R$" 
                            value={valor} 
                            onChange={e => tratarInput(setValor, e)} 
                        />

                        <input 
                            type="text" 
                            name="categoria" 
                            id="categoria" 
                            placeholder="Categoria: " 
                            value={categoria} 
                            onChange={e => tratarInput(setCategoria, e)} 
                        />

                    </div>
                    <div>
                        <InputRecorrencia />
                        <input 
                            type="text" 
                            name="conta" 
                            id="conta" 
                            placeholder="Conta: " 
                            value={conta} 
                            onChange={e => tratarInput(setConta, e)} 
                        />
                    </div>
                    <div className={Styles.divData}>
                        <span>Data: </span>
                        <InputDia />
                        <InputMes />
                        <InputAno />
                    </div>
                    <div className={Styles.Botoes}>
                        <button>Confirmar</button>
                        <button>Cancelar</button>
                    </div>
                </div>      
                    
        </form>
    );
}