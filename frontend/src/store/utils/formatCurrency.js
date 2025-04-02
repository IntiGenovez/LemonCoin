export const formatarValor = valor => {
    let negativo = false
    if (typeof valor === 'number' && valor < 0) {
        negativo = true;
        valor = Math.abs(valor); // Transforma em positivo para formatação
    }

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

    // Adiciona separador de milhar
    reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    let valorFormatado = `${negativo ? '- ' : ''}R$ ${reais},${centavos}`;
    return valorFormatado
}

export const desformatarValor = valor => {
    return +valor.replace('R$ ', '').replace('.', '').replace(',', '.')
}