const emailValido = email => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(email)) throw new Error('Email Inválido')
}

export default emailValido