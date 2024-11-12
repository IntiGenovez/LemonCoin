export default function InputMes ({ valor, onChange }) {

    return (
      <select name="Mes-nasc" id="Mes-nasc" value={ valor } onChange={ e => onChange(e.target.value) } >
      <option value="">Mês</option>
      <option value="1">Janeiro</option>
      <option value="2">Fevereiro</option>
      <option value="3">Março</option>
      <option value="4">Abril</option>
      <option value="5">Maio</option>
      <option value="6">Junho</option>
      <option value="7">Julho</option>
      <option value="8">Agosto</option>
      <option value="9">Setembro</option>
      <option value="10">Outubro</option>
      <option value="11">Novembro</option>
      <option value="12">Dezembro</option>
  </select>
      );
};