let express = require('express');
let router = express.Router();
let Persona = require('../models/persona')
let Producto = require('../models/producto')

// vamos a app.js y se la añadimos, linea 9:  var testRouter = require('./routes/test'); 

router.get('/select', (req, res) => {
    Persona.find((err, personas) => {
        if (err) return res.json({ error: err })  //devuelve el error en una clave llamada error. Pongo return para que no pase a la linea siguiente.
        res.json(personas);
    })
    // res.send('Funciona correctamente');
})

router.get('/insert', (req, res) => {
    let p = new Persona(); //creo instancia vacia y renombro
    p.nombre = "Maria";
    p.apellidos = "Lopez";
    p.edad = 22;
    p.save((err) => { //devuelvo error si hubiera.
        if (err) return res.json({ error: err })
        res.json({ success: 'Persona insertada' })
    })
})


//otra forma:
router.get('/insertv2', (req, res) => {
    Persona.create({
        nombre: 'Raul',
        apellidos: 'García',
        edad: 80
    }, (err, persona) => {
        if (err) return res.json({ error: err })
        res.json(persona)
    })
})

router.post('/insertv3', (req, res) => {      // Creo nuevo manejador para mandarla donde quiera.
    // res.json(req.body)  // Vere lo mismo que tengo en la peticion post. Abrimos con el postman
    Persona.create(req.body, (err, persona) => { // Forma con comprobaciones medias a partir de peticion post.
        if (err) return res.json({ error: err })
        res.json(persona)
    })
})


router.post('/insertv4', (req, res) => {
    Producto.create(req.body, (err, producto) => {
        if (err) return res.json({ error: err })
        res.json(producto)
    })
})



router.get('/virtuales', (req, res) => {
    // Recupero todos los documentos de la colección Personas
    Persona.find((err, personas) => {
        // Compruebo si hay error
        if (err) return res.send(err)
        // Renderizo la vista pasando el array con las personas recuperadas
        res.render('listaPersonas', { arrPersonas: personas }) //listapersonas q estara en la vista, el objeto q pasaré a la vista
    })
})



router.get('/filtros', (req, res) => {
    Persona.find({
        edad: { $gt: 20, $lt: 50 } //edad mayor que 20 y edad menor que 50
    }, (err, personas) => {
        res.render('listaPersonas', { arrPersonas: personas })
    })
})



// Recuperar mi registro de la bbdd
router.get('/update', (req, res) => {
    Persona.findById('5d173f285e6f4b158d872423', (err, persona) => {
        // res.json(persona) // Compruebo que me llega bien la persona antes de editarla
        persona.edad = 67
        persona.save((err) => {  //la diferencia de este save y el de arriba, es que este ya existe.
            if (err) return res.json({ error: err })   // La actualiza si está, si no la inserta
            res.send('Persona actualizada')
        })
    })
})


// AQUI ACCEDEMOS A TEST/PRODUCTOSACTIVOS:
router.get('/productosactivos', (req, res) => {
    Producto.activos((err, productos) => {
        if (err) return res.json({ error: err })
        res.json(productos)
    })
})

router.get('/mismodepartamento', (req, res) => {
    let prod = new Producto()
    prod.departamento = 'informatica'
    prod.mismoDepartamento((err, productos) => {
        if (err) return res.json({ error: err })
        res.json(productos)
    })
})




module.exports = router;