export default function InputNomeConta({ valor, change }){
    return(
        <select name="nomeConta" id="nomeConta" onChange={change} value={valor.nome}>
            <option value="">Conta</option>
            <option value="banco_do_brasil">Banco do Brasil</option>
            <option value="bradesco">Bradesco</option>
            <option value="caixa">Caixa</option>
            <option value="inter">Inter</option>
            <option value="itau">Itaú</option>
            <option value="mercado_pago">Mercado Pago</option>
            <option value="nubank">Nubank</option>
            <option value="picpay">PicPay</option>
            <option value="santander">Santander</option>
            <option value="sicredi">Sicredi</option>
            <option value="stone">Stone</option>
            <option value="wise">Wise</option>
        </select>
    )
}