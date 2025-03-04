module.exports = app => {
    function existeOuErro(valor, msg) {
        if (!valor) throw msg
        if (Array.isArray(valor) && valor.length === 0) throw msg
        if (typeof valor === 'string' && !valor.trim()) throw msg
    }
    
    function naoExisteOuErro(valor, msg) {
        try {
            existeOuErro(valor, msg)
        } catch {
            return
        }
        throw msg
    }
    
    function igualOuErro(valorA, valorB, msg) {
        if (valorA !== valorB) throw msg
    }

    function validarGenero(valor, msg) {
        if (valor !== 'M' && valor !== 'F' && valor !== 'O') throw msg
    }

    function validarEmail(valor, msg) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regexEmail.test(valor)) throw msg
    }

    function validarTelefone(valor, msg) {
        const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/
        if (!regexTelefone.test(valor)) throw msg
    }

    function validarData(valor, msg) {
        const regexData = /^\d{2}\/\d{2}\/\d{4}$/
        if (!regexData.test(valor)) throw msg

        const partesData = valor.split('-')
        
        const ano = parseInt(partesData[0])
        const mes = parseInt(partesData[1])
        const dia = parseInt(partesData[2])

        const diasNoMes = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        if (ano % 400 === 0 || ano % 4 === 0 && ano % 100 !== 0) {
            diasNoMes[2] = 29
        }

        if (mes < 1 || mes > 12 || dia < 1) throw msg
        if (dia > diasNoMes[mes]) throw msg

        const horario = valor.split(' ')
        const partesHorario = horario[1].split(':')

        const hora = parseInt(partesHorario[0])
        const minuto = parseInt(partesHorario[1])
        const segundo = parseInt(partesHorario[2])

        if (hora < 0 || hora > 23) throw msg
        if (minuto < 0 || minuto > 59) throw msg
        if (segundo < 0 || segundo > 59) throw msg
    }

    return { existeOuErro, naoExisteOuErro, igualOuErro, validarGenero, validarEmail, validarTelefone, validarData }
}