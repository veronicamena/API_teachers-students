let mongoose = require('mongoose');
let Schema = mongoose.Schema

let personaSchema = new Schema({
    nombre: String,
    apellidos: String,
    edad: Number
})

// creamos propiedades virtuales o computadas en base a otras propiedades que si existen en la bbdd.
//genero metodo get y set que reciben funcion anonima
personaSchema.virtual('nombre_completo').get(function () {
    return this.nombre + " " + this.apellidos;
})

personaSchema.virtual('nombre_completo').set(function (value) {
    let arr = value.split(' ')
    this.nombre = arr[0]
    this.apellidos = arr[1]
})
module.exports = mongoose.model('Persona', personaSchema) //esto define la colección Persona y se va a insertar en Personas en plural.
