import InputDia from './InputDia'
import InputRecorrencia from './InputRecorrencia'
import { useState, useContext, useEffect } from 'react'

import { DadosContexto } from '../store'
import { movementsActions } from '../store/actionFirebase'
import formatarMoeda from '../store/utils/formatCurrency'

import styles from '../estilos/AdicionarMovimentacao.module.css'
import BotaoNavegar from './BotaoNavegar'
import BotaoAcao from './BotaoAcao'

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

    //Define a data do input['date'] para a data de hoje
    useEffect(() => {
        let dataAtual = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).toString()
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

    const handleChangeConta = e => {
        setContaSelecionada({
            nome: e.target.value,
            id: e.target[e.target.selectedIndex].id
        })
    }

    const handleConfirmar = e => {
        e.preventDefault()
        const novaMovimentacao = { 
            ...movimentacao,
            categoria: categoriaSelecionada.nome,
            categoriaId: categoriaSelecionada.id,
            conta: contaSelecionada.nome,
            contaId: contaSelecionada.id,
            data: `${movimentacao.data} 00:00:00`
        }

        if (novaMovimentacao.valor) {
            novaMovimentacao.valor = novaMovimentacao.valor.replace('R$ ', '').replace(',', '.')
            novaMovimentacao.valor = +novaMovimentacao.valor
        }
        
        movementsActions.adicionarMovimentacao(contexto.dispatch, novaMovimentacao)
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
                            onChange={e => setMovimentacao(prev => ({ ...prev, valor: formatarMoeda(e.target.value) }))}
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