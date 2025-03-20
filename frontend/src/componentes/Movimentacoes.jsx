import { useState, useContext, useEffect } from "react";
import Movimentacao from "../componentes/Movimentacao";
import Seletor from "../componentes/Seletor";
import BotaoNavegar from "../componentes/BotaoNavegar";
import styles from "../estilos/Movimentacoes.module.css"
import { useLocation } from "react-router-dom";


import { DadosContexto } from "../store"
import { movementsActions } from "../store/actionFirebase"

export default function Movimentacoes({ tipo }) {
    const [ seletorAtivo, setSeletorAtivo ] = useState(null)
    const [ isUp, setIsUp ] = useState(false)
    const [ movimentacaoEditavel, setMovimentacaoEditavel ] = useState(null)
    const seletores = ['data', 'nome', 'valor', 'categoria', 'conta', 'Filtro']

    const location = useLocation()
    let linkAdicionar = location.pathname
    linkAdicionar = linkAdicionar.replace('/', '').slice(0, -1)
    linkAdicionar = "/adicionar-" + linkAdicionar

    const [tamanho, setTamanho] = useState({
        largura: window.innerWidth,
        altura: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setTamanho({
                largura: window.innerWidth,
                altura: window.innerHeight
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
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

            {tamanho.largura <= 768 ? //se a tela for mobile, ira fazer uma ul em ordem alfabetica da data
                <ul>
                    {contexto.state.movimentacoes
                        .filter(movimentacao => movimentacao.tipo === tipo)
                        .slice() 
                        .sort((a, b) => new Date(b.data) - new Date(a.data)) //ordena por data
                        .map(movimentacao => (
                            <Movimentacao  
                                tipo={tipo} 
                                key={movimentacao.id} 
                                movimentacaoListada={movimentacao}
                                movimentacaoEditavel={movimentacaoEditavel === movimentacao.id}
                                setMovimentacaoEditavel={setMovimentacaoEditavel}
                            />
                        ))}
                </ul>

            : //else

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
            }
            
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