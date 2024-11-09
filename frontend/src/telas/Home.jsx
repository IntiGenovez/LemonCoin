import GraficoBarra from "../componentes/GraficoBarra"
import CardContaText from "../componentes/CardContaText"
import TextGasto from "../componentes/TextGasto"
import BotaoNavegar from "../componentes/BotaoNavegar"

import styles from "../estilos/Home.module.css"

export default function Home(){
    return (
        <div className={styles.container}>
            <div className={styles.divGrafico}>
                <div className={styles.grafico}>
                    <GraficoBarra />
                </div>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            <div className={styles.divDados}>
                <div className={styles.containerContas}>
                    <CardContaText conta="Felipe" saldo="R$ 10.000,00" />
                    <CardContaText conta="Inti" saldo="R$ 1.000,00" />
                    <CardContaText conta="Hebert" saldo="R$ 2,00" />
                    <button>Ver mais...</button>
                </div>

                <div className={styles.containerGastos}>

                    <div className={styles.containerHistorico}>
                        <h3>HISTÓRICO DE GASTOS</h3>

                        <div style={{display: 'flex', gap: '3px', flexDirection: 'column'}}>
                            <TextGasto despesa='Steam' valorDespesa='R$ 1.000,00' />
                            <TextGasto despesa='Xbox' valorDespesa='R$ 3.000,00' />
                            <TextGasto despesa='Tênis' valorDespesa='R$ 5.000,00' />
                            <TextGasto despesa='Comida do bebê' valorDespesa='R$ 200,00' />
                            <TextGasto despesa='Despesa mensal' valorDespesa='R$ 500,00' />
                            <TextGasto despesa='Curso da Udemy' valorDespesa='R$ 50,00' />
                            <TextGasto despesa='Agiota' valorDespesa='R$ 700,00' />
                            <TextGasto despesa='Curso do Marçal' valorDespesa='R$ 5.000,00' />
                        </div>
                    </div> 

                    <div className={styles.containerBotoes}>
                        <BotaoNavegar link="">Adicionar Receita</BotaoNavegar>
                        <BotaoNavegar link="">Adicionar Despesa</BotaoNavegar>                        
                    </div>
                </div>
            </div>
        </div>
    )
}