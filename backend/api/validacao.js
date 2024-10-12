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
        if (valor !== 'M' && valor !== 'F') throw msg
    }

    function validarEmail(valor, msg) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regexEmail.test(valor)) throw msg
    }

    function validarTelefone(valor, msg) {
        const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/
        if (!regexTelefone.test(valor)) throw msg
    }

    return { existeOuErro, naoExisteOuErro, igualOuErro, validarGenero, validarEmail, validarTelefone }
}