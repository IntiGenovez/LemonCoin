import styles from "../estilos/Movimentacoes.module.css"

export default function Movimentacao({ tipo, data, categoria, valor, descricao, conta }) {
    valor = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    return (
        <li className={ styles.movimentacao }>
            <span>{ data }</span>
            <span>{ descricao }</span>
            <span>{ valor }</span>
            <span>{ categoria }</span>
            <span>{ conta }</span>
            <span><i class='bx bx-edit-alt' ></i><i class='bx bx-trash' ></i></span>
        </li>
    )
}