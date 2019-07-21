let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let jwt = require('jwt-simple');
let moment = require('moment');
let config = require('../../config');
let User = require('../../models/user')


router.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10)  //le doy nuevo valor a la password, 10 es el random para encriptar.
    User.create(req.body, (err, user) => {
        if (err) return res.json(err)
        res.json(user)
    })
})


router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err || !user) {
            return res.json({ error: 'Usuario y/o contraseña erróneos.' })
        } else {
            let eq = bcrypt.compareSync(req.body.password, user.password)  //compara las dos password, la del body y la encriptada
            if (eq) {
                res.json({ token: creaToken(user) })
            } else {
                return res.json({ error: 'Usuario y/o contraseña erróneos.' })
            }
        }
    })
})


let creaToken = (user) => {  //metodo que devuelve un token a partir de un usuario
    let body = {
        userId: user._id,
        create: moment().unix(),  //para sacar la fecha actual en formato unix, los milisegundos desde 1970
        expires: moment().add(10, "minutes").unix()
    }
    return jwt.encode(body, config.TOKEN_SECRET)  //devuelve el objeto codificado
}


module.exports = router;