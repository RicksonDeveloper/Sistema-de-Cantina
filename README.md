# Sistema de Cantina

API em Node.js com PostgreSQL para gerenciar produtos e pedidos de uma cantina.

## Como usar

1. Instale as dependências:

```bash
npm install
```

2. Inicie com Docker Compose:

```bash
docker compose up --build
```

3. Acesse a API em `http://localhost:4000`.

## Endpoints principais

- `GET /` - ver status da API
- `GET /produtos` - listar produtos
- `GET /produtos/:id` - buscar produto
- `POST /produtos` - criar produto
- `PUT /produtos/:id` - atualizar produto
- `DELETE /produtos/:id` - excluir produto
- `GET /pedidos` - listar pedidos
- `GET /pedidos/:id` - buscar pedido
- `POST /pedidos` - criar pedido
- `PUT /pedidos/:id/status` - atualizar status do pedido

## Modelo de Dados

- `produtos(id, nome, preco, estoque)`
- `pedidos(id, cliente, status, created_at)`
- `pedido_itens(id, pedido_id, produto_id, quantidade, preco_unitario)`

## Documentação de modelagem

- Veja `docs/modelagem.md` para o diagrama ER e o modelo relacional.

## Docker

O serviço `app` conecta ao serviço `db` usando Docker Compose.

## Observações

- Apenas um integrante deve entregar o projeto.
- Ajuste o link do GitHub no arquivo `DOCUMENTACAO.md`.

## Configuração de ambiente

- Copie o arquivo de exemplo de variáveis de ambiente e ajuste os valores locais:

```bash
cp .env.example .env
```

(No Windows PowerShell)

```powershell
Copy-Item .env.example .env
```

- Nunca envie o arquivo `.env` para o repositório. O arquivo `.gitignore` já contém `.env`.
