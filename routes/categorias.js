const { Router } = require('express');

const {
    categoriaDelete,
    categoriaGetID,
    categoriaGet,
    categoriaPost,
    categoriaPut
} = require('../controllers/categorias');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, categoriaGet);

router.get('/:id', validarJWT, categoriaGetID);

router.post('/', validarJWT, categoriaPost);

router.put('/:id', validarJWT, categoriaPut);

router.delete('/:id', validarJWT, categoriaDelete);

module.exports = router;