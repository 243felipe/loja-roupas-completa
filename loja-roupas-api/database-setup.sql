-- Script para criar o banco de dados da Loja de Roupas
-- Execute este script no PostgreSQL

-- Criar o banco de dados (execute como superuser)
CREATE DATABASE store;

-- Conectar ao banco de dados
\c store;

-- Criar usuário (opcional, se quiser usar um usuário específico)
-- CREATE USER postgres WITH PASSWORD '123';

-- Dar permissões (se criou usuário específico)
-- GRANT ALL PRIVILEGES ON DATABASE store TO postgres;

-- Verificar se o banco foi criado
SELECT current_database();

-- Nota: As tabelas serão criadas automaticamente pelo Hibernate
-- quando você executar a aplicação Spring Boot pela primeira vez
-- devido à configuração spring.jpa.hibernate.ddl-auto=update 