const { response, request } = require('express');
const Usuario = require('./../models/user')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usuarioGet = async(req = request, res = response) => {
    const usuarios = await Usuario.find();
    res.json({
        msg: 'API - GET',
        usuarios,
    })
}

const usuarioPost = async(req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({
            errors,
        });
    }

    const { nombre, correo, password, estado, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, estado, rol })
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt);
    //Correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Usuario ya existe en la base de datos'
        })
    }

    //Comprueba si el rol es correcto o si no ingresa el rol
    if (rol === 'ADMIN_ROLE' || rol === undefined) {

    } else {
        return res.status(400).json({
            msg: 'El rol es incorrecto'
        })
    }

    usuario.save();

    res.json({
        msg: 'API - POST',
        usuario,
        //nombre,
        // correo,
        // password,
        // estado
    })
}

const usuarioPut = async(req = request, res = response) => {
    const id = req.params.id;
    let { password, ...resto } = req.body;

    const salt = bcrypt.genSaltSync()
    password = bcrypt.hashSync(password, salt);

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'API - PUT',
        id,
        usuario,
    })
}

const usuarioDelete = async(req = request, res = response) => {
    const id = req.params.id;

    const usuario = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'API - DELETE',
        usuario,
    })
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}