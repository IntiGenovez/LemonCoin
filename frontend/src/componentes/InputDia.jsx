export default function InputDia ({ valor, onChange }) {
  return (
      <input
        type="date"
        onChange={ e => onChange(e.target.value) }
        value={valor}
      />
    )
}