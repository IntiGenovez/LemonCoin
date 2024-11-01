import lapis from '../assets/lapis.png'
import lixeira from '../assets/lixeira.png'
import styles from '../estilos/Categoria.module.css'

export default function Categoria(){

    let nome = "Alimentação"
    let saldo = "R$ 1000,00"
    return (
        <>
            <div className={styles.item}>
                {nome}
                <div style={{display: 'flex', gap: '10px'}}>
                    {saldo}
                    <img src={lapis} alt="editar" className={styles.icone}/>
                    <img src={lixeira} alt="apagar" className={styles.icone}/>
                </div>
            </div>
        </>
    )
}