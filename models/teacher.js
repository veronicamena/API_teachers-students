let mongoose = require('mongoose')
let Schema = mongoose.Schema

let studentSchema = new Schema({
    nombre: String,
    apellidos: String,
    edad: Number,
    especialidad: Boolean
})

module.exports = mongoose.model('Teacher', teacherSchema)  //teacher es el nonmbre que le vamos a dar a la bbdd y luego se pone plural.

