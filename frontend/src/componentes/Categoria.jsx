import lapis from '../assets/lapis.png'
import lixeira from '../assets/lixeira.png'
import styles from '../estilos/Categoria.module.css'

export default function Categoria({nome, saldo}){

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