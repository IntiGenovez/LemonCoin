import { useState, useContext, useEffect, useRef } from 'react'
import Movimentacao from '../componentes/Movimentacao'
import Seletor from '../componentes/Seletor'
import InputFiltro from '../componentes/InputFiltro'
import BotaoNavegar from '../componentes/BotaoNavegar'
import styles from '../estilos/Movimentacoes.module.css'
import { useLocation } from 'react-router-dom'


import { DadosContexto } from '../store'
import { movementsActions } from '../store/actionFirebase'

export default function Movimentacoes({ tipo }) {
    const [ seletorAtivo, setSeletorAtivo ] = useState(null)
    const [ isUp, setIsUp ] = useState(false)
    const [ filtroOpen, setFiltroOpen ] = useState(false)
    const [ movimentacaoEditavel, setMovimentacaoEditavel ] = useState(null)
    const [filtragem, setFiltragem] = useState(() => () => true)
    const seletores = ['data', 'nome', 'valor', 'categoria', 'conta', 'Filtro']
    const ref = useRef(null)

    const location = useLocation()
    let linkAdicionar = location.pathname
    linkAdicionar = linkAdicionar.replace('/', '').slice(0, -1)
    linkAdicionar = '/adicionar-' + linkAdicionar

    const [tamanho, setTamanho] = useState({
        largura: window.innerWidth,
        altura: window.innerHeight
    })
    const contexto = useContext(DadosContexto)

    useEffect(() => {
        const handleResize = () => {
            setTamanho({
                largura: window.innerWidth,
                altura: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    
    useEffect(() => 
        movementsActions.ordenarMovimentacoes(contexto.dispatch, seletorAtivo, isUp), 
        [isUp, seletorAtivo]
    )    

    const handleKeyDown = e => {
        ref.current?.atualizarMovimentacao(e)
    }

    const handleClick = (seletor) => {
        if (seletor === seletorAtivo) {
            setIsUp(prev => !prev)
        } else {
            setSeletorAtivo(seletor)
            setIsUp(false)
        }
        movementsActions.ordenarMovimentacoes(contexto.dispatch, {seletorOrdenador: seletor, invertido: isUp })
    }

    return (
        <section className={ styles.containerMovimentacoes } tabIndex={ 0 } onKeyDown={ e => handleKeyDown(e) }>            
            <div className={ styles.seletores }>
                { seletores.map((seletor) =>
                    (<Seletor  
                        nome={ seletor }
                        key={ seletor } 
                        isAtivo={ seletorAtivo === seletor }
                        isUp= { isUp && seletorAtivo === seletor }
                        setAtivo={ handleClick }
                        setFiltroOpen={ () => {
                            setFiltroOpen(prev => !prev)
                            setFiltragem(() => () => true)
                        }} 
                    />)
                )}
            </div>
                <InputFiltro 
                    open={ filtroOpen } 
                    setFiltroOpen={ () => {
                        setFiltroOpen(prev => !prev)
                        setFiltragem(() => () => true)
                    }} 
                    filtragem={ setFiltragem }
                />

            <ul>
                { contexto.state.movimentacoes.length > 0 ?
                    contexto.state.movimentacoes
                        .filter(movimentacao => movimentacao.tipo === tipo)
                        .filter( filtragem )
                        .map(movimentacao => {
                            return (<Movimentacao  
                                tipo={ tipo } 
                                key={ movimentacao.id } 
                                movimentacaoListada={ movimentacao }
                                movimentacaoEditavel={ movimentacaoEditavel === movimentacao.id }
                                setMovimentacaoEditavel={ setMovimentacaoEditavel }
                                ref={ ref }
                            />)
                        })
                :
                    <div className={ styles.semMovimentacao }>
                        <p>Adicione uma Nova { tipo }</p>
                    </div>
                }
            </ul>
            
            <div className={styles.total}>
                <p>Total: <span>{ contexto.state.movimentacoes
                    .filter(movimentacao => movimentacao.tipo === tipo)
                    .filter( filtragem )
                    .reduce((acc, atual) => +acc + +atual.valor, 0)
                    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }</span></p>
                <BotaoNavegar link={ linkAdicionar }>Adicionar { tipo }</BotaoNavegar>
            </div>
        </section>
    )
}