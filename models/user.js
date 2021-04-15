const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido'],
    },
    correo: {
        type: String,
        require: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    }
})

module.exports = model('Usuario', usuarioSchema)