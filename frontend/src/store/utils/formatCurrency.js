function formatarValor (valor) {
    if (typeof valor === 'number') {
        valor = valor.toFixed(2)
        valor = valor.toString()
        let centavos = valor.split('.')[1]
        if (!centavos) 
            valor = valor + ',00'
        if (centavos?.length === 1)
            valor = valor + '0'
    }

    // Remove tudo o que não for dígito
    valor = valor.replace(/\D/g, '');

    // Se o valor estiver vazio ou não tiver centavos, adiciona "00" como default
    if (valor.length <= 2) {
        valor = '00' + valor
    }

    let reais = valor.slice(0, -2)
    let centavos = valor.slice(-2)

    if (centavos.length === 1) {
        centavos = '0' + centavos;
    }

    // Se o valor de reais for menor que 100, remove os zeros à esquerda
    reais = reais.replace(/^0+/, '') || '0'; // Remove os zeros à esquerda ou garante que tenha pelo menos 1 dígito

    let valorFormatado = `R$ ${reais},${centavos}`;
    return valorFormatado
}

export default formatarValor