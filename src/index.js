const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const produtosRouters = require('./routes/produtos');
const pedidosRouters = require('./routes/pedidos');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Sistema de Cantina ativo' });
});

app.use('/produtos', produtosRouters);
app.use('/pedidos', pedidosRouters);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
