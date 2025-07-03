import InputDia from './InputDia'

import { useState, useContext, useEffect } from 'react'
import styles from '../estilos/InputFiltro.module.css'
import { formatarValor } from '../store/utils'
import { DadosContexto } from '../store'

export default function InputFiltro({ open, setFiltroOpen, filtragem, relatorio }) {
    const contexto = useContext(DadosContexto)
    const [filtro, setFiltro] = useState('Data')

    const [diaInicial, setDiaInicial] = useState()
    const [diaFinal, setDiaFinal] = useState()

    const [nome, setNome] = useState('')

    const [valorMinimo, setValorMinimo] = useState(formatarValor(0))
    const [valorMaximo, setValorMaximo] = useState(formatarValor(0))
    const [conta, setConta] = useState({ 
        nome: '',
        id: null
    })
    const [categoria, setCategoria] = useState({ 
        nome: '',
        id: null
    })

    useEffect(() => aplicarFiltro(), [diaInicial, diaFinal, nome, valorMaximo, valorMinimo, conta, categoria, filtro, open])

    const aplicarFiltro = () => {
        let funcaoFiltro
        if(!open) {
            funcaoFiltro = () => true
            filtragem(() => funcaoFiltro)
            return
        }

        switch (filtro) {
            case 'Data':
                funcaoFiltro = movimentacao => {
                    if (!diaInicial && !diaFinal) return true
                    const dataMovimentacao = movimentacao.data.toDate()
                    const dataInicial = diaInicial ? new Date(diaInicial) : null
                    const dataFinal = diaFinal ? new Date(diaFinal) : null

                    
                    if ((dataInicial && dataFinal) && (dataInicial > dataFinal)) 
                            return dataMovimentacao <= dataInicial && dataMovimentacao >= dataFinal
                    if (dataInicial && dataFinal)
                            return dataMovimentacao >= dataInicial && dataMovimentacao <= dataFinal
                    if (dataInicial) 
                        return dataMovimentacao >= dataInicial
                    return dataMovimentacao <= dataFinal
                }
                break
            case 'Nome':
                funcaoFiltro = movimentacao => {
                    if(nome === '') return true
                    return movimentacao.nome.toLowerCase().includes(nome?.toLowerCase())
                }
                break
            case 'Valor':
                funcaoFiltro = movimentacao => {
                    if(!valorMaximo && !valorMinimo) return true
                    const valorMovimentacao = movimentacao.valor
                    const valorMaximoNumero = +valorMaximo?.replace('R$ ', '').replace(',', '.')
                    const valorMinimoNumero = +valorMinimo?.replace('R$ ', '').replace(',', '.')

                    if(valorMinimoNumero === 0 && valorMaximoNumero === 0) return true
                    if((valorMaximoNumero && valorMinimoNumero) && (valorMinimoNumero > valorMaximoNumero))
                        return valorMovimentacao <= valorMinimoNumero && valorMovimentacao >= valorMaximoNumero
                    if(valorMaximoNumero && valorMinimoNumero)
                        return valorMovimentacao >= valorMinimoNumero && valorMovimentacao <= valorMaximoNumero
                    if(valorMinimoNumero)
                        return valorMovimentacao >= valorMinimoNumero
                    return valorMovimentacao <= valorMaximoNumero
                }
                break
            case 'Categoria':
                funcaoFiltro = movimentacao => {
                    if(!categoria?.id) return true
                    return movimentacao.categoriaId === categoria?.id
                }
                break
            case 'Conta':
                funcaoFiltro = movimentacao => {
                    if(!conta?.id) return true
                    return movimentacao.contaId === conta?.id
                }
                break
            default:
                funcaoFiltro = () => true
        }
        
        filtragem(() => funcaoFiltro)
    }

    return (
        <div className={ `
            ${ styles.filtro } 
            ${ relatorio ? styles.filtroRelatorio : null } 
            ${ !open ? styles.filtroClose : null  }
        ` } >
            <select name='filtro' id='' value={ filtro } onChange={ e => setFiltro(e.target.value)}>
                <option value='Data'>Data</option>
                <option value='Nome'>Nome</option>
                <option value='Valor'>Valor</option>
                <option value='Categoria'>Categoria</option>
                <option value='Conta'>Conta</option>
            </select>

        {
            filtro === 'Data' ?
            <>
                <InputDia value={ diaInicial } onChange={ e => setDiaInicial(e) }
                />
                <InputDia value={ diaFinal } onChange={ e => setDiaFinal(e) }  
                />
            </>
            :
                null
        }
        {
            filtro === 'Nome' ?
                <input type="text" value={ nome } onChange={ e => setNome(e.target.value) } />
            :
                null
        }
        {
            filtro === 'Valor' ?
                <>
                    <input type="text" value={ valorMinimo } onChange={ e => setValorMinimo(formatarValor(e.target.value)) } />
                    <input type="text" value={ valorMaximo } onChange={ e => setValorMaximo(formatarValor(e.target.value)) } />
                </>
            :
                null
        }
        {
            filtro === 'Categoria' ?
            <select value={ categoria?.nome } onChange={ e => {
                setCategoria({
                    nome: e.target.value,
                    id: e.target[e.target.selectedIndex].id
                })
            }}>
                <option value=''>Selecione uma Categoria</option>
                { contexto.state.categorias.map((categoria, i) => (<option key={i} id={categoria.id}>{categoria.nome}</option>)) }
            </select>
            :
                null
        }
        {
            filtro === 'Conta' ?
            <select value={ conta?.nome } onChange={ e => {
                setConta({
                    nome: e.target.value,
                    id: e.target[e.target.selectedIndex].id
                })
            }}>
                <option value=''>Selecione uma Conta</option>
                { contexto.state.contas.map((conta, i) => (<option key={i} id={conta.id}>{conta.nome}</option>)) }
            </select>
            :
                null
        }
            <i className={`bx bx-x ${styles.close}`} style={ relatorio ? { display: 'block' } : null} onClick={ setFiltroOpen }></i>
        </div>
    )
}