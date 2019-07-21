let jwt = require('jwt-simple');
let moment = require('moment');
let config = require('../../config');

// Compruebo si existe el token, si ha expirado, y el id de usuario.

exports.checkToken = (req, res, next) => {
    if (!req.headers.authorization) {  // Si no existe respondemos al cliente con un estado de no autorizados. Si no, next.
        return res
            .status(403)
            .json({ message: 'Tu petición no dispone de la cabecera de autorización.' })
    }

    let token = req.headers.authorization   // Si no ha expirado, para ello lo decodificamos
    let body = jwt.decode(token, config.TOKEN_SECRET)

    console.log(body)

    if (body.expires <= moment().unix()) {  //fecha actual es moment
        return res.status(403).json({ message: 'El token ha expirado.' })
    }

    req.user = body.userId  // La info del id del usuario

    next()
}