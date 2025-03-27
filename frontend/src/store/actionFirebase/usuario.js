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

const senhasValidas = (senha, confirmarSenha) => {
    if (senha.length < 6) throw new Error('A Senha Deve Conter 6 Dígitos')
    if (senha !== confirmarSenha) throw new Error('Senhas Diferentes')
}

const userActions = {
    ouvirMovimentacoes: dispatch => {
        return firebase.subscribeMoviments(dispatch)
    },
    ouvirContas: dispatch => {
        return firebase.subscribeAccounts(dispatch)
    },
    ouvirCategorias: dispatch => {
        return firebase.subscribeCategories(dispatch)
    },
    obterDadosUsuario: async (dispatch) => {
        try {
            const data = await firebase.getUserData()
            if (!data) return
            dispatch({ type: 'signin', payload: data })

            userActions.ouvirMovimentacoes(dispatch)
            userActions.ouvirContas(dispatch)
            userActions.ouvirCategorias(dispatch)
        } catch (error) {
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: 'warning', titulo: 'Atenção!', link: '/contas' } })
            console.error('Erro no cadastro: ', error.code || error.message)
            return false
        }
    },
    signup: async (dispatch, usuario) => {
        try {
            objetoValido(usuario)
            emailValido(usuario.email)
            telefoneValido(usuario.telefone)
            senhasValidas(usuario.senha, usuario.confirmarSenha)
            usuario.dataNascimento = new Date(usuario.dataNascimento)
            await firebase.signUpUser(usuario)
            const cadastroUsuario = { ...usuario }
            delete cadastroUsuario.senha
            delete cadastroUsuario.confirmarSenha

            dispatch({ type: 'signin', payload: cadastroUsuario })
            dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Cadastro Realizado com Sucesso', tipo: 'success', titulo: 'Cadastrado!', link: '/home' } })
            return true
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') error.message = 'Esse endereço de email já foi utilizado'
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

            userActions.ouvirMovimentacoes(dispatch)
            userActions.ouvirContas(dispatch)
            userActions.ouvirCategorias(dispatch)
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
    recuperarSenha: async (dispatch, usuario) => {
        try {
            await firebase.resetPassword(usuario.email)
            return true
        } catch (error) {
            dispatch({ type: 'exibirMensagem', payload: { mensagem: error.message, tipo: 'warning', titulo: 'Atenção!', link: '/login' } })
            console.error('Erro ao recuperar senha: ', error)
            return false
        }
    },
    atualizarSenha: async (dispatch, oobCode, novaSenha, confirmarNovaSenha) => {
        try {
            senhasValidas(novaSenha, confirmarNovaSenha)
            await firebase.updatePassword(oobCode, novaSenha)
            dispatch({ type: 'exibirMensagem', payload: { mensagem: 'Senha alterada', tipo: 'success', titulo: 'Senha alterada!', link: '/login' } })
            return true
        } catch (error) {
            console.error('Erro ao recuperar senha: ', error)
            return false
        }
    }   
}

export default userActions