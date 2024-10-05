import { useState } from 'react';
import SelectDia from '../componentes/SelectDia';
import SelectAno from '../componentes/SelectAno'

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
                <SelectDia />

                <select name="Mes-nasc" id="Mes-nasc">
                    <option value="">Mês</option>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>

                <SelectAno />

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