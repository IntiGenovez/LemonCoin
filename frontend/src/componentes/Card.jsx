import lapis from '../assets/lapis.png';
import nubank from '../assets/nubank.png';
import bancoDoBrasil from '../assets/Banco-do-Brasil.png';
import bradesco from '../assets/Bradesco.png';
import caixa from '../assets/Caixa.png';
import itau from '../assets/Itau.png';
import santander from '../assets/Santander.png';
import picpay from '../assets/PicPay.png';
import sicredi from '../assets/Sicredi.png';

import styles from '../estilos/card.module.css'

export default function Card() {
    const icone = (
        <>
            <img src={itau} alt="Icone" className={styles.icone} />
        </>
    );
    const nome = (
        <span>Padrão</span>
    )
    const saldo = (
        <span>R$1.000,00</span>
    )
    return (
        <div className={styles.card}>
            {icone}
            {nome}
            {saldo}
        </div>
    )
}