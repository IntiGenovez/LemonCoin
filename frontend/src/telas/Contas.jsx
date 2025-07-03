import { useContext } from 'react'
import { DadosContexto } from '../store'

import CardConta from '../componentes/CardConta'
import BotaoAdicionar from '../componentes/BotaoAdicionar'

import styles from '../estilos/Contas.module.css'

export default function Contas() {

    const contexto = useContext(DadosContexto)

    return (
        <div className={ styles.contas }>
            <div className={ styles.container }>
                {   contexto.state.contas.length > 0 ?
                        contexto.state.contas.map((conta, i) => {
                            return (
                                <CardConta 
                                    key={conta.id} 
                                    id={conta.id}
                                    nome={conta.nome} 
                                    imgId={conta.imgId} 
                                    saldo={conta.saldo}                             
                                />
                            )
                        })
                    :
                        <div className={ styles.semConta }>
                            <p>Adicione uma nova conta para monitorar seus gastos</p>
                        </div>
                }
                
            </div>
            <BotaoAdicionar path="/adicionar-conta" opacidadeBaixa />
        </div>
    )
}