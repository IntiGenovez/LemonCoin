import InputAno from "./InputAno";
import InputMes from "./InputMes";
import InputDia from "./InputDia";
import InputRecorrencia from "./InputRecorrencia";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import { DadosContexto } from "../store"
import { movementsActions } from "../store/action";

import styles from "../estilos/AdicionarMovimentacao.module.css";

export default function AdicionarMovimentacao({ tipo }){
    const contexto = useContext(DadosContexto)
    const navigate = useNavigate()
    const [ movimentacao, setMovimentacao ] = useState({
        nome: '',
        valor: '',
        categoria: '',
        categoriaId: '',
        conta: '',
        contaId: '',
        data: '',
        tipo
    })
    const [ data, setData ] = useState({
        ano: '',
        mes: '',
        dia: ''
    })

    const [ categoriaSelecionada, setCategoriaSelecionada ] = useState({ 
        nome: '',
        id: '',
    })

    const handleChangeCategoria = e => {
        setCategoriaSelecionada({
            nome: e.target.value,
            id: e.target[e.target.selectedIndex].id
        })
    }
    
    const [ contaSelecionada, setContaSelecionada ] = useState({ 
        nome: '',
        id: '',
    })

    const handleChangeConta = e => {
        setContaSelecionada({
            nome: e.target.value,
            id: e.target[e.target.selectedIndex].id
        })
    }

    const handleInputData = (valor, campo) => {
        setData(prev => ({ ...prev, [campo]: valor }))
    }

    return(
        <form className={styles}>
                <div className={styles.formulario}>
                    <h1>Adicionar {tipo}</h1>

                    <input 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        placeholder="Nome: " 
                        value={movimentacao.nome} 
                        onChange={e => setMovimentacao(prev => ({ ...prev, nome: e.target.value }))}
                    />

                    <div>
                         <input 
                            type="text" 
                            name="valor" 
                            id="valor" 
                            placeholder="Valor: R$" 
                            value={movimentacao.valor} 
                            onChange={e => setMovimentacao(prev => ({ ...prev, valor: e.target.value }))}
                        />
                        <select value={ categoriaSelecionada.nome } onChange={ handleChangeCategoria }>
                            <option value={null}>Selecione uma opção</option>
                            { contexto.state.categorias.map((categoria, i) => (<option key={i} id={categoria.id}>{categoria.nome}</option>)) }
                        </select>

                    </div>
                    <div>
                        <InputRecorrencia />
                        <select value={ contaSelecionada.nome } onChange={ handleChangeConta }>
                            <option value={null}>Selecione uma opção</option>
                            { contexto.state.contas.map((conta, i) => (<option key={i} id={conta.id}>{conta.nome}</option>)) }
                        </select>
                    </div>
                    <div className={styles.divData}>
                        <span>Data: </span>
                        <InputDia valor={ data.dia } onChange={ e => handleInputData(e, 'dia') } />
                        <InputMes valor={ data.mes } onChange={ e => handleInputData(e, 'mes') } />
                        <InputAno valor={ data.ano } onChange={ e => handleInputData(e, 'ano') } />
                    </div>
                    <div className={styles.Botoes}>
                    <button>Cancelar</button>
                    <button onClick={
                        e => {
                            e.preventDefault()
                            movimentacao.categoria = categoriaSelecionada.nome
                            movimentacao.categoriaId = categoriaSelecionada.id
                            movimentacao.conta = contaSelecionada.nome
                            movimentacao.contaId = contaSelecionada.id

                            movimentacao.data = `${data.ano}-${data.mes}-${data.dia} 00:00:00`
                            console.log(movimentacao.data)

                            movementsActions.adicionarMovimentacao(contexto.dispatch, movimentacao)
                            navigate(`/${tipo.toLowerCase()}s`)
                        }
                    }>Confirmar</button>
                    </div>
                </div>      
                    
        </form>
    );
}