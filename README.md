# EduFlow 🎓

EduFlow é uma aplicação web de gestão acadêmica pessoal, permitindo que estudantes monitorem suas notas, frequências, disciplinas e ocorrências escolares em um dashboard centralizado e moderno.

## 🏗️ Estrutura do Projeto (Monorepo)

Este é um monorepo que contém as seguintes partes:

- **`apps/frontend`**: Aplicação React 19 + Vite 7 + Tailwind CSS v4.
- **`apps/backend`**: Servidor NestJS + Drizzle ORM + PostgreSQL (Supabase).
- **`docs/`**: Documentação técnica detalhada das funcionalidades.

## 🛠️ Tecnologias Principais

- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: NestJS, Drizzle ORM, Passport.js (JWT), Bcrypt.
- **Banco de Dados**: PostgreSQL (hospedado no Supabase).

## 🚀 Como Rodar o Projeto

### 1. Pré-requisitos
- Node.js (v18 ou superior)
- NPM ou Yarn
- Uma instância do PostgreSQL (Supabase recomendada)

### 2. Configuração do Backend
Entre na pasta `apps/backend`:
```bash
cd apps/backend
npm install
cp .env.example .env
# Adicione sua DATABASE_URL e JWT_SECRET no .env
npx drizzle-kit push
npm run dev
```

### 3. Configuração do Frontend
Entre na pasta `apps/frontend`:
```bash
cd apps/frontend
npm install
npm run dev
```

## 🔐 Autenticação
O projeto utiliza **JWT (JSON Web Tokens)** para autenticação segura. A documentação completa do fluxo de login pode ser encontrada em `docs/auth/`.

## 📏 Padrões de Código
- **Commits**: Mensagens claras em português e organizadas por contexto.
- **Tipagem**: TypeScript rigoroso em ambos os lados (Frontend e Backend).
- **Estilização**: Tailwind CSS v4 utilizando a nova sintaxe de tema via CSS.

---
*Este projeto foi desenvolvido com foco em aprendizado de arquitetura fullstack e segurança da informação.*
