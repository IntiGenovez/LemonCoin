import { useState } from 'react';
import InputDia from '../componentes/InputDia';
import InputMes from '../componentes/InputMes';
import InputAno from '../componentes/InputAno'

import Styles from "../estilos/Cadastro.module.css"

export default function Cadastro(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')

    function tratarInput(setVariavel, e) {
        setVariavel(e.target.value)
    }

    return (
        <form className={Styles.formulario}>
            <h1>CADASTRE-SE AQUI</h1>
            <input type="text" value={ nome } placeholder='Nome Completo: ' onChange={ e => tratarInput(setNome, e) } />
            <input type="text" value={ email } placeholder='Email: ' onChange={ e => tratarInput(setEmail, e) } />
            <input type="text" value={ telefone } placeholder='Telefone: ' onChange={ e => tratarInput(setTelefone, e) }/>
            <br />

            <div>
                <span>Data de Nascimento: </span>
                <br />
                <InputDia />
                <InputMes />
                <InputAno />

            </div>
            <div>
                <span>Gênero</span>
                <br />
                <span>F <input type='radio' name='Genero' id='GeneroM'></input></span>
                <span>M <input type='radio' name='Genero' id='GeneroF'></input></span>
                <br />
                <div>
                    <span>Senha</span>
                    <input type="text" name="Senha" id="Senha" />                
                    <span>Confirmar Senha</span>
                    <input type="text" name="Confirm-senha" id="Confirm-senha" />
                </div>
                <button>Cadastrar</button>

            </div>

            
        </form>
    );
}