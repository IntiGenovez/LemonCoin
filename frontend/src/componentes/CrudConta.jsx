import { useState, useContext } from "react"
import { DadosContexto } from "../store"
import { accountsActions } from "../store/action"

import lapis from '../assets/lapis.png';
import nubank from '../assets/nubank.png';
import bancoDoBrasil from '../assets/Banco-do-Brasil.png';
import bradesco from '../assets/Bradesco.png';
import caixa from '../assets/Caixa.png';
import itau from '../assets/Itau.png';
import santander from '../assets/Santander.png';
import picpay from '../assets/PicPay.png';
import sicredi from '../assets/Sicredi.png';
import mercadoPago from '../assets/Mercado-Pago.png'

import InputNomeConta from "./InputNomeConta"
import BotaoAcao from "./BotaoAcao"

import styles from '../estilos/CrudConta.module.css'


export default function CrudConta({ tipo }){
    const contexto = useContext(DadosContexto)

    const [conta, setConta] = useState('');
    const [saldo, setSaldo] = useState('');
    const [icone, setIcone] = useState('');
    const [proprietario, setProprietario] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSaldoChange = (event) =>{
        setSaldo(event.target.value);
        
    };

    const mascara=() =>{ 
        setSaldo(valor => valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
        console.log(saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
    }

    const handleIconeChange = (event) => setIcone(event.target.value);
    const handleContaChange = (event) => setConta(event.target.value);
    const handleProprietarioChange = (event) => setProprietario(event.target.value);
    const handleDescricaoChange = (event) => setDescricao(event.target.value);

    const handleConfirm = (event) => {
        event.preventDefault();

        const dadosConta = {
            conta,
            tipo,
            saldo,
            icone,
            proprietario,
            descricao
        }
        if (tipo === 'Adicionar') {
            accountsActions.adicionarConta(contexto.dispatch, {
                nome: dadosConta.descricao,
                saldo: dadosConta.saldo
            })
        }
    }

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
    };

    // Obtém a imagem correspondente ao nome da variavel icone, ou ícone lápis padrão se não for encontrado
    const iconeSrc = iconeMap[icone] || lapis; 

    let fotoConta
    
    if (tipo === "Adicionar") {
        fotoConta = (
            <>
                <img src={iconeSrc} alt="imagem-conta adicionar" />
            </>
        );
    } else {
        fotoConta = (
            <>
                <img src={iconeSrc} alt="imagem-conta editar" />
            </>
        );
    }
    

    return(
        <form className={styles}>
            <h1>{tipo} Conta</h1>
            <div className={styles.formulario}>
                { fotoConta }
                <div className={styles.containerForm}>
                    <div className={styles.dados}>
                        <div className={styles.cabecalho}>
                            <InputNomeConta
                                 change={(event) => {handleContaChange(event); handleIconeChange(event);}} 
                            /> 
                            <input type="text" name="saldo" id="saldo" placeholder="Saldo: R$" value={saldo} onChange={handleSaldoChange} onBlur={mascara} />
                        </div>
                        <hr />
                        <input type="text" name="proprietario" id="proprietario" placeholder="Nome Proprietario: " value={proprietario} onChange={handleProprietarioChange} />

                        <input type="text" name="descricao" id="descricao" placeholder="Descrição: " value={descricao} onChange={handleDescricaoChange} />
                    </div>

                    <div className={styles.containerBotoes}>
                        {
                            tipo  == "Adicionar" ?
                                (
                                    <>
                                        <BotaoAcao onClick={ () => history.back() }>Cancelar</BotaoAcao>
                                        <BotaoAcao onClick={ handleConfirm }>Confirmar</BotaoAcao>
                                        
                                    </>
                                )
                                :
                                (
                                    <>
                                        <BotaoAcao>Relatório de conta</BotaoAcao>
                                        <BotaoAcao>Excluir conta</BotaoAcao>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </form>
    )
}