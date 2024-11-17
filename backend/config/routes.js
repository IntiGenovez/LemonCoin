module.exports = app => {
    /************* ENDPOINTS DE USUARIOS *************/
    //esses endpoints não passam pela validação de token, são os únicos endpoints públicos

    app.post('/signup', app.api.usuario.salvar)
    app.post('/signin', app.api.autenticacao.signin)
    app.post('/validartoken', app.api.autenticacao.validarToken)


    /************* ENDPOINTS DE USUARIOS *************/

    app.route('/usuarios')
        .all(app.config.passport.autenticador())
        .post(app.api.usuario.salvar)
        .get(app.api.usuario.obter)

    app.route('/usuarios/:id')
        .all(app.config.passport.autenticador())
        .put(app.api.usuario.salvar)
        .get(app.api.usuario.obterPorId)


    /************* ENDPOINTS DE CONTAS *************/

    app.route('/contas')
        .all(app.config.passport.autenticador())
        .post(app.api.conta.salvar)
        .get(app.api.conta.obterPorId)

    app.route('/contas/:id')
        .all(app.config.passport.autenticador())
        .put(app.api.conta.salvar)
        .delete(app.api.conta.deletar)


    /************* ENDPOINTS DE CATEGORIAS *************/

    app.route('/categorias')
        .all(app.config.passport.autenticador())
        .post(app.api.categoria.salvar)
        .get(app.api.categoria.obter)

    app.route('/categorias/:id')
        .all(app.config.passport.autenticador())
        .put(app.api.categoria.salvar)
        .delete(app.api.categoria.deletar)


    /************* ENDPOINTS DE MOVIMENTAÇÕES *************/

    app.route('/movimentacoes')
        // .all(app.config.passport.autenticador())
        .post(app.api.movimentacao.salvar)
        .get(app.api.movimentacao.obter)

    app.route('/:id/movimentacoes')
        // .all(app.config.passport.autenticador())
        .put(app.api.movimentacao.salvar)
        .delete(app.api.movimentacao.deletar)
        .get(app.api.movimentacao.obterPorIddoUsuario)
}