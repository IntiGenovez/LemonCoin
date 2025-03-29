import { useContext, useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { userActions, errorMessageActions, historyActions } from '../store/actionFirebase'
import BotaoVoltar from '../componentes/BotaoVoltar'

import { DadosContexto } from '../store'

import Cabecalho from '../surface/Cabecalho'
import Mensagem from '../componentes/Mensagem'
import Rodape from '../surface/Rodape'

export default function Layout() {
    const [ultimoPath, setUltimoPath] = useState()
    
    const contexto = useContext(DadosContexto)
    let titulo = useLocation().pathname

    useEffect(() => {
        userActions.obterDadosUsuario(contexto.dispatch)
    }, [])


    useEffect(() => {
        setUltimoPath(titulo)
        if(ultimoPath !== titulo) 
            historyActions.atualizarHistorico(contexto.dispatch, titulo)
    }, [titulo])

    return (
        <>
            <Cabecalho />
            {
                titulo === '/' ? 
                    (
                        
                        <></>
                    )
                    :
                    (
                        <>
                            <BotaoVoltar home={ false } />
                            <BotaoVoltar home={ true } />
                        </>
                    )
            }
            <Outlet />
            <Mensagem
                open={ contexto.state.mensagemErro.openDialog  }
                onClose={ () => errorMessageActions.fecharMensagem(contexto.dispatch) }
                textoBotao='Fechar'
                link={ contexto.state.mensagemErro.link }
                tipo={ contexto.state.mensagemErro.tipo }
                titulo={ contexto.state.mensagemErro.titulo }
                mensagem={ `${ contexto.state.mensagemErro.mensagem }` }
            />
            <Rodape />
        </>
    )
}