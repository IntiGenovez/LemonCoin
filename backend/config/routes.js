module.exports = app => {
    app.route('/usuarios')
        .post(app.api.usuario.salvar)
        .get(app.api.usuario.obter)

    app.route('/usuarios/:id')
        .put(app.api.usuario.salvar)
        .get(app.api.usuario.obterPorId)

    app.route('/movimentacoes')
        .post(app.api.movimentacao.salvar)
        
    app.route('/contas')
        .post(app.api.conta.salvar)
    
    app.route('/categorias')
        .post(app.api.categoria.salvar)
}