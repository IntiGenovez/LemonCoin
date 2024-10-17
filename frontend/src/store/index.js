import { createContext } from "react"

export const initialState = {
    despesas: [],
    contas: [],
    categorias: [],
    usuario: {
        id: null,
        nome: null,
        email: null,
        telefone: null,
        genero: null,
        token: null
    }
}


export const DadosContexto = createContext()