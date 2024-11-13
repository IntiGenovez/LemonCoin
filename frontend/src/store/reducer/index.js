import usuarioReducer from "./usuario"
import movimentacoesReducer from "./movimentacoes"
import contasReducer from "./contas"

export function allReducers(estado, action) {
    return usuarioReducer(estado, action)
        .next(movimentacoesReducer)
        .next(contasReducer)
        .end()
}