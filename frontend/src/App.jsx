//importações do React
import  {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

//importações de telas
import Layout from "./telas/Layout"
import Pagina404 from "./telas/Pagina404"

import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      errorElement: <Pagina404 />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
