export default function InputNomeConta({ valor, onChange }){
    return(
        <select name='nomeConta' id='nomeConta' onChange={onChange} value={valor}>
            <option value=''>Conta</option>
            <option value='Banco do Brasil'>Banco do Brasil</option>
            <option value='Bradesco'>Bradesco</option>
            <option value='Caixa'>Caixa</option>
            <option value='Inter'>Inter</option>
            <option value='Itaú'>Itaú</option>
            <option value='Mercado Pago'>Mercado Pago</option>
            <option value='Nubank'>Nubank</option>
            <option value='PicPay'>PicPay</option>
            <option value='Santander'>Santander</option>
            <option value='Sicredi'>Sicredi</option>
            <option value='Stone'>Stone</option>
            <option value='Wise'>Wise</option>
        </select>
    )
}