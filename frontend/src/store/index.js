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
    },
    mensagemErro: {
        mensagem: '',
        openDialog: false,
        tipo: '',
        link: '',
        titulo: ''
    }
}


export const DadosContexto = createContext()