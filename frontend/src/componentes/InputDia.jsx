
const InputDia = () => {
    const dias = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <select name="Dia-nasc" id="Dia-nasc">
          <option value="">Dia</option>
          {dias.map((dia) => (
            <option key={dia} value={dia}>
              {dia}
            </option>
          ))}
        </select>
      );
};

export default InputDia;