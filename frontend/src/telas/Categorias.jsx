import Categoria from '../componentes/categoria'
import BotaoAdicionar from '../componentes/BotaoAdicionar'

import styles from '../estilos/Categorias.module.css'

export default function Categorias() {
    return (
        <div className='tela-padrao'>
            <div className={styles.container}>
                <Categoria nome="alimentação" saldo="R$ 500,00"/>
                <Categoria nome="moradia" saldo="R$ 800,00"/>
                <Categoria nome="transporte" saldo="R$ 300,00"/>
                <Categoria nome="educação" saldo="R$ 400,00"/>
                <Categoria nome="saúde" saldo="R$ 600,00"/>
                <Categoria nome="lazer" saldo="R$ 250,00"/>
                <Categoria nome="vestuário" saldo="R$ 150,00"/>
                <Categoria nome="serviços" saldo="R$ 350,00"/>
                <Categoria nome="investimentos" saldo="R$ 1.000,00"/>
                <Categoria nome="emergências" saldo="R$ 450,00"/>
                <BotaoAdicionar />
            </div>
            
        </div>
    )
}