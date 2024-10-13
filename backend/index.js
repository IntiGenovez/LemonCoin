const app = require("express")()
const consign = require("consign")

const bd = require("./config/bd")

app.bd = bd

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validacao.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log("backend executando...")
})