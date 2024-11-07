import { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import BotaoAcao from '../componentes/BotaoAcao'

import globalStyle from "../estilos/Login.module.css"

import { DadosContexto } from "../store"
import { userActions } from "../store/action"

export default function Login() {
    const contexto = useContext(DadosContexto)

    const [usuario, setUsuario] = useState({
        email: 'inti@inti.comm',
        senha: '123'
    })

    const handleClick = e => {
        e.preventDefault()
        userActions.signin(contexto.dispatch, usuario)
    }

    useEffect(() => {
        console.log(contexto)
    }, [contexto.state])


    return (
        <form>

            <div className={globalStyle.formulario}>
                <h1>Usuário</h1>
                <input type="text" value={ usuario.email } onChange={ e => setUsuario(prev => ({...prev, email: e.target.value})) }/>

                <h1>Senha</h1>
                <input type="text" value={ usuario.senha } onChange={ e => setUsuario(prev => ({...prev, senha: e.target.value})) }/>

                <Link to="">Esqueci minha senha</Link>

                <BotaoAcao onClick={ handleClick }>Entrar</BotaoAcao>

                <Link to="/cadastro">Ainda não possuo conta</Link>
            </div>
        </form>
    );
}