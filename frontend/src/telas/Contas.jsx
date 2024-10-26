import Card from '../componentes/Card'

import styles from '../estilos/Contas.module.css'

export default function Contas() {
    return (
        <div className={styles.contas}>
            <div className={styles.container}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}