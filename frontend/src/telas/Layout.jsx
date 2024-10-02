import { Outlet } from "react-router-dom"

import Cabecalho from "../surface/Cabecalho";
import Rodape from "../surface/Rodape";

export default function Layout() {
    return (
        <>
            <Cabecalho />
            <Outlet />
            <Rodape />
        </>
    )
}