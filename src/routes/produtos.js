const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM produtos ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar os produtos.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o produto.' });
  }
});

router.post('/', async (req, res) => {
  const { nome, preco, estoque } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO produtos (nome, preco, estoque) VALUES ($1, $2, $3) RETURNING *',
      [nome, preco, estoque]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar produto.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco, estoque } = req.body;
  try {
    const result = await db.query(
      'UPDATE produtos SET nome = $1, preco = $2, estoque = $3 WHERE id = $4 RETURNING *',
      [nome, preco, estoque, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.json({ message: 'Produto removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir produto.' });
  }
});

module.exports = router;
