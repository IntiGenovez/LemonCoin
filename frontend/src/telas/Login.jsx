// import React from "react";
import Cabecalho from '../surface/Cabecalho';
import Rodape from "../surface/Rodape";

import globalStyle from "../estilos/Global.module.css"

export default function Login() {
    return (
        <>
            <Cabecalho />

            <body className={globalStyle.body}>
                <div className={globalStyle.formulario}>
                    <h1>Usuário</h1>
                    <input type="text" />

                    <h1>Senha</h1>
                    <input type="text" />
                    <br />

                    <a href="">Esqueci minha senha</a>
                    <br />

                    <button>Entrar</button>
                    <br />

                    <a href="">Ainda não possuo conta</a>
                </div>
            </body>
            <Rodape />
        </>
    );
}