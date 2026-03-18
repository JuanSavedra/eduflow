# 03 - Fluxo de Autenticação JWT

Nesta etapa, implementamos o "passaporte digital" do EduFlow utilizando JSON Web Tokens (JWT).

## 🎟️ O que é JWT?
O JWT é um padrão que permite transmitir informações de forma segura entre o cliente (frontend) e o servidor (backend) como um objeto JSON. Estas informações podem ser verificadas e confiáveis porque são assinadas digitalmente.

No EduFlow, o token contém:
- `sub`: O ID único do usuário.
- `email`: O email do usuário.
- `name`: O nome do usuário.

## 🔄 O Ciclo de Vida do Token

1. **Autenticação**: O usuário envia email/senha para `/auth/login`.
2. **Validação**: O servidor verifica a senha no banco de dados.
3. **Assinatura**: Se as credenciais forem válidas, o servidor gera um JWT assinado com o `JWT_SECRET`.
4. **Armazenamento**: O frontend recebe o token e o armazena (geralmente no `localStorage` ou `Cookie`).
5. **Requisição**: Para cada nova requisição, o frontend envia o token no header `Authorization: Bearer <token>`.
6. **Verificação**: A `JwtStrategy` no backend valida o token. Se for legítimo, o acesso é liberado.

## 🛡️ Segurança: JwtStrategy
A estratégia JWT é o "filtro" que protege nossas rotas. Ela garante que:
- O token não foi alterado por terceiros.
- O token ainda está dentro do prazo de validade (`JWT_EXPIRES_IN`).
- O usuário identificado no token realmente tem permissão para acessar o recurso.

## 🚪 Endpoints Criados
- `POST /auth/register`: Cria um novo usuário e já retorna o token de acesso.
- `POST /auth/login`: Valida as credenciais e retorna o token de acesso.
