const { Router } = require('express');
const { check } = require('express-validator');


const {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
} = require('../controllers/user');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, usuarioGet);

router.post('/', [check('correo', 'El correo es requerido o no es valido').isEmail()], usuarioPost)

router.put('/:id', usuarioPut)

router.delete('/:id', usuarioDelete)

module.exports = router;