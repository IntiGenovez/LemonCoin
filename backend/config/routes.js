module.exports = app => {
    app.route('/usuarios')
        .post(app.api.usuario.salvar)
        .get(app.api.usuario.get)

    app.route('/usuarios/:id')
        .put(app.api.usuario.salvar)
}