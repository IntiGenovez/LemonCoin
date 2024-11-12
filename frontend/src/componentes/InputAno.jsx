export default function  InputAno ({ valor, onChange }) {
  const anoAtual = new Date().getFullYear(); // Obtém o ano atual
  const anos = Array.from({ length: 100 }, (_, i) => anoAtual - i); // Gera os últimos 100 anos

  return (
    <select name="Ano-nasc" id="Ano-nasc" value={ valor } onChange={ e => onChange(e.target.value) }>
      <option value="">Ano</option>
      {anos.map((ano) => (
        <option key={ano} value={ano}>
          {ano}
        </option>
      ))}
    </select>
  );
};