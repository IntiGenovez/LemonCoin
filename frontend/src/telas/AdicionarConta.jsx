import CrudConta from '../componentes/CrudConta'

export default function AdicionarConta({ tipo }){
    return(
        <div className='tela-padrao'><CrudConta tipo={ tipo } /></div>
    )
}