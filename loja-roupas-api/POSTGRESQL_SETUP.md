# Configuração do PostgreSQL para Loja de Roupas

## Pré-requisitos

1. **PostgreSQL instalado** no seu sistema
2. **Java 17** ou superior
3. **Maven** instalado

## Passos para Configuração

### 1. Instalar PostgreSQL (se ainda não tiver)

**Windows:**
- Baixe o PostgreSQL do site oficial: https://www.postgresql.org/download/windows/
- Durante a instalação, anote a senha do usuário `postgres`

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**macOS:**
```bash
brew install postgresql
```

### 2. Criar o Banco de Dados

**Opção 1: Via pgAdmin (Interface Gráfica)**
1. Abra o pgAdmin
2. Conecte ao servidor PostgreSQL
3. Clique com botão direito em "Databases"
4. Selecione "Create" > "Database"
5. Nome: `store`
6. Clique em "Save"

**Opção 2: Via linha de comando**
```bash
# Conectar como usuário postgres
psql -U postgres

# Criar o banco de dados
CREATE DATABASE store;

# Verificar se foi criado
\l

# Sair
\q
```

### 3. Verificar Configurações

Certifique-se de que o arquivo `application.properties` está configurado corretamente:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/store
spring.datasource.username=postgres
spring.datasource.password=123
```

**Nota:** Substitua `123` pela senha real do seu usuário PostgreSQL.

### 4. Executar a Aplicação

```bash
cd loja-roupas-api
mvn spring-boot:run
```

A aplicação irá:
- Conectar automaticamente ao PostgreSQL
- Criar as tabelas necessárias (devido ao `ddl-auto=update`)
- Popular o banco com dados iniciais

### 5. Verificar se Funcionou

1. **Logs da aplicação:** Deve aparecer "Produtos populados com sucesso!"
2. **Banco de dados:** As tabelas devem ser criadas automaticamente
3. **API:** Teste acessando `http://localhost:8080/api/produtos`

## Solução de Problemas

### Erro de Conexão
```
Connection refused
```
- Verifique se o PostgreSQL está rodando
- Verifique se a porta 5432 está correta
- Verifique usuário e senha

### Erro de Permissão
```
Permission denied
```
- Verifique se o usuário `postgres` tem permissão para criar/alterar tabelas
- Execute: `GRANT ALL PRIVILEGES ON DATABASE store TO postgres;`

### Erro de Driver
```
No suitable driver found
```
- Verifique se a dependência do PostgreSQL está no `pom.xml`
- Execute: `mvn clean install`

## Comandos Úteis

**Conectar ao banco:**
```bash
psql -U postgres -d store
```

**Listar tabelas:**
```sql
\dt
```

**Ver estrutura de uma tabela:**
```sql
\d produtos
```

**Sair do psql:**
```sql
\q
```

## Backup e Restore

**Fazer backup:**
```bash
pg_dump -U postgres store > backup.sql
```

**Restaurar backup:**
```bash
psql -U postgres store < backup.sql
``` 