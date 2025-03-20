import { useState, useContext, useEffect, useTransition } from 'react'
import { Link, useNavigate } from "react-router-dom"
import BotaoAcao from '../componentes/BotaoAcao'

import globalStyle from "../estilos/Login.module.css"

import { DadosContexto } from "../store"
import { userActions, movementsActions, accountsActions, categoriesActions } from "../store/actionFirebase"

export default function Login() {
    const contexto = useContext(DadosContexto)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [usuario, setUsuario] = useState({
        email: '12345@gmail.com',
        senha: '12345'
    })

    const handleClick = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const sucesso = await userActions.signin(contexto.dispatch, usuario)
        setLoading(false)

        if(sucesso) {
            try {
                navigate('/home')
                await Promise.all([
                    movementsActions.obterMovimentacoes(contexto.dispatch),
                    accountsActions.obterContas(contexto.dispatch),
                    categoriesActions.obterCategorias(contexto.dispatch)
                ])
            } catch (err) {
                setError("Erro ao obter dados: " + err.message)
            }
        } else {
            setError("Usuário inválido")
        }
    }

    const handleRecuperarSenha = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const sucesso = await userActions.recuperarSenhaPedido(contexto.dispatch, usuario)
        setLoading(false)

        if (sucesso) {
            setError(null)
            return
        } else {
            setError("Informe seu email")
        }
    }

    return (
        <form>

            <div className={globalStyle.formulario}>
                <h1>Usuário</h1>
                <input 
                    type="text" 
                    value={ usuario.email } 
                    onChange={ e => setUsuario(prev => ({...prev, email: e.target.value})) }
                    disabled={loading}
                />

                <h1>Senha</h1>
                <input 
                    type="password" 
                    value={ usuario.senha } 
                    onChange={ e => setUsuario(prev => ({...prev, senha: e.target.value})) }
                    disabled={loading}
                />

                <Link onClick={ handleRecuperarSenha }>Esqueci minha senha</Link>

                {error && <p>{error}</p>}

                <BotaoAcao onClick={ handleClick } disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </BotaoAcao>

                <Link to="/cadastro">Ainda não possuo conta</Link>
            </div>
        </form>
    );
}