import { useContext, useState } from 'react'
import { DadosContexto } from '../store'

import Categoria from '../componentes/Categoria'
import BotaoAdicionar from '../componentes/BotaoAdicionar'

import styles from '../estilos/Categorias.module.css'

export default function Categorias() {
    const contexto = useContext(DadosContexto)
    const [ adicionar, setAdicionar ] = useState(false)
    const [ categoriaEditavel, setCategoriaEditavel ] = useState(false)

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
                        />
                    )
                }
                { 
                    adicionar ?
                        <Categoria 
                            nome=''
                            adicionar 
                            naoAdicionar={() => setAdicionar(false)}
                        /> 
                    : null
                }
                <BotaoAdicionar onClick={() => {
                        setAdicionar(prev => !prev)
                        setCategoriaEditavel(null)
                    }
                } />
            </div>
        </div>
    )
}