import { useState, useContext, useEffect, useTransition } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BotaoAcao from '../componentes/BotaoAcao'

import globalStyle from '../estilos/Login.module.css'

import { DadosContexto } from '../store'
import { userActions } from '../store/actionFirebase'
import { isUserSignedIn } from "../store/actionFirebase/firebase"

export default function Login() {
    const contexto = useContext(DadosContexto)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [usuario, setUsuario] = useState({
        email: '',
        senha: ''
    })
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)

    useEffect(() => {
        const unsubscribe = isUserSignedIn(user => {
            setUsuarioAutenticado(user)
            setLoading(false)
        })
        
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (usuarioAutenticado) navigate('/home')
    }, [usuarioAutenticado])

    const handleClick = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const sucesso = await userActions.signin(contexto.dispatch, usuario)
        setLoading(false)

        if(sucesso) {
            try {
                navigate('/home')
            } catch (err) {
                setError('Erro ao obter dados: ' + err.message)
            }
            return
        }
        
        setError('Usuário inválido')
    }

    const handleRecuperarSenha = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const sucesso = await userActions.recuperarSenha(contexto.dispatch, usuario)
        setLoading(false)

        if (sucesso) {
            setError(null)
            return
        }

        setError('Informe seu email')
    }

    return (
        <form>

            <div className={globalStyle.formulario}>
                <h1>Email</h1>
                <input 
                    type='text' 
                    value={ usuario.email } 
                    onChange={ e => setUsuario(prev => ({...prev, email: e.target.value})) }
                    disabled={loading}
                />

                <h1>Senha</h1>
                <input 
                    type='password' 
                    value={ usuario.senha } 
                    onChange={ e => setUsuario(prev => ({...prev, senha: e.target.value})) }
                    disabled={loading}
                />

                <Link onClick={ handleRecuperarSenha }>Esqueci minha senha</Link>

                {error && <p>{error}</p>}

                <BotaoAcao onClick={ handleClick } disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </BotaoAcao>

                <Link to='/cadastro'>Ainda não possuo conta</Link>
            </div>
        </form>
    );
}