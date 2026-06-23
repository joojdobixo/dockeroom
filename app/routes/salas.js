const express = require('express');
const controller = require('../controllers/salasController');
const { exigirAdmin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);

router.post('/', exigirAdmin, controller.criar);
router.put('/:id', exigirAdmin, controller.atualizar);
router.delete('/:id', exigirAdmin, controller.remover);

module.exports = router;