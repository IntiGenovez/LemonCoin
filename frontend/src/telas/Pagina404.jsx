import Cabecalho from '../surface/Cabecalho';
import Rodape from '../surface/Rodape';

import styles from '../estilos/Pagina404.module.css'

export default function Pagina404() {
    return (
        <>
            <Cabecalho />
            <div className={styles.div404}>
                <h1>Erro 404</h1>
                <h2>Pagina não encontrada!!</h2>
            </div>
            <Rodape />
        </>
    );
}