import { useContext, useState, useRef, useEffect } from 'react'
import { DadosContexto } from '../store'

import Categoria from '../componentes/Categoria'
import BotaoAdicionar from '../componentes/BotaoAdicionar'

import styles from '../estilos/Categorias.module.css'

export default function Categorias() {
    const contexto = useContext(DadosContexto)
    const [ adicionar, setAdicionar ] = useState(false)
    const [ categoriaEditavel, setCategoriaEditavel ] = useState(null)
    const ref = useRef(null)

    const adicionarCategoria = () => {
        if(!adicionar && !categoriaEditavel) {
            setAdicionar(prev => !prev)
        } else 
            ref.current?.adicionarCategoria()
    }

    const handleKeyDown = e => {
        if(e.key === 'Escape') {
            setAdicionar(false)
            setCategoriaEditavel(null)
        }

        if(e.key === 'Enter') {
            adicionarCategoria()
        }
    }

    return (
        <div 
            className='tela-padrao'
            onKeyDown={ e => handleKeyDown(e) }
            tabIndex={ 0 }
        >
            <div className={ styles.container }>
                { (contexto.state.categorias.length > 0 || adicionar)?
                        contexto.state.categorias.map((categoria, i) => 
                            <Categoria 
                                key={ i } 
                                id={ categoria.id } 
                                nome={ categoria.nome } 
                                categoriaEditavel={ categoriaEditavel === categoria.id }
                                setCategoriaEditavel={ setCategoriaEditavel }
                                naoAdicionar={() => setAdicionar(false)}
                                ref={ ref }  
                            />
                        )
                :   
                    <div className={ styles.semCategoria }>
                        <p>Adicione uma Categoria</p>
                    </div>
                }
                { 
                    adicionar ?
                        <Categoria 
                            nome=''
                            adicionar 
                            naoAdicionar={() => setAdicionar(false)}
                            ref={ ref }
                        /> 
                    : null
                }
                <BotaoAdicionar onClick={ adicionarCategoria } />
            </div>
        </div>
    )
}