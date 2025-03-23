import { useContext, useState, useRef, useEffect } from "react"
import { DadosContexto } from "../store"

import { categoriesActions } from "../store/actionFirebase"

import styles from '../estilos/Categoria.module.css'

export default function Categoria({ id, nome, adicionar, naoAdicionar, categoriaEditavel, setCategoriaEditavel }) {
    const contexto = useContext(DadosContexto)
    const [ newCategoria, setNewCategoria ] = useState({
        nome: nome,
        id: null
    })
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [newCategoria])

    const handleConfirmar = e => {
        if(e.type === 'keyup' && e.key === 'Escape') {
            console.log('aqui')
            setCategoriaEditavel(null)
            naoAdicionar()  
            return
        }
        if(e.type === 'keyup' && e.key != 'Enter') return
        
        if (adicionar) {
            categoriesActions.adicionarCategoria(contexto.dispatch, newCategoria)
            naoAdicionar()  
        } else {
            setNewCategoria(prev => ({ ...prev, id}))
            categoriesActions.atualizarCategoria(contexto.dispatch, newCategoria)
            setCategoriaEditavel(null)
        }
    }

    const handleEditar = e => {
        if (categoriaEditavel === id) {
            setCategoriaEditavel(null)
            return
        } 

        setCategoriaEditavel(id)
        setNewCategoria(prev => ({ ...prev, id}))
        naoAdicionar()
    }

    return (
        <>
            <div className={styles.item}>
            {
                adicionar || categoriaEditavel ?
                (<input 
                    ref={ inputRef }
                    value={ newCategoria.nome } 
                    onKeyUp={ e => handleConfirmar(e) }
                    onChange={ e => setNewCategoria(prev => ({...prev, nome: e.target.value})) } />)
                :
                (<p>{ nome }</p>)
            }
                <div style={{display: 'flex', gap: '10px'}}>
                    {
                        adicionar || categoriaEditavel ?
                        <i 
                            className='bx bx-check'
                            onClick={e => handleConfirmar(e)}
                        ></i>
                        :
                        <i 
                            className='bx bx-edit-alt'
                            onClick={e => handleEditar(e)}
                        ></i>
                    }
                    
                    <i 
                        className='bx bx-trash'
                        onClick={() => {
                            if (adicionar) {
                                naoAdicionar()
                                return
                            }
                            categoriesActions.deletarCategoria(contexto.dispatch, id)
                        }}
                    ></i>
                </div>
            </div>
        </>
    )
}