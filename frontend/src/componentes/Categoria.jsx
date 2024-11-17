import { useContext, useEffect, useState } from "react"
import { DadosContexto } from "../store"

import { categoriesActions } from "../store/action"

import styles from '../estilos/Categoria.module.css'

export default function Categoria({ id, nome, adicionar, naoAdicionar, categoriaEditavel, setCategoriaEditavel }) {
    const contexto = useContext(DadosContexto)
    const [ newCategoria, setNewCategoria ] = useState({
        nome: nome,
        id: null
    })

    return (
        <>
            <div className={styles.item}>
            {
                adicionar || categoriaEditavel ?
                (<input value={ newCategoria.nome } onChange={ e => setNewCategoria(prev => ({...prev, nome: e.target.value})) } />)
                :
                (<p>{ nome }</p>)
            }
                <div style={{display: 'flex', gap: '10px'}}>
                    {
                        adicionar || categoriaEditavel ?
                        <i 
                            className='bx bx-check'
                            onClick={() => {
                                if (adicionar) {
                                    categoriesActions.adicionarCategoria(contexto.dispatch, newCategoria)
                                    naoAdicionar()  
                                } else {
                                    setNewCategoria(prev => ({ ...prev, id}))
                                    console.log(id)
                                    categoriesActions.atualizarCategoria(contexto.dispatch, newCategoria)
                                    setCategoriaEditavel(null)
                                }
                            }}
                        ></i>
                        :
                        <i 
                            className='bx bx-edit-alt'
                            onClick={() => {
                                categoriaEditavel === id ? setCategoriaEditavel(null) : setCategoriaEditavel(id)
                                naoAdicionar()
                            }}
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