const { response, request } = require('express');
const Producto = require('./../models/productos');
const { validationResult } = require('express-validator');

const productoGet = async(req = request, res = response) => {
    const productos = await Producto.find();
    res.json({
        msg: 'Productos',
        productos,
    })
}

const productoPost = async(req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({
            error,
        })
    }

    const { nombre, stock, precio } = req.body;
    const producto = new Producto({ nombre, stock, precio });
    //Producto existe
    const existeProducId = await Producto.findOne({ nombre })
    if (existeProducId) {
        return res.status(400).json({
            msg: 'Producto ya existe en la base de datos'
        })
    }
    producto.save()

    res.json({
        msg: 'Producto ingresado en la base de datos',
        producto,
    })
}


const productoPut = async(req = request, res = response) => {
    const id = req.params.id;
    let resto = req.body;

    const producto = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'El producto se actualizo correctamente',
        id,
        producto,
    })
}

const productoDelete = async(req = request, res = response) => {
    const id = req.params.id;

    const producto = await Producto.findByIdAndDelete(id);

    res.json({
        msg: 'El producto se borro correctamente',
        producto,
    })
}

module.exports = {
    productoDelete,
    productoGet,
    productoPost,
    productoPut
}