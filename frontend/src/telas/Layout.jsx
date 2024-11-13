import { useContext, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { movementsActions, accountsActions } from "../store/action"
import BotaoVoltar from "../componentes/BotaoVoltar"
import { useLocation } from "react-router-dom"

import { DadosContexto } from "../store"

import Cabecalho from "../surface/Cabecalho";
import Rodape from "../surface/Rodape";

export default function Layout() {
    
    const contexto = useContext(DadosContexto)

    useEffect(() => {
        movementsActions.obterDespesas(contexto.dispatch, 8)
        accountsActions.obterContas(contexto.dispatch)
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
            <Rodape />
        </>
    )
}