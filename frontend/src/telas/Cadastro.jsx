import { useState } from 'react';
import InputDia from '../componentes/InputDia';
import InputAno from '../componentes/InputAno';
import InputMes from '../componentes/InputMes';

import styles from "../estilos/Cadastro.module.css"

export default function Cadastro(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')

    function tratarInput(setVariavel, e) {
        setVariavel(e.target.value)
    }

    return (
        <form className={styles.formulario}>
            <h1>CADASTRE-SE AQUI</h1>
            <input type="text" value={ nome } placeholder='Nome Completo: ' onChange={ e => tratarInput(setNome, e) } />
            <input type="text" value={ email } placeholder='Email: ' onChange={ e => tratarInput(setEmail, e) } />
            <input type="text" value={ telefone } placeholder='Telefone: ' onChange={ e => tratarInput(setTelefone, e) }/>
            
            <div>
                <h2>Data de Nascimento:</h2>
                <div className={styles.inputSelect}>
                    <InputDia />

                    <InputMes />

                    <InputAno />
                </div>
            </div>
            <div> 
                <h2>Gênero</h2>
                <div className={styles.genero}>
                    <span className={styles.margin} style={{fontWeight: '600'}}>FEMININO <input type='radio' name='Genero' id='GeneroM'></input></span>
                    <span className={styles.margin} style={{fontWeight: '600'}}>MASCULINO <input type='radio' name='Genero' id='GeneroF'></input></span>
                    <span className={styles.margin} style={{fontWeight: '600'}}>OUTRO <input type='radio' name='Genero' id='GeneroF'></input></span>
                </div>
                
                <div className={styles.divSenha}>
                    <span>Senha</span>
                    <input type="password" name="Senha" id="Senha" />                
                    <span>Confirmar Senha</span>
                    <input type="password" name="Confirm-senha" id="Confirm-senha" />
                </div>
                <button>Cadastrar</button>

            </div>

            
        </form>
    );
}