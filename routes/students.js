var express = require('express');
var router = express.Router();
let Student = require('../models/student')

router.get('/', (req, res) => {
    Student.find((err, students) => {
        res.render('students/list', { estudiantes: students })
    })
})


// Maneja la peticion que nos devuelve el formulario para la creacion de estudiantes:
router.get('/new', (req, res) => {
    res.render('students/form')
})


// Muestra el formulario de edición para un estudante en concreto:
router.get('/edit/:studentId', (req, res) => {
    Student.findById(req.params.studentId, (err, student) => {
        if (err) return res.json({ error: err })
        console.log(student)
        res.render('students/edit', { estudiante: student })
    })
})



router.get('/delete/:studentId', (req, res) => {
    Student.findByIdAndDelete(req.params.studentId, (err, result) => {
        res.redirect('/students')
    })
})



// Sacar de la url:
router.get('/:studentId', (req, res) => {
    console.log(req.params)
    Student.findById(req.params.studentId, (err, student) => { // Funcion findById, cogemos del robo3t un id y probamos /numid en la ruta
        res.render('students/show', { estudiante: student })
    })
})





// Ruta para recibir los valores del formulario:

// TODO: Validación de lso datos previos a la inserción 
router.post('/create', (req, res) => {
    req.body.activo = true
    console.log(req.body)
    Student.create(req.body, (err, students) => {  // Aquí recupero el objeto de estudiantes que edito en el post.
        res.redirect('/students')
    })
})

router.post('/update', (req, res) => {
    console.log(req.body)
    req.body.activo = (req.body.activo === "on") ? true : false;  //esto es un ternario para evitar hacer un if, que es muy feo.
    Student.findByIdAndUpdate(req.body.studentId, req.body, (err, student) => {  // Aquí recupero el objeto de estudiantes que envio en el post.
        if (err) return res.json({ error: err })
        console.log(student)
        res.redirect('/students/' + student._id)
    })
})



module.exports = router;
