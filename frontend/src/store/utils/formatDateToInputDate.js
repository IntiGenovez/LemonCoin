function formatDateToInputDate (hoje, data) {
    let dataFormatada
    if(hoje) dataFormatada = new Date()
    else dataFormatada = data
    dataFormatada = dataFormatada.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).toString()
    let dia = dataFormatada.split('/')[1]
    let mes = dataFormatada.split('/')[0]
    let ano = dataFormatada.split(',')[0].split('/')[2]
    if (dia.length === 1) dia = '0' + dia
    if (mes.length === 1) mes = '0' + mes
    return `${ano}-${mes}-${dia}`
}

export default formatDateToInputDate