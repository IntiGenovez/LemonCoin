import { createContext } from "react"

export const initialState = {
    seletor: '',
    despesas: [
        {
            id: 1,
            descricao: "Supermercado A",
            categoria: "Alimentação",
            valor: 250,
            data: "01/09/2023",
            conta: "Itaú"
        },
        {
            id: 2,
            descricao: "Supermercado B",
            categoria: "Alimentação",
            valor: 150,
            data: "02/09/2023",
            conta: "Caixa"
        },
        {
            id: 3,
            descricao: "Feira Livre",
            categoria: "Alimentação",
            valor: 80,
            data: "03/09/2023",
            conta: "Santander"
        },
        {
            id: 4,
            descricao: "Restaurante C",
            categoria: "Alimentação",
            valor: 200,
            data: "04/09/2023",
            conta: "Bradesco"
        },
        {
            id: 5,
            descricao: "Mercado D",
            categoria: "Alimentação",
            valor: 300,
            data: "05/09/2023",
            conta: "Bradesco"
        },
        {
            id: 6,
            descricao: "Padaria E",
            categoria: "Alimentação",
            valor: 50,
            data: "06/09/2023",
            conta: "Itaú"
        },
        {
            id: 7,
            descricao: "Farmácia F",
            categoria: "Saúde",
            valor: 120,
            data: "07/09/2023",
            conta: "Caixa"
        },
        {
            id: 8,
            descricao: "Mercado G",
            categoria: "Alimentação",
            valor: 400,
            data: "08/09/2023",
            conta: "Santander"
        },
        {
            id: 9,
            descricao: "Mercado H",
            categoria: "Alimentação",
            valor: 600,
            data: "09/09/2023",
            conta: "Bradesco"
        },
        {
            id: 10,
            descricao: "Café I",
            categoria: "Alimentação",
            valor: 30,
            data: "10/09/2023",
            conta: "Itaú"
        },
        {
            id: 11,
            descricao: "Mercado J",
            categoria: "Alimentação",
            valor: 350,
            data: "11/09/2023",
            conta: "Caixa"
        },
        {
            id: 12,
            descricao: "Mercado K",
            categoria: "Alimentação",
            valor: 450,
            data: "12/09/2023",
            conta: "Santander"
        },
        {
            id: 13,
            descricao: "Supermercado L",
            categoria: "Alimentação",
            valor: 700,
            data: "13/09/2023",
            conta: "Bradesco"
        },
        {
            id: 14,
            descricao: "Almoço M",
            categoria: "Alimentação",
            valor: 90,
            data: "14/09/2023",
            conta: "Itaú"
        },
        {
            id: 15,
            descricao: "Jantar N",
            categoria: "Alimentação",
            valor: 120,
            data: "15/09/2023",
            conta: "Caixa"
        },
        {
            id: 16,
            descricao: "Mercado O",
            categoria: "Alimentação",
            valor: 500,
            data: "16/09/2023",
            conta: "Santander"
        },
        {
            id: 17,
            descricao: "Café da manhã P",
            categoria: "Alimentação",
            valor: 40,
            data: "17/09/2023",
            conta: "Bradesco"
        },
        {
            id: 18,
            descricao: "Lanches Q",
            categoria: "Alimentação",
            valor: 75,
            data: "18/09/2023",
            conta: "Itaú"
        },
        {
            id: 19,
            descricao: "Churrasco R",
            categoria: "Alimentação",
            valor: 300,
            data: "19/09/2023",
            conta: "Caixa"
        },
        {
            id: 20,
            descricao: "Sorvete S",
            categoria: "Alimentação",
            valor: 60,
            data: "20/09/2023",
            conta: "Santander"
        }
    ]
    
    
  }

export function reducer(state, action) {
    switch(action.type) {
        case 'removerDespesa':
            return { ...state, despesas: state.despesas.filter(despesa => despesa.id !== action.payload.id) }
        case 'atualizarDespesa':
            return { ...state, despesas: state.despesas.map(despesa => 
                despesa.id === action.payload.despesa.id ? 
                    action.payload.despesa :
                    despesa
                )}
        default:
            return state
    }
}



export const DadosContexto = createContext()