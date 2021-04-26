const { response, request } = require('express');
const Usuario = require('./../models/user')
const Categoria = require('./../models/categoria');

//Muestra todas las categorias y a los usuarios que estan vinculados 
const categoriaGet = async(req = request, res = response) => {
    Categoria.find({}, (err, categorias) => {
        Usuario.populate(categorias, { path: 'usuario' }, (err, categorias) => {
            res.json({
                msg: 'Categorias',
                categorias
            })
        })
    })
}

//Muestra la categoria por su ID
const categoriaGetID = async(req = request, res = response) => {
    const id = req.params.id;
    //comprobar si el id es de categoria
    const categoria = await Categoria.findById(id);
    if (categoria === null) {
        return res.status(404).json({
            msg: 'El Id de la categoria es incorrecto o no existe',
        })
    }
    //Realiza la busqueda de la categoria por id y muestra al usuario vinculado a la categoria
    Categoria.find({ _id: id }, (err, categorias) => {
        Usuario.populate(categorias, { path: 'usuario' }, (err, categorias) => {
            res.json({
                msg: 'Categoria por ID',
                categorias
            })
        })
    })
}

//crea la nueva categoria
const categoriaPost = async(req = request, res = response) => {
    const { nombre, id } = req.body;
    const usuario = await Usuario.findById(id);
    const categoria = new Categoria({ nombre, usuario });

    //Categoria existe
    const existecategoria = await Categoria.findOne({ nombre });
    if (existecategoria) {
        return res.status(400).json({
            msg: 'La categoria ya existe'
        })
    }

    categoria.save();

    res.json({
        msg: 'Categoria guardada correctamente',
        categoria,
    })
}

//Actualiza la categoria por su ID
const categoriaPut = async(req = request, res = response) => {
    const id = rep.params.id;
    let { nombre, descripcion } = req.body;

    const categoria = await Categoria.findOneAndUpdate(id, nombre, descripcion);

    res.json({
        msg: 'La categoria se ha guardado correctamente',
        categoria,
    })
}

//Elimina la categoria por su ID
const categoriaDelete = async(req = request, res = response) => {
    const id = req.params.id;

    const categoria = await Categoria.findOneAndDelete(id);

    res.json({
        msg: 'La categoria se borro correctamente',
        categoria,
    })
}

module.exports = {
    categoriaDelete,
    categoriaGetID,
    categoriaGet,
    categoriaPost,
    categoriaPut
}