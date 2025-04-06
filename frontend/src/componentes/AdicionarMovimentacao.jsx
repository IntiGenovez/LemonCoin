import InputDia from './InputDia'
import { useState, useContext, useEffect } from 'react'

import { DadosContexto } from '../store'
import { movementsActions, errorMessageActions } from '../store/actionFirebase'
import { formatarValor, desformatarValor} from '../store/utils'

import styles from '../estilos/AdicionarMovimentacao.module.css'
import BotaoNavegar from './BotaoNavegar'
import BotaoAcao from './BotaoAcao'
import { useNavigate } from 'react-router-dom'
import formatDateToInputDate from '../store/utils/formatDateToInputDate'

export default function AdicionarMovimentacao({ tipo }){
    const contexto = useContext(DadosContexto)
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
        id: ''
    })

    const [ contaSelecionada, setContaSelecionada ] = useState({ 
        nome: '',
        id: ''
    })

    const navigate = useNavigate()

    //Define a data do input['date'] para a data de hoje
    useEffect(() => {
        const dataAtual = formatDateToInputDate(true)

        setMovimentacao(prev => ({ ...prev, data: dataAtual }))
    }, [])

    useEffect(() => {
        if(contexto.state.loading) return
        if(contexto.state.contas.length <= 0) {
            errorMessageActions.exibirMensagem(contexto.dispatch, {
                mensagem: "Adicione uma conta antes de seguir.", 
                titulo: 'Aviso', 
                tipo: 'warning', 
                link: '/contas'
            })
        }
        if(contexto.state.categorias.length <= 0) {
            errorMessageActions.exibirMensagem(contexto.dispatch, {
                mensagem: "Adicione uma categoria antes de seguir.", 
                titulo: 'Aviso', 
                tipo: 'warning', 
                link: '/categorias'
            })
        }
    }, [contexto.state.contas, contexto.state.categorias, contexto.state.loading])

    const handleChangeCategoria = e => {
        setCategoriaSelecionada({
            nome: e.target.value,
            id: e.target[e.target.selectedIndex].id
        })
    }

    const handleChangeConta = e => {
        setContaSelecionada({
            nome: e.target.value,
            id: e.target[e.target.selectedIndex].id
        })
    }

    const handleConfirmar = async e => {
        e.preventDefault()
        const novaMovimentacao = { 
            ...movimentacao,
            categoria: categoriaSelecionada.nome,
            categoriaId: categoriaSelecionada.id,
            conta: contaSelecionada.nome,
            contaId: contaSelecionada.id,
            data: `${movimentacao.data} 00:00:00`
        }

        if (novaMovimentacao.valor) 
            novaMovimentacao.valor = desformatarValor(novaMovimentacao.valor)
        
        const sucesso = await movementsActions.adicionarMovimentacao(contexto.dispatch, novaMovimentacao)
        if(sucesso) navigate(`/${tipo}s`)
    }

    return(
        <form className={styles}>
                <div className={styles.formulario}>
                    <h1>Adicionar {tipo}</h1>

                    <input className={styles.inputNome}
                        type='text' 
                        name='nome' 
                        id='nome' 
                        placeholder='Nome: ' 
                        value={movimentacao.nome} 
                        onChange={e => setMovimentacao(prev => ({ ...prev, nome: e.target.value }))}
                    />

                    <div className={styles.containerValor}>
                         <input 
                            type='text' 
                            name='valor' 
                            id='valor' 
                            placeholder='Valor: R$' 
                            value={movimentacao.valor} 
                            onChange={e => setMovimentacao(prev => ({ ...prev, valor: formatarValor(e.target.value) }))}
                        />
                        <select value={ categoriaSelecionada.nome } onChange={ handleChangeCategoria }>
                            <option value={null}>Categoria</option>
                            { contexto.state.categorias.map((categoria, i) => (<option key={i} id={categoria.id}>{categoria.nome}</option>)) }
                        </select>

                    </div>
                    <div className={styles.divContaRecorrencia}>
                        <select value={ contaSelecionada.nome } onChange={ handleChangeConta }>
                            <option value={null}>Conta</option>
                            { contexto.state.contas.map((conta, i) => (
                                <option key={i} id={conta.id}> {conta.nome} </option>)) }
                        </select>
                    </div>
                    <div className={styles.divData}>
                        <span>Data: </span>
                        <InputDia 
                            valor={ movimentacao.data } 
                            onChange={ e => setMovimentacao(prev => ({ ...prev, data: e })) } 
                        />
                    </div>
                    <div className={styles.Botoes}>
                        <BotaoNavegar link={`/${ tipo }s`}>Cancelar</BotaoNavegar>
                        <BotaoAcao onClick={ handleConfirmar }>Confirmar</BotaoAcao>
                    </div>
                </div>      
                    
        </form>
    )
}