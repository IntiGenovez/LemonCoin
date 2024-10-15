import AdicionarConta from "../telas/AdicionarConta"
import { useState } from "react"
import lapis from '../assets/lapis.png'
import InputNomeConta from "./InputNomeConta"
import BotaoAcao from "./BotaoAcao"

import styles from '../estilos/CrudConta.module.css'


export default function CrudConta({ tipo }){

    const [saldo, setSaldo] = useState('');
    const [proprietario, setProprietario] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSaldoChange = (event) => setSaldo(event.target.value);
    const handleProprietarioChange = (event) => setProprietario(event.target.value);
    const handleDescricaoChange = (event) => setDescricao(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();

        const dadosConta = {
            tipo,
            saldo,
            proprietario,
            descricao
        };
        console.log(dadosConta);

    };

    return(
        <form className={styles} onSubmit={handleSubmit}>
            <h1>{tipo} Conta</h1>
            <div className={styles.formulario}>
                <img src={lapis} alt="imagem-conta" />
                <div className={styles.containerForm}>
                    <div className={styles.dados}>
                        <div className={styles.cabecalho}>
                            <InputNomeConta />
                            <input type="text" name="saldo" id="saldo" placeholder="Saldo: R$" value={saldo} onChange={handleSaldoChange} />
                        </div>
                        <hr />
                        <input type="text" name="proprietario" id="proprietario" placeholder="Nome Proprietario: " value={proprietario} onChange={handleProprietarioChange} />

                        <input type="text" name="descricao" id="descricao" placeholder="Descrição: " value={descricao} onChange={handleDescricaoChange} />
                    </div>

                    <div className={styles.containerBotoes}>
                        <BotaoAcao>Cancelar</BotaoAcao>
                        <BotaoAcao>Confirmar</BotaoAcao>
                    </div>
                </div>
            </div>
        </form>
    )
}