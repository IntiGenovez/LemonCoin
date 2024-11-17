function categoriasReducer(estado, action) {
    let novoEstado
    switch (action.type) {
        case 'obterCategorias':
            novoEstado = { ...estado, categorias: action.payload.categorias }
            break
        case 'adicionarCategoria':
            const novaCategoria = { ...action.payload.categoria, id: action.payload.id }
            novoEstado = { ...estado, categorias: [ ...estado.categorias, novaCategoria ]}
            break
        case 'atualizarCategoria':
            novoEstado = { ...estado, categorias: estado.categorias.map(categoria => {
                    return categoria.id === action.payload.categoria.id ? action.payload.categoria : categoria
                }) 
            }
            break
        case 'deletarCategoria':
            novoEstado = { ...estado, categorias: estado.categorias.filter(categoria => {
                    return categoria.id !== action.payload.categoria.id
                }) 
            }
            break
        default:
            novoEstado = estado      
    }

    return {
        next: nextReducer => nextReducer(novoEstado, action),
        end: () => novoEstado
    }
}

export default categoriasReducer