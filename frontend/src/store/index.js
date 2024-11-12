import { createContext } from "react"

export const initialState = {
    movimentacoes: [],
    contas: [],
    categorias: [],
    usuario: {
        id: null,
        nome: '',
        email: '',
        telefone: '',
        genero: '',
        token: null
    }
}


export const DadosContexto = createContext()