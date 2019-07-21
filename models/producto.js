let mongoose = require('mongoose')
let Schema = mongoose.Schema

let productoSchema = new Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    activo: Boolean,
    departamento: String
})

// FUNCION ESTÁTICA:
// Producto.activos((err, productos) => {})
productoSchema.statics.activos = function (callback) {
    this.model('Producto').find({ activo: true }, callback)
}


// Tener el modelo sobre el cual voy a trabajar si estoy en models. Find para encontrar todos los parametros.
productoSchema.methods.mismoDepartamento = function (callback) {
    console.log(this.departamento)
    this.model('Producto').find({ departamento: this.departamento }, callback)  //find siempre devuelve un array
} //de aqui me voy a test.js y lo llamo


// Exportar los ficheros que quieran hacer require de este fichero:
module.exports = mongoose.model('Producto', productoSchema)