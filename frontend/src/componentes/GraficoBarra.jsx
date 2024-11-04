import styles from '../estilos/GraficoBarra.module.css'
import graficoProvisorio from '../assets/graficoProvisorio.png'


export default function GraficoBarra(){
    return (
        <div className={styles.fundo}>
            <img src={graficoProvisorio} alt="Grafico" width="100%" />
        </div>
    )
}