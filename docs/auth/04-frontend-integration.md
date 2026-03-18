# 04 - Integração Frontend & Estado Global

Nesta etapa, conectamos a interface React ao backend NestJS e implementamos a gestão de sessão.

## 📡 Cliente de API (Axios)
Utilizamos o **Axios** para centralizar as chamadas ao backend. A principal vantagem foi o uso de **Interceptors**:

- **Request Interceptor**: Antes de cada requisição sair do navegador, o Axios verifica se existe um token no `localStorage`. Se existir, ele injeta automaticamente o header `Authorization: Bearer <token>`.
- **Response Interceptor**: Se o backend responder com erro `401` (Não Autorizado), o interceptor entende que o token expirou, limpa os dados locais e redireciona o usuário para o login.

## 🧠 AuthContext: O Cérebro da Sessão
Criamos um contexto global (`AuthContext`) que utiliza a Context API do React para:
1. **Persistência**: Ao carregar a página, verifica o `localStorage` para manter o usuário logado.
2. **Métodos de Auth**: Centraliza as funções `signIn`, `signUp` e `signOut`.
3. **Estado Global**: Disponibiliza a variável `signed` para que toda a aplicação saiba se existe um usuário autenticado.

## 🛡️ Fluxo de Proteção de Rotas
No componente `App.tsx`, implementamos uma lógica de "Guard":
- Se o app está carregando (`loading`), mostra um spinner.
- Se o usuário NÃO está logado (`!signed`), renderiza as telas de Login/Registro.
- Se o usuário ESTÁ logado, renderiza o `MainLayout` com as views protegidas.

## 🎨 Experiência do Usuário (UX)
- Adicionamos estados de `isLoading` nos botões para evitar cliques duplos.
- Implementamos mensagens de erro dinâmicas vindas do backend (ex: "Email já cadastrado" ou "Credenciais inválidas").
- Exibimos o perfil do usuário logado na Sidebar.
