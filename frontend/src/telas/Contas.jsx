import CardConta from '../componentes/CardConta'
import BotaoAdicionar from '../componentes/BotaoAdicionar'

import styles from '../estilos/Contas.module.css'

export default function Contas() {
    return (
        <div className={styles.contas}>
            <div className={styles.container}>
                <CardConta />
                <CardConta />
                <CardConta />
                <CardConta />
                <CardConta />
                <CardConta />
                <CardConta />
                <CardConta />
                <CardConta />
                <CardConta />
                <CardConta />
                <CardConta />
            </div>
            <BotaoAdicionar />
        </div>
    )
}