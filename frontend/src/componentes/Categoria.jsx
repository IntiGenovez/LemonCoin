import { useContext, useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react"
import { DadosContexto } from "../store"

import { categoriesActions } from "../store/actionFirebase"

import styles from '../estilos/Categoria.module.css'

const Categoria = forwardRef(function Categoria({ id, nome, adicionar, naoAdicionar, categoriaEditavel, setCategoriaEditavel }, ref) {
    const contexto = useContext(DadosContexto)
    const [ newCategoria, setNewCategoria ] = useState({
        nome: nome,
        id: null
    })
    const inputRef = useRef(null)

    useImperativeHandle(ref, () => ({
        adicionarCategoria: () => {
            handleConfirmar()
        }
    }))

    useEffect(() => {
        if (adicionar || categoriaEditavel) {
            inputRef.current?.focus()
        }
    }, [adicionar, categoriaEditavel])

    const handleConfirmar = e => {
        if(e && e.type === 'keyup' && e.key === 'Escape') {
            setCategoriaEditavel ? setCategoriaEditavel(null) : null
            naoAdicionar ? naoAdicionar() : null  
            return
        }
        if(e && e.type === 'keyup' && e.key != 'Enter') return
        
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
        setNewCategoria(prev => ({ ...prev, id, nome }))
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
})

export default Categoria