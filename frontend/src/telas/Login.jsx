import { useState } from 'react'
import { Link } from "react-router-dom"

import globalStyle from "../estilos/Login.module.css"

export default function Login() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    function tratarInput(setVariavel, e) {
        setVariavel(e.target.value)
    }
    return (
        <form>
            <div className={globalStyle.formulario}>
                <h1>Usuário</h1>
                <input type="text" value={ usuario } onChange={ e => tratarInput(setUsuario, e) }/>
                <h1>Senha</h1>
                <input type="text" value={ senha } onChange={ e => tratarInput(setSenha, e) }/>
                <a href="">Esqueci minha senha</a>
                <button>Entrar</button>
                <Link to="/cadastro">Ainda não possuo conta</Link>
            </div>
        </form>
    );
}