const jaExiste = (estado, novoValor) => {
    estado.categorias.forEach(categoria => {
        if (categoria.nome.toLowerCase() === novoValor.toLowerCase()) {
            throw new Error(`Categoria "${novoValor}" já existe!`)
        }
    })
    estado.contas.forEach(conta => {
        if (conta.nome.toLowerCase() === novoValor.toLowerCase()) {
            throw new Error(`Conta "${novoValor}" já existe!`)
        }
    })
}

export default jaExiste