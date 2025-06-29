import { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DadosContexto } from '../store'
import { accountsActions, movementsActions } from '../store/actionFirebase'
import { formatarValor, desformatarValor } from '../store/utils'
import iconeMap from '../store/utils/iconeMap'
import iconeMapPersonalizar from '../store/utils/iconeMapPersonalizar'

import lapis from '../assets/lapis.png'

import BancoSeletor from './BancoSeletor.jsx'
import BancoSeletorPersonalizar from './BancoSeletorPersonalizar.jsx'
import NomeBanco from './NomeBanco.jsx'
import BotaoAcao from './BotaoAcao'

import styles from '../estilos/CrudConta.module.css'


export default function CrudConta({ tipo }) {
    const contexto = useContext(DadosContexto)
    const { id } = useParams() //puxa id para quando for tela de editar
    const navigate = useNavigate()

    const [conta, setConta] = useState({
        nome: '',
        saldo: '',
        descricao: ''
    })
    const [open, setOpen] = useState(false)
    const [openPersonalizar, setOpenPersonalizar] = useState(false)
    const [personalizada, setPersonalizada] = useState(false)
    const [contaMemento, setContaMemento] = useState()

    // Obtém a imagem correspondente ao nome da variavel icone, ou ícone lápis padrão se não for encontrado
    const iconeSrc = personalizada ? iconeMapPersonalizar[conta.imgId] : iconeMap[conta.nome] || lapis

    useEffect(() => {
        if (tipo === 'Atualizar' && id) {
            const contaParaAtualizar = contexto.state.contas.find(conta => conta.id === id)
            if (contaParaAtualizar) {
                if (contaParaAtualizar.imgId) setPersonalizada(true)
                contaParaAtualizar.saldo = formatarValor(contaParaAtualizar.saldo)
                setConta(contaParaAtualizar)
                setContaMemento(contaParaAtualizar)
            } else navigate('/adicionar-conta')
        } else navigate('/adicionar-conta')
    }, [contexto.state.contas])

    const handleConfirmar = async (e) => { //quando o botão de confirmar é precionado
        e.preventDefault()
        let sucesso

        const novaConta = { ...conta, saldo: desformatarValor(conta.saldo) }

        if (tipo === 'Adicionar') {
            sucesso = await accountsActions.adicionarConta(contexto.dispatch, novaConta)
        }
        else if (tipo === 'Atualizar') {
            const transacao = novaConta.saldo - desformatarValor(contaMemento.saldo)
            const criarMovimentacao =  contexto.state.usuario.criarMovimentacao === undefined || contexto.state.usuario.criarMovimentacao
            if(!isNaN(transacao) && transacao > 0 && criarMovimentacao) {
                await movementsActions.adicionarMovimentacao(contexto.dispatch, {
                    categoria: 'Atualização de Conta',
                    categoriaId: 0,
                    conta: novaConta.nome,
                    contaId: novaConta.id,
                    data: new Date(),
                    nome: 'Adição de Valor',
                    tipo: 'Receita',
                    valor: transacao
                })
            }
            if(!isNaN(transacao) && transacao < 0 && criarMovimentacao) {
                await movementsActions.adicionarMovimentacao(contexto.dispatch, {
                    categoria: 'Atualização de Conta',
                    categoriaId: 0,
                    conta: novaConta.nome,
                    contaId: novaConta.id,
                    data: new Date(),
                    nome: 'Remoção de Valor',
                    tipo: 'Despesa',
                    valor: -transacao
                })
            }
            sucesso = await accountsActions.atualizarConta(contexto.dispatch, novaConta)
        }
        if (sucesso) navigate('/contas')
    }

    const handleExcluir = async e => {
        e.preventDefault()
        const sucesso = accountsActions.deletarConta(contexto.dispatch, conta)
        if (sucesso) navigate('/contas')
    }

    const selecionarBanco = () => {
        setOpen(prev => !prev)
    }

    const abrirPersonalizar = () => {
        setOpenPersonalizar(prev => !prev)
    }

    return (
        <form className={styles}>
            <h1>{tipo} Conta</h1>
            <div className={styles.formulario}>
                <img
                    src={iconeSrc}
                    alt={iconeSrc}
                    style={{ width: '200px', height: '200px' }}
                    onClick={ selecionarBanco }
                />

                <div className={styles.containerForm}>
                    <div className={styles.dados}>
                        <div className={styles.cabecalho}>
                            <NomeBanco 
                                personalizada={ personalizada }
                                valor={conta.nome}
                                onClick={ !personalizada ? selecionarBanco : null }
                                onChange={e => setConta(prev => ({ ...prev, nome: e.target.value }))} 
                            />
                            <input
                                className={styles.saldo}
                                type='text'
                                name='saldo'
                                id='saldo'
                                placeholder='Saldo: R$'
                                value={conta.saldo}
                                onChange={e => {
                                    setConta(prev => ({ ...prev, saldo: formatarValor(e.target.value) }))
                                }}
                            />
                        </div>
                        <hr />
                        <input
                            type='text'
                            name='descricao'
                            id='descricao'
                            placeholder='Descrição: '
                            value={conta.descricao}
                            onChange={e => setConta(prev => ({ ...prev, descricao: e.target.value }))} 
                        />
                    </div>

                    <div className={styles.containerBotoes}>
                        {
                            tipo == 'Adicionar' ?
                                (
                                    <>
                                        <BotaoAcao onClick={() => navigate('/contas')}>Cancelar</BotaoAcao>
                                        <BotaoAcao onClick={handleConfirmar}>Confirmar</BotaoAcao>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <BotaoAcao onClick={() => navigate('/relatorios')}>Relatório de conta</BotaoAcao>
                                        <BotaoAcao onClick={handleExcluir}>Excluir conta</BotaoAcao>
                                        <BotaoAcao onClick={handleConfirmar}>Editar conta</BotaoAcao>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
            <BancoSeletor 
                open={ open }
                selecionarBanco={ nome => {
                    const contaSemImgId = {}
                    for (let [chave, valor] of Object.entries(conta)) {
                        if (chave === 'nome') {
                            contaSemImgId[chave] = nome
                            continue
                        }
                        if (chave !== 'imgId') 
                            contaSemImgId[chave] = valor
                    }
                    setConta(contaSemImgId) 
                }}
                closeBancoSeletor={ () => setOpen(prev => !prev) }
                contaSelecionada={ conta.nome }
                abrirPersonalizar={ abrirPersonalizar }
                setPersonalizada={ setPersonalizada }
            />
            <BancoSeletorPersonalizar
                open={ openPersonalizar }
                selecionarBanco={ imgId => setConta(prev => ({ ...prev, imgId: +imgId  })) }
                closeBancoSeletor={ () => setOpenPersonalizar(prev => !prev) }
                setPersonalizada={ setPersonalizada }
            />
        </form>
    )
}