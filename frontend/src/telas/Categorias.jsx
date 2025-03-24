import { useContext, useState, useRef } from 'react'
import { DadosContexto } from '../store'

import Categoria from '../componentes/Categoria'
import BotaoAdicionar from '../componentes/BotaoAdicionar'

import styles from '../estilos/Categorias.module.css'

export default function Categorias() {
    const contexto = useContext(DadosContexto)
    const [ adicionar, setAdicionar ] = useState(false)
    const [ categoriaEditavel, setCategoriaEditavel ] = useState(false)
    const ref = useRef(null)

    const adicionarCategoria = () => {
        setCategoriaEditavel(null)
        setAdicionar(prev => !prev)

        if(adicionar) ref.current?.adicionarCategoria()
    }

    return (
        <div className='tela-padrao'>
            <div className={ styles.container }>
                {
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