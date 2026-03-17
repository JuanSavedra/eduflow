# Contexto do Projeto: EduFlow 🎓

Este arquivo serve como guia mestre para o Gemini CLI entender a arquitetura, convenções e o funcionamento do projeto EduFlow.

## 📌 Visão Geral
EduFlow é uma aplicação web de gestão acadêmica pessoal. Ela permite que estudantes monitorem suas notas, frequências, disciplinas e ocorrências escolares em um dashboard centralizado.

### Tecnologias Principais
- **Framework**: React 19 (com hooks modernos e Context API).
- **Build Tool**: Vite 7.
- **Estilização**: Tailwind CSS v4 (usando a nova sintaxe de configuração via CSS `@theme`).
- **Linguagem**: TypeScript (tipagem rigorosa para modelos de dados).
- **Ícones**: Lucide React.
- **Animações**: Tailwind CSS Animate.

## 🏗️ Arquitetura e Estrutura
O projeto segue uma estrutura organizada por responsabilidades:

- `src/context/AppContext.tsx`: O "coração" da aplicação. Gerencia o estado global (matérias, notas, faltas, aba ativa) e expõe funções de manipulação de dados (`addSubject`, `updateAbsences`, etc.).
- `src/views/`: Contém os componentes de "página" que representam as diferentes seções da aplicação (Dashboard, Matérias, Ocorrências, IA).
- `src/components/layout/`: Estrutura de navegação (Sidebar, Header, MobileNav) e o wrapper principal `MainLayout`.
- `src/components/ui/`: Componentes atômicos e reutilizáveis (Button, Card).
- `src/types/index.ts`: Definições globais de interfaces e tipos.

## 🛠️ Comandos de Desenvolvimento
- `npm run dev`: Inicia o servidor de desenvolvimento em `http://localhost:5173`.
- `npm run build`: Compila o projeto para produção na pasta `dist/`.
- `npm run preview`: Visualiza o build de produção localmente.
- `npm run lint`: Executa o linter para verificar padrões de código.

## 📏 Convenções de Desenvolvimento
- **Componentes**: Devem ser funcionais (`React.FC`) e utilizar desestruturação de props.
- **Estilização**: Priorizar classes utilitárias do Tailwind CSS v4. Evitar CSS puro, exceto para configurações globais em `index.css`.
- **Estado**: Estados que precisam persistir entre trocas de aba (views) devem ser mantidos no `AppContext`.
- **Nomenclatura**: Arquivos de componentes em PascalCase (ex: `MainLayout.tsx`). Tipos e interfaces em PascalCase.
- **Tipagem**: Sempre definir interfaces para props de componentes e para estruturas de dados no `types/index.ts`.

## 🧠 Fluxo de Dados
1. O `AppProvider` envolve a aplicação em `App.tsx`.
2. As views consomem dados e funções do `useAppContext`.
3. Ações do usuário (como adicionar uma nota) disparam funções no Contexto, que atualizam o estado e refletem as mudanças em todas as telas (ex: Dashboard atualiza a média global instantaneamente).

---
*Nota: Este projeto utiliza Tailwind CSS v4, que não requer um arquivo tailwind.config.js externo, sendo configurado diretamente no src/index.css.*
