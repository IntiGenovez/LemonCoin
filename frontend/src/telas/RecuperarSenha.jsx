import { useState, useContext } from 'react'
import { useSearchParams } from "react-router-dom"
import BotaoAcao from '../componentes/BotaoAcao'

import globalStyle from "../estilos/Login.module.css"
import { userActions } from "../store/action"
import { DadosContexto } from '../store'


export default function RecuperarSenha() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const contexto = useContext(DadosContexto)

    const [senha, setSenha] = useState({
        senha: '',
        confirmarSenha: ''
    })

    const handleClick = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const sucesso = await userActions.recuperarSenha(contexto.dispatch, token, senha.senha, senha.confirmarSenha)
        setLoading(false)

        if (sucesso) {
            setError(null)
            return
        } else {
            setError("Senhas não conferem")
        }
    }

    return (
        <form>

            <div className={globalStyle.formulario}>
                <h2>Nova Senha</h2>
                <input 
                    type="password" 
                    value={ senha.senha } 
                    onChange={ e => setSenha(prev => ({...prev, senha: e.target.value})) }
                    disabled={loading}
                />

                <h2>Confirme a Senha</h2>
                <input 
                    type="password" 
                    value={ senha.confirmarSenha } 
                    onChange={ e => setSenha(prev => ({...prev, confirmarSenha: e.target.value})) }
                    disabled={loading}
                />

                {error && <p>{error}</p>}

                <BotaoAcao onClick={ handleClick } disabled={loading}>
                    {loading ? "Enviando..." : "Enviar"}
                </BotaoAcao>
            </div>
        </form>
    );
}