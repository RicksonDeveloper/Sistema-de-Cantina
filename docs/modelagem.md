# Modelagem do Sistema de Cantina

## Elementos do problema

- Produto
- Pedido
- Item de pedido

## Entidades do problema

- Produto
- Pedido
- PedidoItem

## Relacionamentos

- Um pedido possui vários itens de pedido.
- Um item de pedido refere-se a um único produto.
- Um pedido é identificado pelo cliente, status e data de criação.

## Modelo Entidade-Relacionamento

- Produto (1) --- (N) Item de pedido
- Pedido (1) --- (N) Item de pedido

## Modelo Relacional

- `produtos(id SERIAL PRIMARY KEY, nome VARCHAR(255) NOT NULL, preco NUMERIC(10,2) NOT NULL, estoque INTEGER NOT NULL DEFAULT 0)`
- `pedidos(id SERIAL PRIMARY KEY, cliente VARCHAR(255) NOT NULL, status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE', created_at TIMESTAMP NOT NULL DEFAULT NOW())`
- `pedido_itens(id SERIAL PRIMARY KEY, pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE, produto_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE RESTRICT, quantidade INTEGER NOT NULL DEFAULT 1, preco_unitario NUMERIC(10,2) NOT NULL)`

## Observações

- A tabela `pedido_itens` faz a ligação entre `pedidos` e `produtos`.
- Cada pedido pode ter vários itens e cada item pertence a um único pedido.
- O relacionamento garante integridade referencial entre as tabelas.
