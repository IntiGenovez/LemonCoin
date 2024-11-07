import { createContext } from "react"

export const initialState = {
    despesas: [],
    contas: [],
    categorias: [],
    usuario: {
        id: null,
        nome: '',
        email: '',
        telefone: '',
        genero: '',
        token: ''
    }
}


export const DadosContexto = createContext()