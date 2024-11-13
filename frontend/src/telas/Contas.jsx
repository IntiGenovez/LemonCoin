import { useContext, useEffect } from 'react';
import { DadosContexto } from '../store';

import lapis from '../assets/lapis.png';
import nubank from '../assets/nubank.png';
import bancoDoBrasil from '../assets/Banco-do-Brasil.png';
import bradesco from '../assets/Bradesco.png';
import caixa from '../assets/Caixa.png';
import itau from '../assets/Itau.png';
import santander from '../assets/Santander.png';
import picpay from '../assets/PicPay.png';
import sicredi from '../assets/Sicredi.png';
import MercadoPago from '../assets/Mercado-Pago.png'

import CardConta from '../componentes/CardConta'
import BotaoAdicionar from '../componentes/BotaoAdicionar'

import styles from '../estilos/Contas.module.css'

export default function Contas() {
    const contexto = useContext(DadosContexto)

    return (
        <div className={styles.contas}>
            <div className={styles.container}>
                { contexto.state.contas.map(conta => {
                    return (<CardConta key={conta.id} icone={nubank} nome={conta.nome} saldo={conta.saldo} />)
                })}
                
            </div>
            <BotaoAdicionar path="/adicionar-conta" />
        </div>
    )
}