//importações do React
import  {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { useEffect, useReducer } from "react"
import { DadosContexto, initialState } from "./store"
import { allReducers } from "./store/reducer"

//importações de telas
import Layout from "./telas/Layout"
import Apresentacao from "./telas/Apresentacao"
import TelaMovimentacoes from "./telas/TelaMovimentacoes.jsx"
import Categorias from "./telas/Categorias"
import Contas from "./telas/Contas"
import Relatorios from "./telas/Relatorios"
import Pagina404 from "./telas/Pagina404"
import Login from "./telas/Login"
import RecuperarSenha from "./telas/RecuperarSenha"
import Cadastro from "./telas/Cadastro.jsx"
import TelaAdicionarMovimentacao from "./telas/TelaAdicionarMovimentacao.jsx"
import AdicionarConta from "./telas/AdicionarConta.jsx"

import ComponentePrivado from "./componentes/ComponentePrivado.jsx"

import "./App.css"

function App() {
  const [ state, dispatch ] = useReducer(allReducers, initialState)


  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      errorElement: <Pagina404 />,
      children: [
        {
          index: true,
          element: <Apresentacao />
        },
        {
          path: '/despesas',
          element:<ComponentePrivado><TelaMovimentacoes tipo='Despesa' /></ComponentePrivado> 
        },
        {
          path: '/receitas',
          element:<ComponentePrivado><TelaMovimentacoes tipo='Receita' /></ComponentePrivado> 
        },
        {
          path: '/categorias',
          element:<ComponentePrivado><Categorias /></ComponentePrivado> 
        },
        {
          path: '/contas',
          element:<ComponentePrivado><Contas /></ComponentePrivado> 
        },
        {
          path: '/relatorios',
          element:<ComponentePrivado><Relatorios /></ComponentePrivado> 
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/cadastro',
          element: <Cadastro />
        },
        {
          path: '/recuperar-senha',
          element: <RecuperarSenha />
        },
        {
          path: '/adicionar-receita',
          element: <ComponentePrivado><TelaAdicionarMovimentacao tipo='Receita' /></ComponentePrivado>
        },
        {
          path: '/adicionar-despesa',
          element: <ComponentePrivado><TelaAdicionarMovimentacao tipo='Despesa' /></ComponentePrivado>
        },
        {
          path: '/adicionar-conta',
          element: <ComponentePrivado><AdicionarConta tipo="Adicionar" /></ComponentePrivado>
        },
        {
          path: '/editar-conta/:id',
          element: <ComponentePrivado><AdicionarConta tipo='Atualizar' /></ComponentePrivado>
        },
        {
          path: '/editar-conta',
          element: <ComponentePrivado><AdicionarConta tipo='Atualizar' /></ComponentePrivado>
        },
        {
          path: '/home',
          element: <Apresentacao />
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
