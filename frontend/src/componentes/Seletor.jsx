import styles from '../estilos/Movimentacoes.module.css'

export default function Seletor({ nome, isAtivo, isUp, setAtivo, setFiltroOpen }) {
    return (
        <>
        {
            nome !== 'Filtro' ?
            (<div onClick={() => setAtivo(nome)}>
                <label>{ nome }</label>
                <i className={`bx ${isUp ? 'bx-chevron-up' : 'bx-chevron-down'} ${isAtivo ? styles.selecionado : ''}`}></i>  
            </div>)
            :
            (<div>
                <i className='bx bx-filter-alt' onClick={ setFiltroOpen }></i>
            </div>)
        }
        </>
    )
}
