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

import styles from '../estilos/CardConta.module.css'

export default function CardConta({icone, proprietario, nome, saldo}) {
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

    nome = nome.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase())

    return (
        <div className={styles.CardConta}>
            <img src={iconeSrc} alt="Icone" className={styles.icone} />
            <div className={styles.divTexto}>
                <span>{nome}</span>
                <span>{proprietario}</span>
                <span>{saldo}</span>
            </div>
        </div>
    )
}