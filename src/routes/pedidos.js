const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT p.id, p.cliente, p.status, p.created_at, json_agg(json_build_object('produto_id', pi.produto_id, 'quantidade', pi.quantidade, 'preco_unitario', pi.preco_unitario)) AS itens
       FROM pedidos p
       LEFT JOIN pedido_itens pi ON pi.pedido_id = p.id
       GROUP BY p.id
       ORDER BY p.id`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar os pedidos.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT p.id, p.cliente, p.status, p.created_at, json_agg(json_build_object('produto_id', pi.produto_id, 'quantidade', pi.quantidade, 'preco_unitario', pi.preco_unitario)) AS itens
       FROM pedidos p
       LEFT JOIN pedido_itens pi ON pi.pedido_id = p.id
       WHERE p.id = $1
       GROUP BY p.id`,
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Pedido não encontrado.' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o pedido.' });
  }
});

router.post('/', async (req, res) => {
  const { cliente, itens } = req.body;
  try {
    const pedido = await db.query(
      'INSERT INTO pedidos (cliente, status) VALUES ($1, $2) RETURNING *',
      [cliente, 'PENDENTE']
    );

    const pedidoId = pedido.rows[0].id;
    const insercoes = itens.map(item => {
      return db.query(
        'INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco_unitario) VALUES ($1, $2, $3, $4)',
        [pedidoId, item.produto_id, item.quantidade, item.preco_unitario]
      );
    });

    await Promise.all(insercoes);
    res.status(201).json({ id: pedidoId, cliente, status: 'PENDENTE', itens });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o pedido.' });
  }
});

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query(
      'UPDATE pedidos SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Pedido não encontrado.' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status do pedido.' });
  }
});

module.exports = router;
