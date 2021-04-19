const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido'],
        unique: true,
    },
    stock: {
        type: Number,
        require: [true, 'El stock es requerido'],
    },
    precio: {
        type: Number,
        require: [true, 'El precio es requerido'],
    },
})

module.exports = model('Producto', productoSchema)