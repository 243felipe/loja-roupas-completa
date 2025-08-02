# 🚀 Guia para Deixar o Projeto Online

## 🎯 **Objetivo: Deixar o projeto acessível para seu amigo ver**

### **1. GitHub Pages (Frontend Angular) - GRATUITO**

#### **Passo 1: Ativar GitHub Pages**
1. Vá para seu repositório: `https://github.com/243felipe/loja-roupas-completa`
2. Clique em **"Settings"** (aba superior)
3. Role para baixo até **"Pages"** (menu lateral esquerdo)
4. Em **"Source"**, selecione **"Deploy from a branch"**
5. Em **"Branch"**, selecione **"gh-pages"** e clique **"Save"**

#### **Passo 2: Fazer Deploy**
Execute estes comandos no terminal:

```bash
# Adicionar as mudanças
git add .

# Fazer commit
git commit -m "Configuração para deploy online"

# Enviar para GitHub
git push origin main
```

#### **Passo 3: Aguardar Deploy**
- O GitHub Actions vai construir e fazer deploy automaticamente
- Aguarde 2-5 minutos
- Acesse: `https://243felipe.github.io/loja-roupas-completa`

### **2. Backend Online (Opções)**

#### **Opção A: Render.com (GRATUITO)**
1. Acesse [render.com](https://render.com)
2. Conecte com GitHub
3. Selecione seu repositório
4. Configure como **Web Service**
5. Build Command: `cd loja-roupas-api && mvn clean install`
6. Start Command: `cd loja-roupas-api && java -jar target/api-0.0.1-SNAPSHOT.jar`

#### **Opção B: Railway.app (GRATUITO)**
1. Acesse [railway.app](https://railway.app)
2. Conecte com GitHub
3. Selecione seu repositório
4. Configure automaticamente

#### **Opção C: Heroku (PAGO)**
1. Acesse [heroku.com](https://heroku.com)
2. Conecte com GitHub
3. Deploy automático

### **3. Banco de Dados Online**

#### **Opção A: PostgreSQL na Nuvem**
- **Supabase** (gratuito): [supabase.com](https://supabase.com)
- **Neon** (gratuito): [neon.tech](https://neon.tech)
- **ElephantSQL** (gratuito): [elephantsql.com](https://elephantsql.com)

#### **Opção B: Banco Local (para demonstração)**
Configure o banco local e use ngrok para expor:

```bash
# Instalar ngrok
npm install -g ngrok

# Expor porta 8080
ngrok http 8080
```

### **4. URLs Finais**

Após o deploy, seu amigo poderá acessar:

- **Frontend**: `https://243felipe.github.io/loja-roupas-completa`
- **Backend**: `https://seu-backend.onrender.com` (ou similar)
- **Repositório**: `https://github.com/243felipe/loja-roupas-completa`

### **5. Compartilhar com seu Amigo**

Envie para ele:
```
🎉 Olha só meu projeto de loja de roupas!

🛍️ Loja Virtual: https://243felipe.github.io/loja-roupas-completa
📱 Responsivo para mobile e desktop
🛠️ Tecnologias: Angular + Spring Boot
📂 Código: https://github.com/243felipe/loja-roupas-completa

Funcionalidades:
✅ Catálogo de produtos
✅ Filtros avançados
✅ Sistema de busca
✅ Área administrativa
✅ Dashboard com estatísticas
```

## 🔧 **Configurações Importantes**

### **CORS (Cross-Origin)**
Se o backend estiver em domínio diferente, configure CORS:

```java
@CrossOrigin(origins = {"https://243felipe.github.io", "http://localhost:4200"})
```

### **Variáveis de Ambiente**
Para produção, use variáveis de ambiente:

```properties
# application-prod.properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USER}
spring.datasource.password=${DATABASE_PASSWORD}
```

## 🎯 **Próximos Passos**

1. **Execute os comandos** para fazer deploy
2. **Configure GitHub Pages** nas configurações
3. **Aguarde o deploy automático**
4. **Teste o site online**
5. **Compartilhe com seu amigo!**

---

**🚀 Seu projeto estará online e acessível para qualquer pessoa!** 