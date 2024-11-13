import { useState, useContext } from "react"
import { DadosContexto } from "../store"
import { accountsActions } from "../store/action"

import lapis from '../assets/lapis.png'
import InputNomeConta from "./InputNomeConta"
import BotaoAcao from "./BotaoAcao"

import styles from '../estilos/CrudConta.module.css'


export default function CrudConta({ tipo }){
    const contexto = useContext(DadosContexto)

    const [saldo, setSaldo] = useState('');
    const [proprietario, setProprietario] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSaldoChange = (event) =>{
        setSaldo(event.target.value);
        
    };
    const mascara=() =>{ 
        setSaldo(valor => valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
        console.log(saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
    }
    const handleProprietarioChange = (event) => setProprietario(event.target.value);
    const handleDescricaoChange = (event) => setDescricao(event.target.value);

    const handleConfirm = (event) => {
        event.preventDefault();

        const dadosConta = {
            tipo,
            saldo,
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

    let fotoConta
    
    if (tipo === "Adicionar") {
        fotoConta = (
            <>
                <img src={lapis} alt="imagem-conta adicionar" />
            </>
        );
    } else {
        fotoConta = (
            <>
                <img src={lapis} alt="imagem-conta editar" />
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
                            <InputNomeConta />
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