import usuarioReducer from "./usuario"
import movimentacoesReducer from "./movimentacoes"
import contasReducer from "./contas"
import categoriasReducer from "./categorias"

export function allReducers(estado, action) {
    return usuarioReducer(estado, action)
        .next(movimentacoesReducer)
        .next(contasReducer)
        .next(categoriasReducer)
        .end()
}