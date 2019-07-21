let mongoose = require('mongoose');

let mongoDBUrl = 'mongodb://127.0.0.1/aepi'

//conectarnos a la base de datos:
mongoose.connect(mongoDBUrl, { useNewUrlParser: true })

//recuperar conexion
let connection = mongoose.connection
connection.on('error', (error) => {
    console.error(error)
})

//ahora lo añado al app.js, linea 9.

