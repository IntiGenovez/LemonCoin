import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DadosContexto } from "../store"
import { userActions } from "../store/action"

import InputDia from "../componentes/InputDia";
import InputAno from "../componentes/InputAno";
import InputMes from "../componentes/InputMes";
import Mensagem from "../componentes/Mensagem"

import styles from "../estilos/Cadastro.module.css"
import BotaoAcao from "../componentes/BotaoAcao";

export default function Cadastro(){
    const contexto = useContext(DadosContexto)
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        telefone: '',
        dia: '',
        mes: '',
        ano: '',
        genero: '',
        senha: '',
        confirmarSenha: ''
    })
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogError, setOpenDialogError] = useState(false)

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

            if (cadastrar) {
                setOpenDialog(true)
                console.log("Cadastro realizado com sucesso")
            } else {
                setOpenDialogError(true)
                console.log(cadastrar)
            }
        } catch (error) {
            setOpenDialogError(true)
            console.log("Erro ao realizar cadastro: ", error)
        }
    }

    return (
        <form className={styles.formulario}>
            <h1>CADASTRE-SE AQUI</h1>
            <input type="text" value={ usuario.nome } placeholder='Nome Completo: ' 
                onChange={ e => setUsuario({ ...usuario, nome: e.target.value}) } />
            <input type="text" value={ usuario.email } placeholder='Email: ' 
                onChange={ e => setUsuario({ ...usuario, email: e.target.value}) } />
            <input type="text" value={ usuario.telefone } placeholder='Telefone: ' 
                onChange={ e => setUsuario({ ...usuario, telefone: e.target.value}) } />
            
            <div>
                <h2>Data de Nascimento:</h2>
                <div className={styles.inputSelect}>
                    <InputDia valor={usuario.dia} onChange={valor => setUsuario({ ...usuario, dia: valor})} />

                    <InputMes valor={usuario.mes} onChange={valor => setUsuario({ ...usuario, mes: valor})} />

                    <InputAno valor={usuario.ano} onChange={valor => setUsuario({ ...usuario, ano: valor})} />
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
            <Mensagem
                open={ openDialog }
                onClose={ () => {
                    setOpenDialog(false)
                    navigate('/login')
                }}
                textoBotao='Fechar'
                link='/contas'
                tipo='success'
                titulo={ 'Cadastro Realizado com sucesso' }
                mensagem={ 'Cadastro Realizado com sucesso' }
            /> 
            <Mensagem
                open={ openDialogError }
                onClose={ () => {
                    setOpenDialogError(false)
                }}
                textoBotao='Fechar'
                link=''
                tipo='error'
                titulo={ 'Erro ao realizar cadastro' }
                mensagem={ 'Houve um erro ao realizar o seu cadastro, verifique todos seus dados' }
            />
            
        </form>
    );
}