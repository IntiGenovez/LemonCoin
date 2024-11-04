import GraficoBarra from "../componentes/GraficoBarra"
import CardContaText from "../componentes/CardContaText"


import styles from "../estilos/Home.module.css"

export default function Home(){
    let despesa = "Steam"
    let valorDespesa = "R$ 100,00"
    return (
        <div className={styles.container}>
            <div className={styles.divGrafico}>
                <div className={styles.grafico}>
                    <GraficoBarra />
                </div>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit unde voluptatem provident ipsa voluptate iusto excepturi aut, distinctio qui quis nam ipsam velit animi alias nihil aspernatur inventore delectus molestias.</p>
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className={styles.containerContas}>
                    <CardContaText conta="Felipe" saldo="R$ 1.000,00" />
                    <CardContaText conta="Inti" saldo="R$ 1.000,00" />
                    <CardContaText conta="Hebert" saldo="R$ 2,00" />
                    <button>Ver mais...</button>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', gap: '30px'}}>
                    <div className={styles.containerGastos}>
                        <h3>HISTÓRICO DE GASTOS</h3>

                        <div className={styles.valores}>
                            {despesa} {valorDespesa}
                        </div>
                    </div>

                    <div className={styles.containerBotoes}>
                        <button>Adicionar Receita</button>
                        <button>Adicionar Despesa</button>                        
                    </div>
                </div>
            </div>
        </div>
    )
}