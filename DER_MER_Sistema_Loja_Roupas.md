# DER e MER - Sistema de Loja de Roupas

## 📊 DER (Diagrama Entidade-Relacionamento)

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│     CLIENTES    │         │      VENDAS     │         │     PRODUTOS    │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ PK: id          │         │ PK: id          │         │ PK: id          │
│ nome            │         │ FK: cliente_id  │◄────────┤ nome            │
│ email           │         │ data_venda      │         │ descricao       │
│ telefone        │         │ valor_total     │         │ preco           │
│ cpf             │         │ status          │         │ categoria       │
│ endereco        │         │ forma_pagamento │         │ marca           │
│ data_cadastro   │         │ observacoes     │         │ novo            │
│ ativo           │         └─────────────────┘         │ rating          │
└─────────────────┘                   │                 │ desconto        │
         │                            │                 │ ativo           │
         │                            │                 └─────────────────┘
         │                            │                           │
         │                            │                           │
         └────────────────────────────┘                           │
                                                                  │
                                                                  │
┌─────────────────┐         ┌─────────────────┐                  │
│   ITENS_VENDA   │         │  PRODUTO_CORES  │                  │
├─────────────────┤         ├─────────────────┤                  │
│ PK: id          │         │ PK: id          │                  │
│ FK: venda_id    │◄────────┤ FK: produto_id  │◄─────────────────┘
│ FK: produto_id  │◄────────┤ cor             │
│ quantidade      │         │ ativo           │
│ preco_unitario  │         └─────────────────┘
│ subtotal        │
└─────────────────┘
                           ┌─────────────────┐
                           │ PRODUTO_TAMANHOS│
                           ├─────────────────┤
                           │ PK: id          │
                           │ FK: produto_id  │◄─────────────────┐
                           │ tamanho         │                  │
                           │ quantidade      │                  │
                           │ ativo           │                  │
                           └─────────────────┘                  │
                                                                 │
                           ┌─────────────────┐                  │
                           │ PRODUTO_IMAGENS │                  │
                           ├─────────────────┤                  │
                           │ PK: id          │                  │
                           │ FK: produto_id  │◄─────────────────┘
                           │ url_imagem      │
                           │ principal       │
                           │ ativo           │
                           └─────────────────┘
```

## 🗂️ MER (Modelo Entidade-Relacionamento)

### **1. ENTIDADE: CLIENTES**
```
CLIENTES (id, nome, email, telefone, cpf, endereco, data_cadastro, ativo)
- id: Chave Primária (PK) - Auto incremento
- nome: VARCHAR(255) - Nome completo do cliente
- email: VARCHAR(255) - Email único do cliente
- telefone: VARCHAR(20) - Telefone de contato
- cpf: VARCHAR(14) - CPF único do cliente
- endereco: TEXT - Endereço completo
- data_cadastro: TIMESTAMP - Data de cadastro
- ativo: BOOLEAN - Status do cliente
```

### **2. ENTIDADE: PRODUTOS**
```
PRODUTOS (id, nome, descricao, preco, categoria, marca, novo, rating, desconto, ativo)
- id: Chave Primária (PK) - Auto incremento
- nome: VARCHAR(255) - Nome do produto
- descricao: TEXT - Descrição detalhada
- preco: DECIMAL(10,2) - Preço do produto
- categoria: VARCHAR(100) - Categoria do produto
- marca: VARCHAR(100) - Marca do produto
- novo: BOOLEAN - Indica se é produto novo
- rating: DECIMAL(3,2) - Avaliação média
- desconto: DECIMAL(5,2) - Percentual de desconto
- ativo: BOOLEAN - Status do produto
```

### **3. ENTIDADE: VENDAS**
```
VENDAS (id, cliente_id, data_venda, valor_total, status, forma_pagamento, observacoes)
- id: Chave Primária (PK) - Auto incremento
- cliente_id: Chave Estrangeira (FK) → CLIENTES.id
- data_venda: TIMESTAMP - Data e hora da venda
- valor_total: DECIMAL(10,2) - Valor total da venda
- status: ENUM - Status da venda (PENDENTE, APROVADA, EM_PREPARACAO, ENVIADA, ENTREGUE, CANCELADA)
- forma_pagamento: VARCHAR(50) - Forma de pagamento
- observacoes: TEXT - Observações da venda
```

### **4. ENTIDADE: ITENS_VENDA**
```
ITENS_VENDA (id, venda_id, produto_id, quantidade, preco_unitario, subtotal)
- id: Chave Primária (PK) - Auto incremento
- venda_id: Chave Estrangeira (FK) → VENDAS.id
- produto_id: Chave Estrangeira (FK) → PRODUTOS.id
- quantidade: INTEGER - Quantidade vendida
- preco_unitario: DECIMAL(10,2) - Preço unitário no momento da venda
- subtotal: DECIMAL(10,2) - Subtotal do item (quantidade * preco_unitario)
```

### **5. ENTIDADE: PRODUTO_CORES**
```
PRODUTO_CORES (id, produto_id, cor, ativo)
- id: Chave Primária (PK) - Auto incremento
- produto_id: Chave Estrangeira (FK) → PRODUTOS.id
- cor: VARCHAR(50) - Nome da cor
- ativo: BOOLEAN - Status da cor
```

### **6. ENTIDADE: PRODUTO_TAMANHOS**
```
PRODUTO_TAMANHOS (id, produto_id, tamanho, quantidade, ativo)
- id: Chave Primária (PK) - Auto incremento
- produto_id: Chave Estrangeira (FK) → PRODUTOS.id
- tamanho: VARCHAR(10) - Tamanho do produto
- quantidade: INTEGER - Quantidade em estoque
- ativo: BOOLEAN - Status do tamanho
```

### **7. ENTIDADE: PRODUTO_IMAGENS**
```
PRODUTO_IMAGENS (id, produto_id, url_imagem, principal, ativo)
- id: Chave Primária (PK) - Auto incremento
- produto_id: Chave Estrangeira (FK) → PRODUTOS.id
- url_imagem: VARCHAR(500) - URL da imagem
- principal: BOOLEAN - Indica se é imagem principal
- ativo: BOOLEAN - Status da imagem
```

## 🔗 RELACIONAMENTOS

### **1. CLIENTES ↔ VENDAS**
- **Tipo**: 1:N (Um cliente pode ter várias vendas)
- **Cardinalidade**: (1,1) ↔ (0,N)
- **Descrição**: Um cliente pode realizar múltiplas vendas, mas cada venda pertence a um único cliente

### **2. VENDAS ↔ ITENS_VENDA**
- **Tipo**: 1:N (Uma venda pode ter vários itens)
- **Cardinalidade**: (1,1) ↔ (1,N)
- **Descrição**: Uma venda é composta por vários itens, e cada item pertence a uma única venda

### **3. PRODUTOS ↔ ITENS_VENDA**
- **Tipo**: 1:N (Um produto pode estar em vários itens de venda)
- **Cardinalidade**: (1,1) ↔ (0,N)
- **Descrição**: Um produto pode ser vendido em várias vendas, mas cada item de venda refere-se a um único produto

### **4. PRODUTOS ↔ PRODUTO_CORES**
- **Tipo**: 1:N (Um produto pode ter várias cores)
- **Cardinalidade**: (1,1) ↔ (0,N)
- **Descrição**: Um produto pode estar disponível em várias cores

### **5. PRODUTOS ↔ PRODUTO_TAMANHOS**
- **Tipo**: 1:N (Um produto pode ter vários tamanhos)
- **Cardinalidade**: (1,1) ↔ (0,N)
- **Descrição**: Um produto pode estar disponível em vários tamanhos

### **6. PRODUTOS ↔ PRODUTO_IMAGENS**
- **Tipo**: 1:N (Um produto pode ter várias imagens)
- **Cardinalidade**: (1,1) ↔ (0,N)
- **Descrição**: Um produto pode ter múltiplas imagens para exibição

## 📈 ESTATÍSTICAS ATUAIS DO SISTEMA

- **Clientes**: 24.000 registros
- **Produtos**: 32.000 registros
- **Vendas**: 16.000 registros
- **Itens de Venda**: Relacionados às vendas
- **Cores de Produtos**: Múltiplas cores por produto
- **Tamanhos de Produtos**: Controle de estoque por tamanho
- **Imagens de Produtos**: Galeria de imagens por produto

## 🎯 FUNCIONALIDADES SUPORTADAS

1. **Gestão de Clientes**: Cadastro, edição, consulta
2. **Gestão de Produtos**: Cadastro com cores, tamanhos e imagens
3. **Controle de Vendas**: Criação, acompanhamento de status
4. **Controle de Estoque**: Por tamanho e produto
5. **Dashboard**: Estatísticas em tempo real
6. **Loja Virtual**: Exibição de produtos para clientes 