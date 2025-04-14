import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DadosContexto } from '../store'
import { userActions } from '../store/actionFirebase'

import InputDia from '../componentes/InputDia'

import styles from '../estilos/Cadastro.module.css'
import BotaoAcao from '../componentes/BotaoAcao'

export default function Cadastro(){
    const contexto = useContext(DadosContexto)
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        genero: '',
        senha: '',
        confirmarSenha: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleClick = async e => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(null)

            const sucesso = await userActions.signup(contexto.dispatch, { ...usuario })
            setLoading(false)

            if (sucesso) {
                navigate('/home')
                return
            } 
        } catch (error) {
            setError(err.message)
        }

        setError('Verifique os Dados e Tente Novamente')
    }

    const handleInputTelefone = e => {
        let valor = e.target.value
        if (valor.length > 15) {
            return
        }
        valor = valor.replace(/\D/g, '') // Remove tudo que não é dígito
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
        valor = valor.replace(/(\d)(\d{4})$/, '$1-$2') // Coloca hífen entre o quarto e o quinto dígitos
        setUsuario({ ...usuario, telefone: valor })
    }

    return (
        <form className={styles.formulario}>
            <h1>CADASTRE-SE AQUI</h1>
            {error && <p>{error}</p>}
            <input type='text' value={ usuario.nome } placeholder='Nome Completo: ' 
                onChange={ e => setUsuario(prev => ({ ...prev, nome: e.target.value})) } />
            <input type='text' value={ usuario.email } placeholder='Email: ' 
                onChange={ e => setUsuario(prev => ({ ...prev, email: e.target.value})) } />
            <input type='text' value={ usuario.telefone } placeholder='Telefone: ' 
                onChange={e => handleInputTelefone(e)} />
            
            <div>
                <h2>Data de Nascimento:</h2>
                <div className={styles.divNascimento}>
                    <InputDia 
                        value={usuario.dataNascimento} 
                        onChange={ e => setUsuario({ ...usuario, dataNascimento: e }) } 
                    />
                </div>
            </div>
            <div> 
                <h2>Gênero</h2>
                <div className={styles.genero}>
                    <label className={styles.margin} style={{fontWeight: '600'}}>
                        <span>Masculino</span> 
                        <input type='radio' value='M' 
                            checked={ usuario.genero === 'M'} 
                            onChange={ e => setUsuario(prev => ({ ...prev, genero: e.target.value })) }/>
                    </label>
                    <label className={styles.margin} style={{fontWeight: '600'}}>
                        <span>Feminino</span> 
                        <input type='radio' value='F' 
                            checked={ usuario.genero === 'F'} 
                            onChange={ e => setUsuario(prev => ({ ...prev, genero: e.target.value })) }/>
                    </label>
                    <label className={styles.margin} style={{fontWeight: '600'}}>
                        <span>Outro</span> 
                        <input type='radio' value='O' 
                            checked={ usuario.genero === 'O'} 
                            onChange={ e => setUsuario(prev => ({ ...prev, genero: e.target.value })) }/>
                    </label>
                </div>
                
                <div className={styles.divSenha}>
                    <div>
                        <span>Senha</span>
                        <input type='password' name='Senha' id='Senha' value={usuario.senha}
                            onChange={ e => setUsuario({ ...usuario, senha: e.target.value}) } />
                    </div>               
                    <div>
                        <span>Confirmar Senha</span>
                        <input type='password' name='Confirm-senha' id='Confirm-senha' value={usuario.confirmarSenha}
                            onChange={ e => setUsuario({ ...usuario, confirmarSenha: e.target.value}) } />
                    </div>
                </div>
                <BotaoAcao onClick={ handleClick }>Cadastrar</BotaoAcao>
            </div>
        </form>
    )
}