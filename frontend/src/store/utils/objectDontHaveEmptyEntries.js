const objetoValido = objeto => {
    for (const valor of Object.values(objeto)) {
        if (!valor && valor !== 0) throw new Error('Preencha Todos Os Campos', { cause: 'warning' })
    }
}

export default objetoValido