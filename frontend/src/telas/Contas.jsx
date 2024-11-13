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
    return (
        <div className={styles.contas}>
            <div className={styles.container}>
                <CardConta icone={nubank} nome="Nubank Felipe" saldo="R$ 1.000,00" />
                <CardConta icone={itau} nome="Itaú Hebert" saldo="R$ 500,00" />
                <CardConta icone={sicredi} nome="Sicredi João" saldo="R$ -50,00" />
                <CardConta icone={bradesco} nome="Bradesco Clara" saldo="R$ 2.300,00" />
                <CardConta icone={caixa} nome="Caixa José" saldo="R$ 150,00" />
                <CardConta icone={bancoDoBrasil} nome="Banco do Brasil Laura" saldo="R$ 3.500,00" />
                <CardConta icone={santander} nome="Santander Paulo" saldo="R$ 750,00" />
                <CardConta icone={MercadoPago} nome="Mercado Pago André" saldo="R$ 400,00" />
                <CardConta icone={nubank} nome="XP Investimentos Marina" saldo="R$ 5.000,00" />
                <CardConta icone={picpay} nome="PicPay Tiago" saldo="R$ 1.800,00" /> 
            </div>
            <BotaoAdicionar path="/adicionar-conta" />
        </div>
    )
}