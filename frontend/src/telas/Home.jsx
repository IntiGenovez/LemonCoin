import RelatorioCategoria from '../componentes/RelatorioCategoria'
import CardContaText from '../componentes/CardContaText'
import TextGasto from '../componentes/TextGasto'
import BotaoNavegar from '../componentes/BotaoNavegar'

import styles from '../estilos/Home.module.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DadosContexto } from '../store'

export default function Home(){
    
    const contexto = useContext(DadosContexto)
    const navigate = useNavigate()

    const handleClickConta = () => {
        if(contexto.state.contas.length > 0) {
            navigate('/contas')
            return
        }
        navigate('/adicionar-conta')
    }

    return (
        <div className={styles.container}>
            <div className={styles.divGrafico}>
                <div className={styles.grafico}>
                    <RelatorioCategoria home={ true }/>
                </div>

            </div>

            <div className={styles.divDados}>
                <div className={styles.containerContas}>
                    { contexto.state.contas
                        .sort((a, b) => parseFloat(b.saldo) - parseFloat(a.saldo)) //ordena pelos maiores saldos
                        .slice(0, 4) 
                        .map(conta => {
                            return (
                                <CardContaText 
                                    key={conta.id} 
                                    conta={conta}                           
                                />
                            );
                        })
                    }
                    <button onClick={ handleClickConta }>{ contexto.state.contas.length > 0 ? 'Ver mais...' : 'Adicionar conta' }</button>
                </div>

                <div className={styles.containerGastos}>

                    <div className={styles.containerHistorico}>
                        <h3>HISTÓRICO DE MOVIMENTAÇÕES</h3>

                        <div style={{display: 'flex', gap: '3px', flexDirection: 'column'}}>
                            { contexto.state.movimentacoes.length > 0 ?
                                contexto.state.movimentacoes
                                    .slice(0, 10) 
                                    .map(movimentacao => {
                                        return (
                                            <TextGasto 
                                                key={movimentacao.id}
                                                nome={movimentacao.nome} 
                                                valor={movimentacao.valor} 
                                                tipo={movimentacao.tipo}                         
                                            />
                                        );
                                    })
                            :
                                    'Suas movimentações aparecerão aqui'
                            }
                        </div>
                    </div> 

                    <div className={styles.containerBotoes}>
                        <BotaoNavegar link='/adicionar-receita'>Adicionar Receita</BotaoNavegar>
                        <BotaoNavegar link='/adicionar-despesa'>Adicionar Despesa</BotaoNavegar>                        
                    </div>
                </div>
            </div>
        </div>
    )
}