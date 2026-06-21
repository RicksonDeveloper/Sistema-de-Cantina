# Documentação do Projeto

## Cabeçalho Obrigatório

- **Número do estudo de caso selecionado:** 3
- **Nome do estudo de caso:** Sistema de cantina
- **Link do projeto no GitHub:** https://github.com/RicksonDeveloper/Sistema-de-Cantina
- **Integrante responsável (apenas um deve entregar):** Rickson Figueiredo Pessanha
  - 25114290083- Rickson Figueiredo Pessanha(Líder do Grupo)
sim
> Observação: Apenas o integrante listado acima fará a entrega do projeto.

---

## 1. Apresentação do Projeto

- Sistema de cantina para gerenciar produtos e pedidos.
- Objetivo: permitir cadastro de produtos, criação de pedidos e consulta de informações por API.
- Funcionalidades implementadas: criação, listagem, atualização e exclusão de produtos; criação, listagem e atualização de status de pedidos.

---

## 2. Banco de Dados (1,0)

- Modelo de dados adotado: PostgreSQL.
- Tabelas principais: `produtos`, `pedidos`, `pedido_itens`.
- Relacionamentos: `pedido_itens` relaciona `pedidos` e `produtos`.
- Observações: integridade referencial com `FOREIGN KEY`, uso de `SERIAL` para chaves primárias e `DEFAULT` para valores padrão.

---

## 3. Backend (1,0)

- A API foi construída em Node.js com Express.
- Endpoints principais:
  - `GET /` - status da API
  - `GET /produtos` - listar produtos
  - `GET /produtos/:id` - buscar produto por id
  - `POST /produtos` - criar produto
  - `PUT /produtos/:id` - atualizar produto
  - `DELETE /produtos/:id` - excluir produto
  - `GET /pedidos` - listar pedidos
  - `GET /pedidos/:id` - buscar pedido por id
  - `POST /pedidos` - criar pedido
  - `PUT /pedidos/:id/status` - atualizar status do pedido
- Operações suportadas: CRUD para produtos, criação e leitura de pedidos, atualização de status de pedido.
- Exemplo de resposta:
  - `GET /` → `{ "message": "Sistema de Cantina ativo" }`
  - `POST /produtos` → `{ "id": 1, "nome": "Coxinha", "preco": 7.5, "estoque": 20 }`
  - `POST /pedidos` → `{ "id": 1, "cliente": "João", "status": "PENDENTE", "itens": [...] }`

---

## 4. Infraestrutura com Docker (1,0)

- Descrição do ambiente Docker: aplicação Node.js com PostgreSQL em containers.
- Serviços utilizados:
  - `app`: backend Node.js
  - `db`: banco PostgreSQL
- Como subir o ambiente com Docker Compose:
  - `docker compose up --build`
- O banco inicializa automaticamente com `db/init.sql`.

### Comandos principais

```bash
docker compose up --build
```

---

## 5. Organização Geral (1,0)

- Estrutura de pastas do projeto:
  - `src/` - código fonte do backend
  - `db/` - script de criação do banco
  - `docs/` - documentação de modelagem
  - `README.md` - guia rápido de execução
  - `DOCUMENTACAO.md` - documentação do projeto
- Como executar a solução localmente:
  1. `npm install`
  2. `docker compose up --build`
- Como testar o fluxo ponta a ponta:
  1. Acesse `GET /` para verificar a API.
  2. Crie produtos em `POST /produtos`.
  3. Crie pedidos em `POST /pedidos`.
  4. Consulte pedidos em `GET /pedidos`.
- Observações: o banco e a API estão containerizados e se comunicam via Docker Compose.

---

## Rúbrica de Avaliação

- **Banco de Dados (1,0):** modelo coerente, tabelas e relacionamentos funcionando.
- **Backend (1,0):** API funcional com operações principais e respostas adequadas.
- **Infra com Docker (1,0):** ambiente sobe com Docker Compose e serviços se comunicam.
- **Organização Geral (1,0):** estrutura clara, execução simples, solução funcionando ponta a ponta.
