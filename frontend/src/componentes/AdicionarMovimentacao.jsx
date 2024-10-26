import InputAno from "./InputAno";
import InputMes from "./InputMes";
import InputDia from "./InputDia";
import InputRecorrencia from "./InputRecorrencia";
import { useState, useContext } from "react";

import { DadosContexto } from "../store"

import styles from '../estilos/AdicionarMovimentacao.module.css';

export default function AdicionarMovimentacao({ tipo }){
    const contexto = useContext(DadosContexto)

    const [ despesa, setDespesa ] = useState({
        nome: '',
        valor: '',
        categoria: '',
        conta: ''
    })

    return(
        <form className={styles}>
                <div className={styles.formulario}>
                    <h1>Adicionar {tipo}</h1>

                    <input 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        placeholder="Nome: " 
                        value={despesa.nome} 
                        onChange={e => setDespesa(d => { return { ...d, nome: e.target.value } })} 
                    />

                    <div>
                         <input 
                            type="text" 
                            name="valor" 
                            id="valor" 
                            placeholder="Valor: R$" 
                            value={despesa.valor} 
                            onChange={e => setDespesa(d => { return { ...d, valor: e.target.value } })} 
                        />

                        <input 
                            type="text" 
                            name="categoria" 
                            id="categoria" 
                            placeholder="Categoria: " 
                            value={despesa.categoria} 
                            onChange={e => setDespesa(d => { return { ...d, categoria: e.target.value } })} 
                        />

                    </div>
                    <div>
                        <InputRecorrencia />
                        <input 
                            type="text" 
                            name="conta" 
                            id="conta" 
                            placeholder="Conta: " 
                            value={despesa.conta} 
                            onChange={e => setDespesa(d => { return { ...d, conta: e.target.value } })} 
                        />
                    </div>
                    <div className={styles.divData}>
                        <span>Data: </span>
                        <InputDia />
                        <InputMes />
                        <InputAno />
                    </div>
                    <div className={styles.Botoes}>
                    <button>Cancelar</button>
                    <button onClick={
                        e => {
                            e.preventDefault()
                            contexto.dispatch({ type: 'adicionarDespesa', payload: { despesa } })
                        }
                    }>Confirmar</button>
                    </div>
                </div>      
                    
        </form>
    );
}