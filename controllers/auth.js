const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user');
const { generarToken } = require('../helper/generar-jwt');

const login = async(req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        //Verificar que el correo existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta (usuario) '
            });
        }
        //Verificar que el usuario este activo 
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecto (estado)'
            })
        }
        //Verificar que la contraseña sea correcta
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecto (contraseña)'
            })
        }

        //Crear token
        const token = await generarToken(usuario.id);

        //respuesta
        res.json({
            msg: 'Login existoso',
            correo,
            password,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'ERROR, problemas con el administrador'
        })
    }
}

module.exports = {
    login
}