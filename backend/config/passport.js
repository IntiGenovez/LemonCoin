const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')

const { Strategy, ExtractJwt } = passportJwt 

module.exports = app => {
    const params = { 
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const estrategia = new Strategy(params, (payload, done) => {
        app.bd('usuarios')
            .where({ id: payload.id }).first()
            .then(usuario => done(null, usuario ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    passport.use(estrategia)

    return {
        autenticador: () => passport.authenticate('jwt', { session: false }),

    }
}