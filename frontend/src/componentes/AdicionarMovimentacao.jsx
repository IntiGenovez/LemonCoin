import InputDia from "./InputDia";
import InputRecorrencia from "./InputRecorrencia";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

import { DadosContexto } from "../store"
import { movementsActions } from "../store/actionFirebase";

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

    const [ categoriaSelecionada, setCategoriaSelecionada ] = useState({ 
        nome: '',
        id: '',
    })

    const formatarValor = valor => {
        valor = valor === 0 ? '' : valor

        // Remove tudo o que não for dígito
        valor = valor.replace(/\D/g, '');

        // Se o valor estiver vazio ou não tiver centavos, adiciona "00" como default
        if (valor.length <= 2) {
            valor = '00' + valor
        }

        let reais = valor.slice(0, -2)
        let centavos = valor.slice(-2)

        if (centavos.length === 1) {
            centavos = '0' + centavos;
        }

        // Se o valor de reais for menor que 100, remove os zeros à esquerda
        reais = reais.replace(/^0+/, '') || '0'; // Remove os zeros à esquerda ou garante que tenha pelo menos 1 dígito
    
        let valorFormatado = `R$ ${reais},${centavos}`;
        return valorFormatado

    }

    useEffect(() => {
        let dataAtual = new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }).toString()
        let dia = dataAtual.split('/')[1]
        let mes = dataAtual.split('/')[0]
        let ano = dataAtual.split(',')[0].split('/')[2]
        if (dia.length === 1) dia = '0' + dia
        if (mes.length === 1) mes = '0' + mes
        dataAtual = `${ano}-${mes}-${dia}`

        setMovimentacao(prev => ({ ...prev, data: dataAtual }))
    }, [])

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

    const handleInputData = e => {
        console.log(e)
        setMovimentacao(prev => ({ ...prev, data: e }))
    }

    const handleInputValor = e => {
        setMovimentacao(prev => ({ ...prev, valor: formatarValor(e.target.value) }))
    }

    return(
        <form className={styles}>
                <div className={styles.formulario}>
                    <h1>Adicionar {tipo}</h1>

                    <input className={styles.inputNome}
                        type="text" 
                        name="nome" 
                        id="nome" 
                        placeholder="Nome: " 
                        value={movimentacao.nome} 
                        onChange={e => setMovimentacao(prev => ({ ...prev, nome: e.target.value }))}
                    />

                    <div className={styles.containerValor}>
                         <input 
                            type="text" 
                            name="valor" 
                            id="valor" 
                            placeholder="Valor: R$" 
                            value={movimentacao.valor} 
                            onChange={e => handleInputValor(e)}
                        />
                        <select value={ categoriaSelecionada.nome } onChange={ handleChangeCategoria }>
                            <option value={null}>Categoria</option>
                            { contexto.state.categorias.map((categoria, i) => (<option key={i} id={categoria.id}>{categoria.nome}</option>)) }
                        </select>

                    </div>
                    <div className={styles.divContaRecorrencia}>
                        <InputRecorrencia />
                        <select value={ contaSelecionada.nome } onChange={ handleChangeConta }>
                            <option value={null}>Conta</option>
                            { contexto.state.contas.map((conta, i) => (
                                <option key={i} id={conta.id}>
                                    {conta.nome.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase())}: {conta.proprietario} {/*nome conta sem underline*/}
                                </option>)) }
                        </select>
                    </div>
                    <div className={styles.divData}>
                        <span>Data: </span>
                        <InputDia valor={ movimentacao.data } onChange={ e => handleInputData(e) } />
                    </div>
                    <div className={styles.Botoes}>
                    <button>
                        <Link to={`/${tipo}s`} style={{color: "white"}}>Cancelar</Link>
                    </button>
                    <button onClick={
                        e => {
                            e.preventDefault()
                            let valor
                            movimentacao.categoria = categoriaSelecionada.nome
                            movimentacao.categoriaId = categoriaSelecionada.id
                            movimentacao.conta = contaSelecionada.nome
                            movimentacao.contaId = contaSelecionada.id

                            if (movimentacao.valor) {
                                valor = movimentacao.valor.replace('R$ ', '').replace(',', '.')
                                valor = valor
                            }

                            movimentacao.data = `${movimentacao.data} 00:00:00`
                            
                            movementsActions.adicionarMovimentacao(contexto.dispatch, { ...movimentacao, valor })
                        }
                    }>Confirmar</button>
                    </div>
                </div>      
                    
        </form>
    );
}