import { useState } from "react";

export default function InputDia ({ valor, onChange }) {
    const dias = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
      <input 
        type="date" name="" id="" 
        onChange={ e => onChange(e.target.value) }
        value={valor}
      />
      );
};