import { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DadosContexto } from '../store'
import { accountsActions } from '../store/actionFirebase'
import formatarValor from '../store/utils/formatCurrency'
import iconeMap from '../store/utils/iconeMap'
import { useRef } from "react";

import lapis from '../assets/lapis.png'

import InputNomeConta from './InputNomeConta'
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

    // Obtém a imagem correspondente ao nome da variavel icone, ou ícone lápis padrão se não for encontrado
    const iconeSrc = iconeMap[conta.nome] || lapis

    useEffect(() => {
        if (tipo === 'Atualizar' && id) {
            const contaParaAtualizar = contexto.state.contas.find(conta => conta.id === id)
            if (contaParaAtualizar) {
                contaParaAtualizar.saldo = formatarValor(contaParaAtualizar.saldo)
                setConta(contaParaAtualizar)
            }
        } else navigate('/adicionar-conta')
    }, [contexto.state.contas])

    const handleConfirmar = async (e) => { //quando o botão de confirmar é precionado
        e.preventDefault()
        let sucesso

        let NovoSaldo = conta.saldo.replace('R$ ', '').replace(',', '.')
        NovoSaldo = +NovoSaldo

        const novaConta = { ...conta, saldo: NovoSaldo }

        if (tipo === 'Adicionar')
            sucesso = await accountsActions.adicionarConta(contexto.dispatch, novaConta)
        else if (tipo === 'Atualizar') {
            sucesso = await accountsActions.atualizarConta(contexto.dispatch, novaConta)
        }
        if (sucesso) navigate('/contas')
    }

    const handleExcluir = async e => {
        e.preventDefault()
        const sucesso = accountsActions.deletarConta(contexto.dispatch, conta)
        if (sucesso) navigate('/contas')
    }

    const iconeKeys = Object.keys(iconeMap); // Obtém as chaves do iconeMap
    const iconeIndex = useRef(0); // busca o indice atual do icone

    const handleImageClick = () => {
        iconeIndex.current = (iconeIndex.current + 1) % iconeKeys.length; // Incrementa o índice e faz o loop, se o índice atual for maior que o tamanho do iconeKeys, reinicia para 0
        const novoNome = iconeKeys[iconeIndex.current]; // Obtém o próximo nome do ícone
        setConta(prev => ({ ...prev, nome: novoNome })); // Atualiza o nome da conta
    };

    return (
        <form className={styles}>
            <h1>{tipo} Conta</h1>
            <div className={styles.formulario}>
                <img
                    src={iconeSrc}
                    alt={iconeSrc}
                    style={{ width: '200px', height: '200px' }}
                    onClick={handleImageClick}
                />

                <div className={styles.containerForm}>
                    <div className={styles.dados}>
                        <div className={styles.cabecalho}>
                            <InputNomeConta valor={conta.nome}
                                onChange={e =>
                                    setConta(prev =>
                                        ({ ...prev, nome: e.target.value })
                                    )
                                }
                            />
                            <input
                                className={styles.saldo}
                                type='text'
                                name='saldo'
                                id='saldo'
                                placeholder='Saldo: R$'
                                value={conta.saldo}
                                onChange={e => setConta(prev => ({ ...prev, saldo: formatarValor(e.target.value) }))} 
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
        </form>
    )
}