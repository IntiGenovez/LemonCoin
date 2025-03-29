const senhasValidas = (senha, confirmarSenha) => {
    if (senha.length < 6) throw new Error('A Senha Deve Conter 6 Dígitos')
    if (senha !== confirmarSenha) throw new Error('Senhas Diferentes')
}

export default senhasValidas