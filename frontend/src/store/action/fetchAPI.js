import { urlBaseAPI, userKey } from "../../global.js"

export const getToken = () => {
    const storedUser = JSON.parse(localStorage.getItem(userKey))
    return storedUser?.token || null
}

export const handleError = (dispatch, error, link) => {
    console.error(error.message)
    dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, titulo: 'ATENçÃO', link } })
}

export const fetchAPI = async (endpoint, method = "GET", body = null) => {
    const token = getToken()
    if (!token) {
        throw new Error("Token não encontrado")
    }

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    if (body) options.body = JSON.stringify(body)

    const response = await fetch(`${urlBaseAPI}/${endpoint}`, options)

    const contentType = response.headers.get("content-type")
    const data = contentType?.includes("application/json") 
        ? await response.json() 
        : await response.text()

    if (!response.ok) {
        if (response.status === 500) {
            throw new Error("Estamos enfrentando problemas no momento, tente novamente mais tarde!")
        }
        throw new Error(`Erro ${response.status}: ${data}`)
    }

    return data
}
