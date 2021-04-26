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
    descripcion: {
        type: String,
        require: [true, 'La descripcion es requerida']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'El id del usuario es requerido']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: [true, 'El id de la categoria es requerida']
    }
})

module.exports = model('Producto', productoSchema)