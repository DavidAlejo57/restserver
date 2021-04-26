const { response, request } = require('express');
const Producto = require('./../models/productos');
const Categoria = require('./../models/categoria');
const Usuario = require('./../models/user');

//Muestra todos los productos con la informacion del usuario y la categoria
const productoGet = async(req = request, res = response) => {
    Producto.find({}, (err, productos) => {
        Usuario.populate(productos, { path: 'usuario' }, (err, productos) => {
            Categoria.populate(productos, { path: 'categoria' }, (err, productos) => {
                res.json({
                    msg: 'Productos',
                    productos
                })
            })
        })
    })
}

//Muestra el producto por su ID
const productoGetID = async(req = request, res = response) => {
    const id = req.params.id;
    //comprobar si el id es de producto
    const producto = await Producto.findById(id);
    if (producto === null) {
        return res.status(404).json({
            msg: 'El Id del producto es incorrecto o no existe',
        })
    }
    //Realiza la busqueda de la categoria por id y muestra al usuario vinculado a la categoria
    Producto.find({ _id: id }, (err, productos) => {
        Usuario.populate(productos, { path: 'usuario' }, (err, productos) => {
            Categoria.populate(productos, { path: 'categoria' }, (err, productos) => {
                res.json({
                    msg: 'Producto por su ID',
                    productos
                })
            })
        })
    })
}

const productoPost = async(req = request, res = response) => {

    const { nombre, stock, precio, descripcion, IdUsuario, IdCategoria } = req.body;
    //recupera la informacion del usuario por su ID
    const usuario = await Usuario.findById(IdUsuario);
    //comprueba si el usuario es ADMIN_ROlE
    if (usuario.rol == 'ADMIN_ROLE') {

    } else {
        return res.status(400).json({
            msg: 'EL usuario no tiene permiso para ralizar esta accion'
        })
    }
    //recupera la informacion de la categoria por su ID
    const categoria = await Categoria.findById(IdCategoria);

    const producto = new Producto({ nombre, stock, precio, descripcion, usuario, categoria });
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
    productoGetID,
    productoPost,
    productoPut
}