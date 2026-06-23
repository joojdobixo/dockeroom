const express = require('express');
const controller = require('../controllers/reservasController');
const { exigirLogin, exigirAdmin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', controller.listarPublico);
router.get('/minhas', exigirLogin, controller.minhasReservas);
router.get('/completo', exigirAdmin, controller.listarCompleto);
router.get('/:id', exigirLogin, controller.buscarPorId);

router.post('/', exigirLogin, controller.criar);
router.post('/:id/cancelar', exigirLogin, controller.cancelar);

module.exports = router;