import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DadosContexto } from "../store"
import { accountsActions } from "../store/action"
import Mensagem from "./mensagem"

import lapis from '../assets/lapis.png'
import nubank from '../assets/nubank.png'
import bancoDoBrasil from '../assets/Banco-do-Brasil.png'
import bradesco from '../assets/Bradesco.png'
import caixa from '../assets/Caixa.png'
import itau from '../assets/Itau.png'
import santander from '../assets/Santander.png'
import picpay from '../assets/PicPay.png'
import sicredi from '../assets/Sicredi.png'
import mercadoPago from '../assets/Mercado-Pago.png'

import InputNomeConta from "./InputNomeConta"
import BotaoAcao from "./BotaoAcao"

import styles from '../estilos/CrudConta.module.css'


export default function CrudConta({ tipo }){
    const contexto = useContext(DadosContexto)
    const { id } = useParams() //id para quando for tela de editar

    const [conta, setConta] = useState({
        nome: '',
        saldo: 0,
        icone: null,
        proprietario: '',
        descricao: ''
    })
    const [openDialog, setOpenDialog] = useState(false)

    const handleSaldoChange = (event) =>{
        setConta(prev => ({ ...prev, saldo: event.target.value }))
        
    }

    const mascara = () =>{ 
        let saldoMascara = conta.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        setConta(prev => ({ ...prev, saldo: saldoMascara}))
        console.log(conta.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
    }

    const handleIconeChange = (event) => setConta(prev => ({ ...prev, icone: event.target.value }))
    const handleContaChange = (event) => setConta(prev => ({ ...prev, nome: event.target.value }))
    const handleProprietarioChange = (event) => setConta(prev => ({ ...prev, proprietario: event.target.value }))
    const handleDescricaoChange = (event) => setConta(prev => ({ ...prev, descricao: event.target.value }))

   

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
        'mercado_pago': mercadoPago
    }

    // Obtém a imagem correspondente ao nome da variavel icone, ou ícone lápis padrão se não for encontrado
    const iconeSrc = iconeMap[conta.icone] || lapis 

    //puxa dados do id caso seja tela de editar
    useEffect(() => {
        if (tipo === "Editar" && id) {
            const contaParaEditar = contexto.state.contas.find(conta => conta.id === Number(id))
            console.log(contaParaEditar)
            if (contaParaEditar) {
                setConta(contaParaEditar)
            }
        }
    }, [id, tipo, contexto.state.contas])

    // Função para abrir o popUp
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    // Função para fechar o popUp
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleConfirm = (event) => { //quando o botão de confirmar é precionado
        event.preventDefault()

        if (tipo === 'Adicionar') {
            try{
                accountsActions.adicionarConta(contexto.dispatch, conta)
                handleOpenDialog()
            } catch(e) {
                return 0
            }
        } 
        else if(tipo === "Editar"){
            console.log(tipo)                        
            console.log(conta)                        
            console.log(saldo)                        
            console.log(proprietario)                        
            console.log(id)                                    
            console.log(contexto.state.contas)                                    
        }

    }    

    return(
        <form className={styles}>
            <h1>{tipo} Conta</h1>
            <div className={styles.formulario}>
                <img src={iconeSrc} alt="imagem da conta" style={{width: "200px", height:"200px"}}/>
                <div className={styles.containerForm}>
                    <div className={styles.dados}>
                        <div className={styles.cabecalho}>
                            <InputNomeConta value={tipo === "Editar" ? {conta} : ""}
                                change={(event) => {
                                    handleContaChange(event)
                                    handleIconeChange(event)
                                }} 
                            /> 
                            <input type="text" name="saldo" id="saldo" placeholder="Saldo: R$" value={conta.saldo} onChange={handleSaldoChange} onBlur={mascara} />
                        </div>
                        <hr />
                        <input type="text" name="proprietario" id="proprietario" placeholder="Nome Proprietario: " value={conta.proprietario} onChange={handleProprietarioChange} />

                        <input type="text" name="descricao" id="descricao" placeholder="Descrição: " value={conta.descricao} onChange={handleDescricaoChange} />
                    </div>

                    <div className={styles.containerBotoes}>
                        {
                            tipo  == "Adicionar" ?
                                (
                                    <>
                                        <BotaoAcao onClick={ () => history.back() }>Cancelar</BotaoAcao>
                                        <BotaoAcao onClick={ handleConfirm }>Confirmar</BotaoAcao>
                                        <Mensagem
                                            open={openDialog}
                                            onClose={handleCloseDialog}
                                            textoBotao="Fechar"
                                            link="/contas"
                                            tipo="success"
                                            titulo="Conta adicionada!!!!"
                                            mensagem="Você adicionou uma nova conta"
                                        />
                                    </>
                                )
                                :
                                (
                                    <>
                                        <BotaoAcao>Relatório de conta</BotaoAcao>
                                        <BotaoAcao>Excluir conta</BotaoAcao>
                                        <BotaoAcao onClick={handleConfirm}>Editar conta</BotaoAcao>
                                        <Mensagem
                                            open={openDialog}
                                            onClose={handleCloseDialog}
                                            textoBotao="Fechar"
                                            link="/contas"
                                            tipo="success"
                                            titulo="Conta editada!!!!"
                                            mensagem={`Você editou a conta de ${conta.proprietario}`}
                                        />
                                        <Mensagem
                                            open={openDialog}
                                            onClose={handleCloseDialog}
                                            textoBotao="Fechar"
                                            link="/contas"
                                            tipo="info"
                                            titulo="Conta deletada!!!!"
                                            mensagem={`Você deletou a conta de ${conta.proprietario}`}
                                        />
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </form>
    )
}