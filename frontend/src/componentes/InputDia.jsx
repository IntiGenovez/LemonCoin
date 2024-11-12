import { useState } from "react";

export default function InputDia ({ valor, onChange }) {
    const dias = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <select name="Dia-nasc" id="Dia-nasc" value={ valor } onChange={ e => onChange(e.target.value) }>
          <option value="">Dia</option>
          {dias.map((dia) => (
            <option key={dia} value={dia}>
              {dia}
            </option>
          ))}
        </select>
      );
};