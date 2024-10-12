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

    return { existeOuErro, naoExisteOuErro, igualOuErro }
}