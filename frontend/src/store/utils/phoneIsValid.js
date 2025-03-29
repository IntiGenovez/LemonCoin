const telefoneValido = telefone => {
    const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/
    if (!regexTelefone.test(telefone)) throw new Error('Telefone Não É Válido')
}

export default telefoneValido