import { useState, useContext, useEffect } from "react";
import Movimentacao from "../componentes/Movimentacao";
import Seletor from "../componentes/Seletor";
import BotaoNavegar from "../componentes/BotaoNavegar";
import styles from "../estilos/Movimentacoes.module.css"
import { useLocation } from "react-router-dom";


import { DadosContexto } from "../store"
import { movementsActions } from "../store/action"

export default function Movimentacoes({ tipo }) {
    const [ seletorAtivo, setSeletorAtivo ] = useState(null)
    const [ isUp, setIsUp ] = useState(false)
    const [ movimentacaoEditavel, setMovimentacaoEditavel ] = useState(null)
    const seletores = ['data', 'nome', 'valor', 'categoria', 'conta', 'Filtro']

    const location = useLocation()
    let linkAdicionar = location.pathname
    linkAdicionar = linkAdicionar.replace('/', '').slice(0, -1)
    linkAdicionar = "/adicionar-" + linkAdicionar
    
    const contexto = useContext(DadosContexto)

    const tratarClique = (seletor) => {
        if (seletor === seletorAtivo) {
            setIsUp(prev => !prev)
        } else {
            setSeletorAtivo(seletor)
            setIsUp(false)
        }
        movementsActions.ordenarMovimentacoes(contexto.dispatch, {seletorOrdenador: seletor, invertido: isUp })
    }

    useEffect(() => 
        movementsActions.ordenarMovimentacoes(contexto.dispatch, seletorAtivo, isUp), 
        [isUp, seletorAtivo]
    )



    return (
        <section className={ styles.containerMovimentacoes }>
            <select name="filtro" id="filtro" className={styles.filtro}>
                { seletores.map((seletor) =>
                    (<option value={ seletor } key={ seletor }>
                        {seletor !== "Filtro" ? seletor.toUpperCase() : ''}
                    </option>)
                )}
            </select>
            
            <div className={ styles.seletores }>
                { seletores.map((seletor) =>
                    (<Seletor  
                        nome={ seletor }
                        key={ seletor } 
                        isAtivo={ seletorAtivo === seletor }
                        isUp= { isUp && seletorAtivo === seletor }
                        setAtivo={ tratarClique }
                    />)
                )}
            </div>
            <ul>
                { contexto.state.movimentacoes
                    .filter(movimentacao => {
                        return movimentacao.tipo === tipo
                    })
                    .map(movimentacao => {
                        return (<Movimentacao  
                            tipo={ tipo } 
                            key={ movimentacao.id } 
                            movimentacaoListada={ movimentacao }
                            movimentacaoEditavel={ movimentacaoEditavel === movimentacao.id }
                            setMovimentacaoEditavel={ setMovimentacaoEditavel }
                        />)
                }
                ) }
            </ul>
            <div className={styles.total}>
                <p>Total: <span>{ contexto.state.movimentacoes
                    .filter(movimentacao => movimentacao.tipo === tipo)
                    .reduce((acc, atual) => +acc + +atual.valor, 0)
                    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }</span></p>
                <BotaoNavegar link={ linkAdicionar }>Adicionar { tipo }</BotaoNavegar>
            </div>
        </section>
    )
}