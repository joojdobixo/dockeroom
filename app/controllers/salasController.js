const service = require('../services/salasService');

async function listar(req, res) {
  const salas = await service.listar();
  res.json(salas);
}

async function buscarPorId(req, res) {
  const sala = await service.buscarPorId(req.params.id);

  if (!sala) {
    return res.status(404).json({ erro: 'Sala nao encontrada' });
  }

  return res.json(sala);
}

async function criar(req, res) {
  const { nome, capacidade, descricao, recursos } = req.body;

  if (!nome || !capacidade) {
    return res.status(400).json({ erro: 'Nome e capacidade sao obrigatorios' });
  }

  const sala = await service.criar({ nome, capacidade, descricao, recursos });
  return res.status(201).json(sala);
}

async function atualizar(req, res) {
  const { nome, capacidade, descricao, recursos } = req.body;

  if (!nome || !capacidade) {
    return res.status(400).json({ erro: 'Nome e capacidade sao obrigatorios' });
  }

  const sala = await service.atualizar(req.params.id, { nome, capacidade, descricao, recursos });

  if (!sala) {
    return res.status(404).json({ erro: 'Sala nao encontrada' });
  }

  return res.json(sala);
}

async function remover(req, res) {
  const removida = await service.remover(req.params.id);

  if (!removida) {
    return res.status(404).json({ erro: 'Sala nao encontrada' });
  }

  return res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};