import { useContext, useEffect } from 'react';
import { DadosContexto } from '../store';
import { accountsActions } from '../store/action';

import CardConta from '../componentes/CardConta'
import BotaoAdicionar from '../componentes/BotaoAdicionar'

import styles from '../estilos/Contas.module.css'

export default function Contas() {

    const contexto = useContext(DadosContexto)

    return (
        <div className={styles.contas}>
            <div className={styles.container}>
                { contexto.state.contas.map((conta, i) => {
                    console.log('conta: ' + i)
                    console.log(conta)
                    return (
                        <CardConta 
                            key={i} 
                            id={conta.id}
                            icone={conta.icone}
                            nome={conta.nome} 
                            proprietario={conta.proprietario} 
                            saldo={conta.saldo}                             
                        />
                    )
                })}
                
            </div>
            <BotaoAdicionar path="/adicionar-conta" />
        </div>
    )
}