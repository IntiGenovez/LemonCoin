import { createContext } from "react"

export const initialState = {
    despesas: 
    
    
  }

export function reducer(state, action) {
    switch(action.type) {
        case 'ordenarDespesas':
            console.log(action.payload.invertido)
            if (action.payload.invertido) {
                return { ...state, despesas: state.despesas.sort((a, b) => b[action.payload.seletorOrdenador] <= a[action.payload.seletorOrdenador] ? -1 : 1 ) }
            } else {
                return { ...state, despesas: state.despesas.sort((a, b) => a[action.payload.seletorOrdenador] <= b[action.payload.seletorOrdenador] ? -1 : 1 ) }
            }
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