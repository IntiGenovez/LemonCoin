import usuarioReducer from "./usuario"
import movimentacoesReducer from "./movimentacoes"
import contasReducer from "./contas"
import categoriasReducer from "./categorias"
import mensagemErroReducer from "./mensagemErro"
import historicoReducer from "./historico"

export function allReducers(estado, action) {
    return usuarioReducer(estado, action)
        .next(movimentacoesReducer)
        .next(contasReducer)
        .next(categoriasReducer)
        .next(mensagemErroReducer)
        .next(historicoReducer)
        .end()
}