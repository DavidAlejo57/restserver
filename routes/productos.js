const { Router } = require('express');

const {
    productoDelete,
    productoGet,
    productoPost,
    productoPut
} = require('../controllers/productos');

const router = Router();

router.get('/', productoGet);

router.post('/', productoPost);

router.put('/:id', productoPut);

router.delete('/:id', productoDelete);

module.exports = router;