const jaExiste = (estado, novoValor, tipo) => {
    if (tipo === 'categoria')
        estado.categorias.forEach(categoria => {
            if (categoria.nome.toLowerCase() === novoValor.toLowerCase()) {
                throw new Error(`Categoria "${novoValor}" já existe!`)
            }
        })
    if (tipo === 'conta')
        estado.contas.forEach(conta => {
            if (conta.nome.toLowerCase() === novoValor.toLowerCase()) {
                throw new Error(`Conta "${novoValor}" já existe!`)
            }
        })
}

export default jaExiste