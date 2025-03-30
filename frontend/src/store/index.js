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
    },
    mensagemErro: {
        mensagem: '',
        openDialog: false,
        tipo: '',
        link: '',
        titulo: ''
    },
    historico: ['/home'],
    loading: true
}


export const DadosContexto = createContext()