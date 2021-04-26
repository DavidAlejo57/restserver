const { Router } = require('express');

const {
    productoDelete,
    productoGet,
    productoGetID,
    productoPost,
    productoPut
} = require('../controllers/productos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, productoGet);

router.get('/:id', validarJWT, productoGetID);

router.post('/', validarJWT, productoPost);

router.put('/:id', validarJWT, productoPut);

router.delete('/:id', validarJWT, productoDelete);

module.exports = router;