import { useContext, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { movementsActions, accountsActions, categoriesActions, errorMessageActions } from "../store/action"
import BotaoVoltar from "../componentes/BotaoVoltar"
import { useLocation } from "react-router-dom"

import { DadosContexto } from "../store"

import Cabecalho from "../surface/Cabecalho"
import Mensagem from "../componentes/Mensagem"
import Rodape from "../surface/Rodape"

export default function Layout() {
    
    const contexto = useContext(DadosContexto)

    useEffect(() => {
        movementsActions.obterMovimentacoes(contexto.dispatch)
        accountsActions.obterContas(contexto.dispatch)
        categoriesActions.obterCategorias(contexto.dispatch)
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
                link={ window.location.pathname }
                tipo='success'
                titulo='Ocorreu um erro'
                mensagem={ `${ contexto.state.mensagemErro.mensagem }` }
            />
            <Rodape />
        </>
    )
}