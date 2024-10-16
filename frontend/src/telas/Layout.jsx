import { useContext, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { movementsActions } from "../store/action"

import { DadosContexto } from "../store"

import Cabecalho from "../surface/Cabecalho";
import Rodape from "../surface/Rodape";

export default function Layout() {
    
    const contexto = useContext(DadosContexto)

    useEffect(() => {
        movementsActions.obterDespesas(contexto.dispatch, 8)
    }, [])

    return (
        <>
            <Cabecalho />
            <Outlet />
            <Rodape />
        </>
    )
}