let express = require('express');
let router = express.Router();
let Student = require('../../models/student')
let { check, validationResult } = require('express-validator/check') //especifico a traves de un objeto lo que me quiero traer de la libreria
let middleware = require('./middleware');


router.get('/', middleware.checkToken, (req, res) => {
    //res.send('FUNSIONA!!!!')
    console.log(req.user)
    Student.find((err, students) => {
        if (err) return res.json({ err })  //devolvemos el error en un json
        res.json(students)
    })
})


// Esto va a http://localhost:3000/api/students :
router.post('/', [
    check('nombre', 'El campo nombre es obligatorio').exists(),   //he metido un middleware a la petición para q rellene nombre.
    check('apellidos', 'El campo apellidos es obligatorio').exists(),
    check('edad', 'Debes ser mayor de 18 años').custom((value) => {
        return value >= 18  //en vez de poner un if, ponemos esto.
    }),
    //check('dni', 'El DNI no es válido').isIdentityCard("ES")
    check('dni', 'El dni debe ser válido').custom(value => {
        return (/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i).test(value) //expresion regular para validar dni, devuelve true/false
    })
], (req, res) => {

    const errors = validationResult(req)       //comprobacion para que no cree el estudiante si da error.
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array())
    }

    Student.create(req.body, (err, student) => {
        if (err) return res.json({ err })
        res.json(student)
    })
})


// Enviamos con el put todos los datos que queremos modificiar, y el id del estudiante. 
router.put('/', (req, res) => {
    Student.findByIdAndUpdate(req.body.studentId, req.body, { new: true }, (err, student) => {
        if (err) return res.json({ err })
        res.json(student)
    })
})


// Eliminar:
router.delete('/', (req, res) => {
    Student.findByIdAndDelete(req.body.studentId, (err, student) => {
        if (err) return res.json({ err })
        res.json(student)
    })
})


module.exports = router;