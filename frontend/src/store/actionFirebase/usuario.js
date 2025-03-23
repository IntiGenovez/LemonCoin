import firebase from './firebase'
const emailValido = email => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(email)) throw new Error('Email Inválido')
}

const telefoneValido = telefone => {
        const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/
        if (!regexTelefone.test(telefone)) throw new Error('Telefone Não É Válido')
}

const objetoValido = objeto => {
    for (const valor of Object.values(objeto)) {
        if (!valor) throw new Error('Preencha Todos Os Campos')
    }
}

const senhasValidas = usuario => {
    if (usuario.senha.length < 6) throw new Error('A Senha Deve Conter 6 Dígitos')
    if (usuario.senha !== usuario.confirmarSenha) throw new Error('Senhas Diferentes')
}

const userActions = {
    obterDadosUsuario: async (dispatch) => {
        try {
            const usuario = await firebase.getUserData()
            if (!usuario) return
            dispatch({ type: 'signin', payload: usuario })
        } catch (error) {
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: 'warning', titulo: 'Atenção!', link: '/cadastro' } })
            console.error('Erro no cadastro: ', error.code || error.message)
            return false
        }
    },
    signup: async (dispatch, usuario) => {
        try {
            objetoValido(usuario)
            emailValido(usuario.email)
            telefoneValido(usuario.telefone)
            senhasValidas(usuario)
            await firebase.signUpUser(usuario)
            delete usuario.senha
            delete usuario.confirmarSenha

            dispatch({ type: 'signin', payload: usuario })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Cadastro Realizado com Sucesso', tipo: 'success', titulo: 'Cadastrado!', link: '/home' } })
            return true
        } catch (error) {
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: 'warning', titulo: 'Atenção!', link: '/cadastro' } })
            console.error('Erro no cadastro: ', error.code || error.message)
            return false
        }
    },
    signin: async (dispatch, usuario) => {
        try {
            objetoValido(usuario)
            const data = await firebase.signInUser(usuario.email, usuario.senha)
            dispatch({ type: 'signin', payload: data })
            return true
        } catch (error) {
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: 'warning', titulo: 'Atenção!', link: '/login' } })
            console.error('Erro no login: ', error)
            return false
        }
    },
    signout: async (dispatch) => {
        await firebase.signOutUser()
        dispatch({ type: 'signout' })
    },
    recuperarSenhaPedido: async (dispatch, usuario) => {
        try {
            await firebase.resetPassword(usuario.email)
            return true
        } catch (error) {
            console.error('Erro ao recuperar senha: ', error)
            return false
        }
    },
    recuperarSenha: async (dispatch, token, novaSenha, confirmarNovaSenha) => {
        try {
            const response = await fetch(`${urlBaseAPI}/recuperarsenha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, novaSenha, confirmarNovaSenha })
            })
            const contentType = response.headers.get('content-type')
            let data;
    
            if (contentType && contentType.includes('application/json')) {
                data = await response.json() // Lê como JSON
            } else {
                data = await response.text() // Lê como texto
            }

            console.log('Resposta da API: ', response.status, response.statusText)
            console.log('Dados retornados pela API: ', data)

            if (!response.ok) {
                throw new Error(data || 'Erro ao recuperar senha')
            }

            dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Senha alterada', tipo: 'success', titulo: 'Senha alterada!', link: '/login' } })
            return true
        } catch (error) {
            console.error('Erro ao recuperar senha: ', error)
            return false
        }
    }   
}

export default userActions