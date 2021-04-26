const { Schema, model } = require('mongoose');

const cartegoriaSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido'],
        unique: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'El Id del usuario es necesario'],
    },
    descripcion: {
        type: String,
    }
})

module.exports = model('Categoria', cartegoriaSchema)