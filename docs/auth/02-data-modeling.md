# 02 - Modelagem de Dados & Segurança

Nesta etapa, focamos na segurança da informação e na estrutura de persistência de usuários.

## 🔐 Estratégia de Segurança (Bcrypt)

Nunca salvamos senhas limpas. Em vez disso, utilizamos o **Bcrypt** para realizar o *hashing* das senhas. O processo funciona assim:
1. O usuário envia uma senha.
2. O sistema gera um *salt* aleatório.
3. O sistema combina a senha e o *salt* e gera uma "digital" (o hash).
4. Apenas o hash é salvo no banco.

### Por que Bcrypt?
Ele possui um custo computacional configurável (estamos usando `10` rounds), o que impede ataques de força bruta, pois cada tentativa de verificação leva um tempo mínimo.

## 🗄️ O UsersModule

Este módulo é o coração da manipulação de dados de usuários no EduFlow. Ele isola a lógica do banco de dados (Drizzle) do restante da aplicação.

### Principais Métodos (UsersService)
- `findOneByEmail`: Busca um usuário no banco através do email. Essencial para o login.
- `create`: Insere um novo registro de usuário na tabela do banco.
- `hashPassword`: Gera o hash seguro de uma senha.
- `comparePasswords`: Compara uma senha limpa com o hash do banco para validação.

## 📦 Injeção de Dependência
O `UsersService` recebe a instância do banco através do `DRIZZLE_PROVIDER` no seu construtor, garantindo que a conexão com o banco seja compartilhada de forma eficiente.
