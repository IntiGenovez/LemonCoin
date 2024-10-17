import usuarioReducer from "./usuario"
import movimentacoesReducer from "./movimentacoes"

export function allReducers(estado, action) {
    return usuarioReducer(estado, action)
        .next(movimentacoesReducer)
        .end()
}