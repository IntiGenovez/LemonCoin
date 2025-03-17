import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DadosContexto } from "../store"
import { accountsActions } from "../store/action"
import Mensagem from "./Mensagem"

import lapis from "../assets/lapis.png"
import nubank from "../assets/nubank.png"
import bancoDoBrasil from "../assets/Banco-do-Brasil.png"
import bradesco from "../assets/Bradesco.png"
import caixa from "../assets/Caixa.png"
import itau from "../assets/Itau.png"
import santander from "../assets/Santander.png"
import picpay from "../assets/PicPay.png"
import sicredi from "../assets/Sicredi.png"
import mercadoPago from "../assets/Mercado-Pago.png"
import inter from '../assets/inter.png'
import stone from '../assets/stone.png'
import wise from '../assets/wise.png'

import InputNomeConta from "./InputNomeConta"
import BotaoAcao from "./BotaoAcao"

import styles from "../estilos/CrudConta.module.css"
import { useMediaQuery } from "@mui/material"


export default function CrudConta({ tipo }){
    const contexto = useContext(DadosContexto)
    const { id } = useParams() //puxa id para quando for tela de editar
    const navigate = useNavigate()
    
    const [conta, setConta] = useState({
        nome: '',
        saldo: '',
        icone: null,
        proprietario: '',
        descricao: ''
    })

    const formatarSaldo = saldo => {
        if (typeof saldo === 'number') {
            saldo = saldo.toString()
            let centavos = saldo.split('.')[1]
            if (!centavos) 
                saldo = saldo + ',00'
            if (centavos?.length === 1)
                saldo = saldo + '0'
        }

        // Remove tudo o que não for dígito
        saldo = saldo.replace(/\D/g, '');

        // Se o saldo estiver vazio ou não tiver centavos, adiciona "00" como default
        if (saldo.length <= 2) {
            saldo = '00' + saldo
        }

        let reais = saldo.slice(0, -2)
        let centavos = saldo.slice(-2)

        if (centavos.length === 1) {
            centavos = '0' + centavos;
        }

        // Se o saldo de reais for menor que 100, remove os zeros à esquerda
        reais = reais.replace(/^0+/, '') || '0'; // Remove os zeros à esquerda ou garante que tenha pelo menos 1 dígito
    
        let saldoFormatado = `R$ ${reais},${centavos}`;
        return saldoFormatado

    }

    useEffect(() => {
        if (tipo === 'Atualizar' && id) {
            const contaParaAtualizar = contexto.state.contas.find(conta => conta.id === +id)
            if (contaParaAtualizar) {
                contaParaAtualizar.saldo = formatarSaldo(contaParaAtualizar.saldo)
                setConta(contaParaAtualizar)
            }
        }
    }, [contexto.state.contas])

    const handleSaldoChange = e => {
        let valor = e.target.value;
    
        setConta(prev => ({ ...prev, saldo: formatarSaldo(valor) }));
    }

    const handleIconeChange = e => setConta(prev => ({ ...prev, icone: e.target.value }))
    const handleContaChange = e => setConta(prev => ({ ...prev, nome: e.target.value }))
    const handleDescricaoChange = e => setConta(prev => ({ ...prev, descricao: e.target.value }))

   

    // Mapeamento de nome de ícone para imagem importada
    const iconeMap = {
        lapis: lapis,
        nubank: nubank,
        'banco_do_brasil': bancoDoBrasil,
        bradesco: bradesco,
        caixa: caixa,
        itau: itau,
        santander: santander,
        picpay: picpay,
        sicredi: sicredi,
        'mercado_pago': mercadoPago,
        inter: inter,
        stone: stone,
        wise: wise
    };

    // Obtém a imagem correspondente ao nome da variavel icone, ou ícone lápis padrão se não for encontrado
    const iconeSrc = iconeMap[conta.icone] || lapis 

    const handleConfirmar = (e) => { //quando o botão de confirmar é precionado
        e.preventDefault()

        let newSaldo = conta.saldo.replace('R$ ', '').replace(',', '.')
        newSaldo = +newSaldo
        
        const novaConta = { ...conta, saldo: newSaldo }
        delete novaConta['usuario_nome']

        if (tipo === 'Adicionar') 
            accountsActions.adicionarConta(contexto.dispatch, novaConta)
        else if(tipo === 'Atualizar'){
            delete conta['usuario_nome']
            accountsActions.atualizarConta(contexto.dispatch, novaConta)
        }                            
    }    

    const handleExcluir = e => {
        e.preventDefault()
        accountsActions.deletarConta(contexto.dispatch, conta)
    } 

    return(
        <form className={styles}>
            <h1>{tipo} Conta</h1>
            <div className={styles.formulario}>
                <img src={iconeSrc} alt='imagem da conta' style={{width: '200px', height:'200px'}}/>
                <div className={styles.containerForm}>
                    <div className={styles.dados}>
                        <div className={styles.cabecalho}>
                            <InputNomeConta valor={tipo === 'Atualizar' ? conta : ''}
                                change={e => {
                                    handleContaChange(e)
                                    handleIconeChange(e)
                                }} 
                            /> 
                            <input className={styles.saldo} type='text' name='saldo' id='saldo' placeholder='Saldo: R$' value={conta.saldo} onChange={handleSaldoChange} />
                        </div>
                        <hr />
                        <input type='text' name='descricao' id='descricao' placeholder='Descrição: ' value={conta.descricao} onChange={handleDescricaoChange} />
                    </div>

                    <div className={styles.containerBotoes}>
                        {
                            tipo  == 'Adicionar' ?
                                (
                                    <>
                                        <BotaoAcao onClick={ () => navigate('/contas') }>Cancelar</BotaoAcao>
                                        <BotaoAcao onClick={ handleConfirmar }>Confirmar</BotaoAcao>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <BotaoAcao onClick={ () => navigate('/relatorios') }>Relatório de conta</BotaoAcao>
                                        <BotaoAcao onClick={ handleExcluir }>Excluir conta</BotaoAcao>
                                        <BotaoAcao onClick={ handleConfirmar }>Editar conta</BotaoAcao>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </form>
    )
}