import { useContext, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { userActions, errorMessageActions } from "../store/actionFirebase"
import BotaoVoltar from "../componentes/BotaoVoltar"
import { useLocation } from "react-router-dom"

import { DadosContexto } from "../store"
import { userKey } from "../global"

import Cabecalho from "../surface/Cabecalho"
import Mensagem from "../componentes/Mensagem"
import Rodape from "../surface/Rodape"

export default function Layout() {
    
    const contexto = useContext(DadosContexto)

    useEffect(() => {
        userActions.obterDadosUsuario(contexto.dispatch)
    }, [])

    let titulo = useLocation().pathname

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
                            <BotaoVoltar />
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