let express = require('express');
let router = express.Router();
let Teacher = require('../../models/teacher')
let { check, validationResult } = require('express-validator/check') //especifico a traves de un objeto lo que me quiero traer de la libreria
let middleware = require('./middleware');


router.get('/', middleware.checkToken, (req, res) => {
    console.log(req.user)
    Teacher.find((err, teachers) => {
        if (err) return res.json({ err })  //devolvemos el error en un json
        res.json(teachers)
    })
})


// Esto va a http://localhost:3000/api/teachers :
router.post('/', [
    check('nombre', 'El campo nombre es obligatorio').exists(),   //he metido un middleware a la petición para q rellene nombre.
    check('apellidos', 'El campo apellidos es obligatorio').exists(),
    check('edad', 'Debes ser mayor de 18 años').custom((value) => {
        return value >= 18  //en vez de poner un if, ponemos esto.
    }),
    //check('dni', 'El DNI no es válido').isIdentityCard("ES")
], (req, res) => {

    const errors = validationResult(req)       //comprobacion para que no cree el profesor si da error.
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array())
    }

    Teacher.create(req.body, (err, teacher) => {
        if (err) return res.json({ err })
        res.json(teacher)
    })
})


// Enviamos con el put todos los datos que queremos modificiar, y el id del profesor. 
router.put('/', (req, res) => {
    Teacher.findByIdAndUpdate(req.body.teacherId, req.body, { new: true }, (err, teacher) => {
        if (err) return res.json({ err })
        res.json(teacher)
    })
})


// Eliminar:
router.delete('/', (req, res) => {
    Teacher.findByIdAndDelete(req.body.teacherId, (err, teacher) => {
        if (err) return res.json({ err })
        res.json(teacher)
    })
})


module.exports = router;