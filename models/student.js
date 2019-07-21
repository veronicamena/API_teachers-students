let mongoose = require('mongoose')
let Schema = mongoose.Schema

let studentSchema = new Schema({
    nombre: String,
    apellidos: String,
    dni: String,
    edad: Number,
    activo: Boolean
})

module.exports = mongoose.model('Student', studentSchema)  //Student es el nonmbre que le vamos a dar a la bbdd y luego se pone plural.

