import usuarioReducer from "./usuario"
import movimentacoesReducer from "./movimentacoes"
import contasReducer from "./contas"
import categoriasReducer from "./categorias"
import mensagemErroReducer from "./mensagemErro"

export function allReducers(estado, action) {
    return usuarioReducer(estado, action)
        .next(movimentacoesReducer)
        .next(contasReducer)
        .next(categoriasReducer)
        .next(mensagemErroReducer)
        .end()
}