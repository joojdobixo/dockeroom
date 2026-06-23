const db = require('../db');

async function listar() {
  const [rows] = await db.query(
    'SELECT id, nome, capacidade, descricao, recursos FROM salas ORDER BY nome ASC'
  );
  return rows;
}

async function buscarPorId(id) {
  const [rows] = await db.query(
    'SELECT id, nome, capacidade, descricao, recursos FROM salas WHERE id = ?',
    [id]
  );

  return rows[0] || null;
}

async function criar({ nome, capacidade, descricao, recursos }) {
  const [result] = await db.query(
    'INSERT INTO salas (nome, capacidade, descricao, recursos) VALUES (?, ?, ?, ?)',
    [nome, capacidade, descricao || null, recursos || null]
  );

  return buscarPorId(result.insertId);
}

async function atualizar(id, { nome, capacidade, descricao, recursos }) {
  const [result] = await db.query(
    'UPDATE salas SET nome = ?, capacidade = ?, descricao = ?, recursos = ? WHERE id = ?',
    [nome, capacidade, descricao || null, recursos || null, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return buscarPorId(id);
}

async function remover(id) {
  const [result] = await db.query('DELETE FROM salas WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};