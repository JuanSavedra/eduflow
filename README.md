# EduFlow 🎓

EduFlow é o seu centro de comando acadêmico. Uma aplicação web moderna projetada para centralizar tudo o que um estudante precisa: desde o controle de notas até o gerenciamento de prazos, cronograma de aulas e repositório de materiais.

## ✨ Funcionalidades Principais

### 📊 Dashboard Inteligente
*   **Visão Geral**: Acompanhe sua média global e total de ocorrências em tempo real.
*   **Próximas Entregas**: Um widget dedicado que lista suas tarefas pendentes, priorizando as mais próximas do prazo e destacando as atrasadas com alertas visuais.
*   **Alerta de Aula**: Receba um aviso no topo do dashboard sobre sua próxima aula do dia, incluindo sala e contagem regressiva.

### 📚 Gestão de Disciplinas
*   Cadastro completo de matérias, professores e semestres.
*   **Lançamento de Notas**: Controle granular de avaliações com cálculo automático de média.
*   **Destaque Visual**: Identificação rápida de matérias abaixo da média desejada.

### 📝 Gestão de Tarefas (Assignments)
*   Organize provas, trabalhos e projetos.
*   Filtros inteligentes por período ou mês/ano para manter seu histórico organizado.
*   Status dinâmicos: Pendente, Concluída ou Atrasada.

### 📅 Cronograma Semanal (Timetable)
*   Visualize sua grade de horários de forma colorida e organizada.
*   Mapeamento de salas e horários específicos para cada dia da semana.

### 🔗 Repositório de Materiais
*   Guarde links importantes (Google Drive, YouTube, GitHub) dentro de cada disciplina.
*   **Favoritos**: Marque seus materiais mais usados para acesso instantâneo na barra lateral do sistema.

### 🧠 EduAI Advisor (Em Construção 🚧)
*   O auxiliar de inteligência artificial está sendo desenvolvido para fornecer dicas de estudo personalizadas e planos de ação baseados no seu desempenho real.

## 🏗️ Estrutura do Monorepo

*   **`apps/frontend`**: Interface reativa construída com React 19, Vite 7 e Tailwind CSS v4.
*   **`apps/backend`**: API robusta com NestJS, utilizando Drizzle ORM para uma comunicação eficiente com o banco de dados.
*   **`libs/shared`**: Tipagens e utilitários compartilhados entre os ambientes.

## 🛠️ Tecnologias

*   **Linguagem**: TypeScript (em todo o projeto).
*   **Backend**: NestJS, Drizzle ORM, Passport.js (JWT), PostgreSQL.
*   **Frontend**: React, Lucide Icons, Recharts (Gráficos), Tailwind CSS v4.

## 🚀 Como Rodar o Projeto

### 1. Pré-requisitos
*   Node.js (v20 ou superior recomendada)
*   Uma instância do PostgreSQL (recomendamos Supabase pela facilidade)

### 2. Configuração do Ambiente
Crie um arquivo `.env` na pasta `apps/backend` seguindo o modelo:

```env
# URL de conexão com o banco de dados PostgreSQL
DATABASE_URL="postgres://usuario:senha@host:porta/database"

# Chave secreta para geração dos tokens JWT
JWT_SECRET="sua_chave_secreta_aqui"
```

### 3. Execução

**Backend:**
```bash
cd apps/backend
npm install
npx drizzle-kit push  # Sincroniza o schema com o banco
npm run dev
```

**Frontend:**
```bash
cd apps/frontend
npm install
npm run dev
```

Acesse o frontend em `http://localhost:5173`.

---
*EduFlow - Organização para o seu sucesso acadêmico.*
