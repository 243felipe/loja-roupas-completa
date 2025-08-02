# Loja de Roupas - Sistema Completo

Este projeto consiste em uma loja virtual completa com frontend em Angular e backend em Spring Boot.

## 🏗️ Estrutura do Projeto

```
novo/
├── loja-roupas/          # Frontend Angular
└── loja-roupas-api/      # Backend Spring Boot
```

## 🚀 Como Executar

### Pré-requisitos

- **Java 17** ou superior
- **Node.js 18** ou superior
- **npm** ou **yarn**

### 1. Backend (Spring Boot)

**Pré-requisito:** PostgreSQL instalado e configurado

```bash
cd loja-roupas-api

# Instalar dependências (se necessário)
mvn clean install

# Executar a aplicação
mvn spring-boot:run
```

O backend estará disponível em: `http://localhost:8080`

**Nota:** Consulte o arquivo `POSTGRESQL_SETUP.md` para instruções detalhadas de configuração do PostgreSQL.

**Endpoints principais:**
- API: `http://localhost:8080/api`
- Swagger (se configurado): `http://localhost:8080/swagger-ui.html`

### 2. Frontend (Angular)

```bash
cd loja-roupas

# Instalar dependências
npm install

# Executar a aplicação
npm start
```

O frontend estará disponível em: `http://localhost:4200`

## 📋 Funcionalidades

### Frontend (Loja Virtual)
- ✅ **Página inicial** com produtos em destaque
- ✅ **Catálogo de produtos** com filtros avançados
- ✅ **Modal de produto** com galeria de imagens
- ✅ **Sistema de busca** por nome e descrição
- ✅ **Filtros por categoria, tamanho, cor e preço**
- ✅ **Sistema de login** para administradores
- ✅ **Layout responsivo** e moderno
- ✅ **Integração com API** do backend

### Backend (API REST)
- ✅ **Modelos de dados** (Produto, Cliente, Venda, ItemVenda)
- ✅ **Repositories** para acesso a dados
- ✅ **Controllers REST** para produtos
- ✅ **Banco de dados PostgreSQL** configurado
- ✅ **Dados iniciais** populados automaticamente
- ✅ **CORS configurado** para frontend
- ✅ **Configuração de email** para notificações

### Área Administrativa
- ✅ **Dashboard** com estatísticas
- ✅ **Gestão de produtos**
- ✅ **Gestão de clientes**
- ✅ **Gestão de vendas**
- ✅ **Controle de estoque**

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Angular 17** - Framework principal
- **PrimeNG** - Componentes UI
- **PrimeIcons** - Ícones
- **TypeScript** - Linguagem de programação
- **SCSS** - Estilização

### Backend
- **Spring Boot 3.2** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **Spring Security** - Autenticação e autorização
- **PostgreSQL** - Banco de dados relacional
- **Spring Mail** - Envio de emails
- **Maven** - Gerenciamento de dependências
- **Java 17** - Linguagem de programação

## 📁 Estrutura de Arquivos

### Frontend (`loja-roupas/`)
```
src/app/
├── pages/           # Páginas da aplicação
│   ├── loja/       # Loja virtual
│   ├── login/      # Sistema de login
│   ├── dashboard/  # Painel administrativo
│   ├── produtos/   # Gestão de produtos
│   ├── clientes/   # Gestão de clientes
│   ├── vendas/     # Gestão de vendas
│   └── estoque/    # Controle de estoque
├── shared/         # Componentes compartilhados
├── services/       # Serviços da aplicação
├── models/         # Interfaces e tipos
└── layouts/        # Layouts da aplicação
```

### Backend (`loja-roupas-api/`)
```
src/main/java/com/lojaroupas/api/
├── models/         # Entidades JPA
├── repositories/   # Repositories Spring Data
├── controllers/    # Controllers REST
├── services/       # Lógica de negócio
├── dto/           # Data Transfer Objects
├── security/      # Configurações de segurança
└── config/        # Configurações da aplicação
```

## 🔧 Configurações

### Banco de Dados
- **H2 Database** em memória
- **DDL Auto**: `create-drop` (recria tabelas a cada execução)
- **Console H2**: Disponível em `/h2-console`

### CORS
- Configurado para aceitar requisições do frontend
- Origem permitida: `http://localhost:4200`

### API Endpoints
- **Base URL**: `http://localhost:8080/api`
- **Produtos**: `/api/produtos`
- **Clientes**: `/api/clientes` (a implementar)
- **Vendas**: `/api/vendas` (a implementar)

## 🎯 Próximos Passos

### Funcionalidades a Implementar
- [ ] **Sistema de carrinho** de compras
- [ ] **Checkout** e finalização de compra
- [ ] **Sistema de pagamento** integrado
- [ ] **Gestão de estoque** em tempo real
- [ ] **Sistema de avaliações** de produtos
- [ ] **Relatórios** de vendas
- [ ] **Upload de imagens** para produtos
- [ ] **Sistema de cupons** e promoções
- [ ] **Notificações** por email
- [ ] **Testes automatizados**

### Melhorias Técnicas
- [ ] **Autenticação JWT** completa
- [ ] **Validação de dados** no backend
- [ ] **Tratamento de erros** robusto
- [ ] **Logs estruturados**
- [ ] **Documentação da API** (Swagger)
- [ ] **Deploy** em ambiente de produção
- [ ] **CI/CD** pipeline

## 🐛 Solução de Problemas

### Backend não inicia
1. Verifique se o Java 17 está instalado: `java -version`
2. Verifique se o Maven está instalado: `mvn -version`
3. Limpe e reinstale as dependências: `mvn clean install`

### Frontend não conecta com backend
1. Verifique se o backend está rodando na porta 8080
2. Verifique as configurações de CORS
3. Verifique se a URL da API está correta no serviço

### Erro de CORS
1. Verifique se o backend está configurado para aceitar requisições do frontend
2. Verifique se as origens estão corretas no `application.properties`

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Os logs do console do navegador
2. Os logs do Spring Boot
3. A documentação das tecnologias utilizadas

---

**Desenvolvido com ❤️ usando Angular e Spring Boot** 