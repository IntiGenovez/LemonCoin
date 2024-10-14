//importações do React
import  {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { useReducer } from "react"
import { DadosContexto, reducer, initialState } from "./store/index.js"

//importações de telas
import Layout from "./telas/Layout"
import Apresentacao from "./telas/Apresentacao"
import Despesas from "./telas/Despesas"
import Receitas from "./telas/Receitas"
import Categorias from "./telas/Categorias"
import Contas from "./telas/Contas"
import Relatorios from "./telas/Relatorios"
import Pagina404 from "./telas/Pagina404"
import Login from "./telas/Login"
import Cadastro from "./telas/Cadastro.jsx"
import AdicionarDespesa from "./telas/AdicionarDespesa.jsx"
import AdicionarReceita from "./telas/AdicionarReceita.jsx"
import AdicionarConta from "./telas/AdicionarConta.jsx"

import "./App.css"

import urlBaseAPI from "./global.js"

function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  async function obterDados() {
    
  }

  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      errorElement: <Pagina404 />,
      children: [
        {
          index: true,
          Component: Apresentacao
        },
        {
          path: '/despesas',
          Component: Despesas
        },
        {
          path: '/receitas',
          Component: Receitas
        },
        {
          path: '/categorias',
          Component: Categorias
        },
        {
          path: '/contas',
          Component: Contas
        },
        {
          path: '/relatorios',
          Component: Relatorios
        },
        {
          path: '/login',
          Component: Login
        },
        {
          path: '/cadastro',
          Component: Cadastro
        },
        {
          path: '/adicionar-receita',
          Component: AdicionarReceita
        },
        {
          path: '/adicionar-despesa',
          Component: AdicionarDespesa
        },
        {
          path: '/adicionar-conta',
          Component: AdicionarConta
        }
      ]
    }
  ])

  return (
    <DadosContexto.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </DadosContexto.Provider>
  )
}

export default App
