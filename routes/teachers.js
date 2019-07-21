var express = require('express');
var router = express.Router();
let Teacher = require('../models/teacher')

router.get('/', (req, res) => {
    Teacher.find((err, teachers) => {
        res.render('teachers/list', { profesores: teachers })
    })
})


// Maneja la peticion que nos devuelve el formulario para la creacion de profesores:
router.get('/new', (req, res) => {
    res.render('teachers/form')
})


// Muestra el formulario de edición para un estudante en concreto:
router.get('/edit/:teacherId', (req, res) => {
    Teacher.findById(req.params.teacherId, (err, teacher) => {
        if (err) return res.json({ error: err })
        console.log(teacher)
        res.render('teachers/edit', { profesor: teacher })
    })
})



router.get('/delete/:teacherId', (req, res) => {
    Teacher.findByIdAndDelete(req.params.teacherId, (err, result) => {
        res.redirect('/teachers')
    })
})



// Sacar de la url:
router.get('/:teacherId', (req, res) => {
    console.log(req.params)
    Teacher.findById(req.params.teacherId, (err, teacher) => { // Funcion findById, cogemos del robo3t un id y probamos /numid en la ruta
        res.render('teachers/show', { profesor: teacher })
    })
})





// Ruta para recibir los valores del formulario:

// TODO: Validación de lso datos previos a la inserción 
router.post('/create', (req, res) => {
    req.body.especialidad = true
    console.log(req.body)
    Teacher.create(req.body, (err, teachers) => {  // Aquí recupero el objeto de profesores que edito en el post.
        res.redirect('/teachers')
    })
})

router.post('/update', (req, res) => {
    console.log(req.body)
    req.body.especialidad = (req.body.especialidad === "on") ? true : false;  //esto es un ternario para evitar hacer un if, que es muy feo.
    Teacher.findByIdAndUpdate(req.body.teacherId, req.body, (err, teacher) => {  // Aquí recupero el objeto de profesores que envio en el post.
        if (err) return res.json({ error: err })
        console.log(teacher)
        res.redirect('/teachers/' + teacher._id)
    })
})



module.exports = router;
