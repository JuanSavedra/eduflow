# 01 - Configuração do Banco de Dados & Backend

Esta etapa detalha como o backend do EduFlow foi inicializado e como ele se comunica com o PostgreSQL através do Drizzle ORM.

## 🏗️ Escolhas Arquiteturais

### 1. NestJS (Framework)
Escolhemos o NestJS devido à sua modularidade e uso extensivo de TypeScript. Ele permite que a lógica de negócio (como autenticação) seja isolada em módulos reutilizáveis.

### 2. Drizzle ORM (Banco de Dados)
Diferente do Prisma ou TypeORM, o Drizzle foi escolhido por ser:
- **TypeScript First**: Erros de banco são pegos em tempo de compilação.
- **Leve**: Não possui binários pesados e a performance é próxima ao SQL puro.
- **Relacional**: Permite joins e queries complexas de forma natural.

## 🗄️ Estrutura de Pastas (Backend)
- `src/database/schema.ts`: Onde todas as tabelas são definidas.
- `src/database/database.provider.ts`: Gerencia a conexão real com o Supabase.
- `src/database/database.module.ts`: Disponibiliza o banco para o restante do app de forma segura.

## 🚀 Como sincronizar mudanças no banco
Para aplicar as mudanças feitas no `schema.ts` diretamente no seu Supabase, utilize o comando:
```bash
npx drizzle-kit push
```
Este comando compara seu código TypeScript com o estado atual do banco e gera as mudanças necessárias.

## 🔑 Variáveis Necessárias (.env)
O backend espera uma variável `DATABASE_URL` no formato:
`postgresql://<user>:<password>@<host>:<port>/postgres`
