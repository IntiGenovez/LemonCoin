import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DadosContexto } from "../store"
import { userActions } from "../store/actionFirebase"

import InputDia from "../componentes/InputDia";
import InputAno from "../componentes/InputAno";
import InputMes from "../componentes/InputMes";
import Mensagem from "../componentes/Mensagem"

import styles from "../estilos/Cadastro.module.css"
import BotaoAcao from "../componentes/BotaoAcao";

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

    const handleClick = async e => {
        e.preventDefault()
        try {
            const cadastrar = await userActions.signup(contexto.dispatch, {
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                confirmarSenha: usuario.confirmarSenha,
                telefone: usuario.telefone,
                genero: usuario.genero
            })

            console.log(usuario)

            if (cadastrar) {
                console.log("Cadastro realizado com sucesso")
            } else {
                console.log(cadastrar)
            }
        } catch (error) {
            console.log("Erro ao realizar cadastro: ", error)
        }
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
            <input type="text" value={ usuario.nome } placeholder='Nome Completo: ' 
                onChange={ e => setUsuario({ ...usuario, nome: e.target.value}) } />
            <input type="text" value={ usuario.email } placeholder='Email: ' 
                onChange={ e => setUsuario({ ...usuario, email: e.target.value}) } />
            <input type="text" value={ usuario.telefone } placeholder='Telefone: ' 
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
                        Masculino 
                        <input type='radio' value='M' 
                            checked={ usuario.genero === 'M'} 
                            onChange={ e => setUsuario({ ...usuario, genero: e.target.value }) }/>
                    </label>
                    <label className={styles.margin} style={{fontWeight: '600'}}>
                        Feminino 
                        <input type='radio' value='F' 
                            checked={ usuario.genero === 'F'} 
                            onChange={ e => setUsuario({ ...usuario, genero: e.target.value }) }/>
                    </label>
                    <label className={styles.margin} style={{fontWeight: '600'}}>
                        Outro 
                        <input type='radio' value='O' 
                            checked={ usuario.genero === 'O'} 
                            onChange={ e => setUsuario({ ...usuario, genero: e.target.value }) }/>
                    </label>
                </div>
                
                <div className={styles.divSenha}>
                    <span>Senha</span>
                    <input type="password" name="Senha" id="Senha" value={usuario.senha} 
                        onChange={ e => setUsuario({ ...usuario, senha: e.target.value}) } />                
                    <span>Confirmar Senha</span>
                    <input type="password" name="Confirm-senha" id="Confirm-senha" value={usuario.confirmarSenha} 
                        onChange={ e => setUsuario({ ...usuario, confirmarSenha: e.target.value}) } />
                </div>
                <BotaoAcao onClick={ handleClick }>Cadastrar</BotaoAcao>

            </div>
            
            
        </form>
    );
}