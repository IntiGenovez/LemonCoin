import { createContext } from "react"

export const despesas = [
    {
        id: 1,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 2,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 3,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 4,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 2,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 3,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 4,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 2,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 3,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 4,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 2,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 3,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 4,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 2,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 3,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 4,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 2,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 3,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 4,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 2,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 3,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 4,
        descricao: "Mercado",
        categoria: "Alimentação",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    }
]

export const receitas = [
    {
        id: 1,
        descricao: "Salário",
        categoria: "Trabalho",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 2,
        descricao: "Salário",
        categoria: "Trabalho",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 3,
        descricao: "Salário",
        categoria: "Trabalho",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    },
    {
        id: 4,
        descricao: "Salário",
        categoria: "Trabalho",
        valor: 1000,
        data: "31/10/2002",
        conta: "Bradesco"
    }
]

export const initialState = {
    seletor: ''
  }

export function reducer(state, action) {
    switch(action.type) {
        case 'mudarSeletor':
            return {seletor: action.payload.seletor}
            break
        default:
            return state
    }
}



export const DadosContexto = createContext()