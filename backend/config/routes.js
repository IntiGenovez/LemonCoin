module.exports = app => {
/************* ENDPOINTS DE USUARIOS *************/

    app.route('/usuarios')
        .post(app.api.usuario.salvar)
        .get(app.api.usuario.obter)

    app.route('/usuarios/:id')
        .put(app.api.usuario.salvar)
        .get(app.api.usuario.obterPorId)
        

/************* ENDPOINTS DE CONTAS *************/

    app.route('/contas')
        .post(app.api.conta.salvar)
        .get(app.api.conta.obter)

    app.route('/contas/:id')
        .put(app.api.conta.salvar)
        .delete(app.api.categoria.deletar)


/************* ENDPOINTS DE CATEGORIAS *************/
    
    app.route('/categorias')
        .post(app.api.categoria.salvar)
        .get(app.api.categoria.obter)

    app.route('/categoria/:id')
        .put(app.api.categoria.salvar)
        .delete(app.api.categoria.deletar)


/************* ENDPOINTS DE MOVIMENTAÇÕES *************/

    app.route('/movimentacoes')
        .post(app.api.movimentacao.salvar)
        .get(app.api.movimentacao.obter)

    app.route('/movimentacoes/:id')
        .put(app.api.movimentacao.salvar)
        .delete(app.api.movimentacao.deletar)

    app.route('/:usuarioId/movimentacoes')
        .get(app.api.movimentacao.obterPorIddoUsuario)
}