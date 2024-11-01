import Categoria from '../componentes/categoria'
import BotaoAdicionar from '../componentes/BotaoAdicionar'

import styles from '../estilos/Categorias.module.css'

export default function Categorias() {
    return (
        <div className='tela-padrao'>
            
            <div className={styles.container}>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <Categoria/>
                <BotaoAdicionar />
            </div>
            
        </div>
    )
}