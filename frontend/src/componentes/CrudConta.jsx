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

    useEffect(() => {
        if (tipo === 'Atualizar' && id) {
            const contaParaAtualizar = contexto.state.contas.find(conta => conta.id === +id)
            if (contaParaAtualizar) {
                setConta(contaParaAtualizar)
            }
        }
    }, [])

    useEffect(() => {
        setOpenDialog(false)
    }, [contexto.state.mensagemErro.openDialog])

    const [conta, setConta] = useState({
        nome: '',
        saldo: '',
        icone: null,
        proprietario: '',
        descricao: ''
    })

    
    const [openDialog, setOpenDialog] = useState(false)
    const [ dialogData, setDialogData ] = useState({
        mensagem: '',
        titulo: ''
    })

    const handleSaldoChange = e => {
        setConta(prev => ({ ...prev, saldo: e.target.value }))
    }

    const mascara = () =>{ 
        let saldoMascara = conta.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        setConta(prev => ({ ...prev, saldo: saldoMascara}))
    }

    const handleIconeChange = e => setConta(prev => ({ ...prev, icone: e.target.value }))
    const handleContaChange = e => setConta(prev => ({ ...prev, nome: e.target.value }))
    const handleProprietarioChange = e => setConta(prev => ({ ...prev, proprietario: e.target.value }))
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

 

    // Função para abrir o popUp
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    // Função para fechar o popUp
    const handleCloseDialog = () => {
        setOpenDialog(false)
        setDialogData({
            mensagem: '',
            titulo: ''
        })
    }

    const handleConfirmar = (e) => { //quando o botão de confirmar é precionado
        e.preventDefault()

        if (tipo === 'Adicionar') {
            try{
                setDialogData({ mensagem: `Você adicionou a conta: ${ conta.nome }`, titulo: 'Conta Adicionada!' })
                accountsActions.adicionarConta(contexto.dispatch, conta)
                handleOpenDialog()
            } catch {
                return 0
            }
        } 
        else if(tipo === 'Atualizar'){
            try{
                setDialogData({ mensagem: `Você atualizou a conta: ${ conta.nome }`, titulo: 'Conta atualizada' })
                delete conta['usuario_nome']
                accountsActions.atualizarConta(contexto.dispatch, conta)
                handleOpenDialog()
            } catch {
                return 0
            }                               
        }
    }    

    const handleExcluir = e => {
        e.preventDefault()
        try{
            setDialogData({ mensagem: `Você deletou a conta: ${ conta.nome }`, titulo: 'Conta excluída' })
            accountsActions.deletarConta(contexto.dispatch, conta)
            handleOpenDialog()
        } catch {
            return 0
        }  
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
                            <input className={styles.saldo} type='text' name='saldo' id='saldo' placeholder='Saldo: R$' value={conta.saldo} onChange={handleSaldoChange} onBlur={mascara} />
                        </div>
                        <hr />
                        <input type='text' name='proprietario' id='proprietario' placeholder='Nome Proprietario: ' value={conta.proprietario} onChange={handleProprietarioChange} />

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
            
            <Mensagem
                open={ openDialog }
                onClose={ handleCloseDialog }
                textoBotao='Fechar'
                link='/contas'
                tipo='success'
                titulo={ dialogData.titulo }
                mensagem={ dialogData.mensagem }
            />
        </form>
    )
}