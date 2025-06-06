# 🚀 GRUPO REUNE - BFF API
API **Backend for Frontend (BFF)** desenvolvida em **NestJS** para o projeto **GRUPO REUNE**. Inclui autenticação JWT, integração com MySQL, Cloudinary, e documentação completa via Swagger.

## 🔥 Funcionalidades
✅ Autenticação JWT (token gerado no login);  
✅ Proteção de rotas com `JwtAuthGuard`;  
✅ Integração com MySQL para gestão de dados e usuários;  
✅ Upload de arquivos via Cloudinary;  
✅ Documentação interativa via Swagger.

## 📦 Instalação e Setup
```bash
git clone git@github.com:gruporeune/nodejs-grupo-reune-backend.git
cd nodejs-grupo-reune-backend
npm install
```

### 🔑 Variáveis de Ambiente (.env)
Crie um arquivo `.env` na raiz com:
```env
PORT=3000
DB_HOST=seu_host_mysql
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
JWT_SECRET=sua_chave_jwt_super_secreta
CLOUDINARY_CLOUD_NAME=seu_cloudinary
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret
```

## 🚀 Executando o Projeto
```bash
npm run start
```
Acesse a API em:  
🌐 `http://localhost:3000`

## 📖 Swagger - Documentação Interativa
Acesse a documentação no navegador:  
🌐 `http://localhost:3000/api/docs`

### 📝 Autenticação no Swagger
1️⃣ Faça `POST /api/login` com:
```json
{
  "email": "seu_email",
  "senha": "sua_senha"
}
```
2️⃣ Copie o `access_token` retornado.  
3️⃣ No Swagger, clique em **Authorize** e insira:
```
Bearer SEU_ACCESS_TOKEN
```
4️⃣ Teste rotas protegidas direto no Swagger.

## 🔐 Fluxo JWT e Segurança
- **Login (`/api/login`)**: valida usuário e retorna o `access_token` JWT.
- **Rotas protegidas**: precisam do header `Authorization: Bearer <token>`.
- **JwtAuthGuard**: intercepta e valida tokens.
- **Token também é configurado em cookie `smSession` (opcional)**.

📜 **Mini-diagrama do fluxo**
```
Frontend ── POST /api/login ──► Backend (valida e gera JWT)
Frontend ◄─ access_token ──────┘
Frontend ── GET /api/protegida ──► Backend (valida token com JwtAuthGuard)
```

## 🗂️ Estrutura Simplificada
```
src/
├── app.module.ts
├── main.ts
├── bff/
│   ├── controllers/
│   ├── adapters/
│   ├── use-cases/
│   ├── clients/
│   ├── guards/
│   ├── strategies/
│   └── dtos/
├── database/
│   └── db.ts
├── .env
├── package.json
└── README.md
```

## 🏗️ Principais Comandos Git
```bash
git clone git@github.com:gruporeune/nodejs-grupo-reune-backend.git
git remote set-url origin git@github.com:gruporeune/nodejs-grupo-reune-backend.git
git add .
git commit -m "mensagem do commit"
git push origin main
```

## 📤 Gerar Chave SSH para GitHub
```bash
ssh-keygen -t rsa -b 4096 -C "seuemail@exemplo.com"
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub
```
Adicione a chave em **GitHub > Settings > SSH and GPG Keys**.

## 🤝 Contribuindo
1️⃣ Faça um fork;  
2️⃣ Crie sua branch;  
3️⃣ Envie um Pull Request.

## 📬 Contato
📧 Email: `gruporeune@gmail.com`
