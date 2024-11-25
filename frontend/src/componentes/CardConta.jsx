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
import inter from '../assets/inter.png'
import stone from '../assets/stone.png'
import wise from '../assets/wise.png'

import { useNavigate } from 'react-router-dom';

import styles from '../estilos/CardConta.module.css'
import { useEffect } from 'react';

export default function CardConta({id, icone, proprietario, nome, saldo}) {
    
    // Mapeamento de nome de ícone para imagem importada
    // useEffect(() => {
    //     console.log(nome)
    //     console.log(nome)
    // })
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
    const iconeSrc = iconeMap[icone] || lapis; 

    let newNome = nome.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase())
    let newSaldo = saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/editar-conta/${id}`)
    }

    return (
        <div className={styles.CardConta} onClick={handleClick}>
            <img src={iconeSrc} alt="Icone" className={styles.icone}/>
            <div className={styles.divTexto}>
                <span>{newNome}</span>
                <span>{proprietario}</span>
                <span>{newSaldo}</span>
            </div>
        </div>
    )
}