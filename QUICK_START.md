# 🚀 Início Rápido - Loja de Roupas

## Execução Rápida

### Windows
```bash
# Execute o script automático
start-project.bat
```

### Linux/Mac
```bash
# Torne o script executável (primeira vez)
chmod +x start-project.sh

# Execute o script
./start-project.sh
```

### Manual
```bash
# 1. Backend (Terminal 1)
cd loja-roupas-api
mvn spring-boot:run

# 2. Frontend (Terminal 2)
cd loja-roupas
npm install
npm start
```

## 📍 URLs Importantes

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080/api
- **Console H2**: http://localhost:8080/h2-console

## 🔧 Configuração do Banco H2

**URL**: `jdbc:h2:mem:lojaroupas`
**Usuário**: `sa`
**Senha**: `password`

## 📱 Funcionalidades Disponíveis

### Loja Virtual
- ✅ Navegação por produtos
- ✅ Filtros avançados
- ✅ Modal de produto
- ✅ Sistema de busca
- ✅ Layout responsivo

### Área Administrativa
- ✅ Login de administrador
- ✅ Dashboard
- ✅ Gestão de produtos
- ✅ Gestão de clientes
- ✅ Gestão de vendas

## 🐛 Problemas Comuns

### Backend não inicia
```bash
# Verifique Java
java -version

# Limpe e reinstale
cd loja-roupas-api
mvn clean install
mvn spring-boot:run
```

### Frontend não conecta
```bash
# Verifique se o backend está rodando
curl http://localhost:8080/api/produtos

# Reinstale dependências
cd loja-roupas
npm install
npm start
```

### Erro de CORS
- Verifique se o backend está na porta 8080
- Verifique se o frontend está na porta 4200
- Reinicie ambos os serviços

## 📞 Suporte

Consulte o `README.md` completo para mais detalhes. 