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
import adicionarReceita from "./telas/AdicionarReceita.jsx"

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
          Component: adicionarReceita
        },
        {
          path: '/adicionar-despesa',
          Component: AdicionarDespesa
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
