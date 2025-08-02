# Nova Estrutura do Backend - Padrão DAO/Service/DTO

## Visão Geral

O backend foi refatorado seguindo o padrão usado no projeto de exemplo, implementando uma arquitetura mais robusta com:

- **DTOs** para transferência de dados
- **DAOs** para queries nativas
- **Services** para lógica de negócio
- **Controllers** atualizados para usar Services

## Estrutura de Pastas

```
src/main/java/com/lojaroupas/api/
├── controllers/          # Controllers REST
├── dao/                  # Data Access Objects (queries nativas)
├── dto/                  # Data Transfer Objects
├── models/               # Entidades JPA
├── repositories/         # Repositories Spring Data
└── services/             # Services (lógica de negócio)
```

## Componentes Implementados

### 1. DTOs (Data Transfer Objects)

#### ProdutoDto
- `ProdutoDto.java` - DTO para produtos
- `ProdutoFiltroDto.java` - DTO para filtros de produtos

#### ClienteDto
- `ClienteDto.java` - DTO para clientes
- `LoginRequestDto.java` - DTO para requisições de login

### 2. DAOs (Data Access Objects)

#### ProdutoDao
- Queries nativas para produtos
- Métodos para filtros, busca por categoria, preço, etc.
- Paginação implementada

#### ClienteDao
- Queries nativas para clientes
- Métodos para login e verificação de email

### 3. Services

#### ProdutoService
- Lógica de negócio para produtos
- Conversão entre DTOs, Models e Tuples
- Integração entre DAO e Repository

#### ClienteService
- Lógica de negócio para clientes
- Autenticação e validações

### 4. Controllers Atualizados

#### ProdutoController
- Endpoints atualizados para usar DTOs
- Novo endpoint `/filtros` para busca avançada
- Respostas padronizadas

#### ClienteController
- Endpoints atualizados para usar DTOs
- Autenticação melhorada

## Endpoints Disponíveis

### Produtos
```
GET    /api/produtos              # Listar todos
GET    /api/produtos/{id}         # Buscar por ID
GET    /api/produtos/categoria/{categoria}  # Por categoria
GET    /api/produtos/novos        # Produtos novos
GET    /api/produtos/promocoes    # Produtos em promoção
GET    /api/produtos/buscar?termo=xyz  # Busca por termo
GET    /api/produtos/preco?precoMin=X&precoMax=Y  # Por faixa de preço
GET    /api/produtos/categorias   # Listar categorias
POST   /api/produtos/filtros      # Busca com filtros avançados
POST   /api/produtos              # Criar produto
PUT    /api/produtos/{id}         # Atualizar produto
DELETE /api/produtos/{id}         # Deletar produto
```

### Clientes
```
GET    /api/clientes              # Listar todos
GET    /api/clientes/{id}         # Buscar por ID
GET    /api/clientes/email/{email}  # Buscar por email
GET    /api/clientes/check-email/{email}  # Verificar email
POST   /api/clientes              # Criar cliente
POST   /api/clientes/login        # Login
PUT    /api/clientes/{id}         # Atualizar cliente
DELETE /api/clientes/{id}         # Deletar cliente
```

## Vantagens da Nova Estrutura

1. **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
2. **Queries Nativas**: Melhor performance para consultas complexas
3. **DTOs**: Controle total sobre dados expostos na API
4. **Reutilização**: Services podem ser reutilizados por diferentes controllers
5. **Manutenibilidade**: Código mais organizado e fácil de manter
6. **Testabilidade**: Cada camada pode ser testada independentemente

## Padrões Implementados

### Conversão de Dados
- **Tuple → DTO**: Conversão de resultados de queries nativas para DTOs
- **DTO → Model**: Conversão para operações de persistência
- **Model → DTO**: Conversão para respostas da API

### Queries Nativas
- Uso de `EntityManager` para queries SQL nativas
- Parâmetros nomeados para segurança
- Paginação implementada

### Tratamento de Erros
- Respostas HTTP padronizadas
- Validação de existência antes de operações
- Optional para casos onde dados podem não existir

## Próximos Passos

1. Implementar DTOs, DAOs e Services para Venda e Estoque
2. Adicionar validações nos DTOs
3. Implementar tratamento de exceções global
4. Adicionar logs e monitoramento
5. Implementar cache para consultas frequentes 