# 🚀 Uma API para gerenciar meus treinos na academia
 ### Bem vindo(a)!
 ```bash
Esta API foi desenvolvida para que eu pudesse registrar meus treinos na academia, monitor o tempo etc...
```
## 💻 Instalação

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
```bash
# Clone esse repositório
- $ git clone https://github.com/gabrielAnacletoo/Back-End-Meus-Treinos

# Vá para o repositório Back-end
- $ cd Back-End-Meus-Treinos

# Instale as dependencias
- $ npm i typeorm pg @nestjs/core @nestjs/common @nestjs/swagger @nestjs/jwt @nestjs/config bcrypt class-transformer class-validator


# Rode a aplicação
- $ npm run start:dev
```
## 👨‍💻 Entidades utilizadas no projeto
```bash
- # Auth
- $ Responsavel pela autenticação da API.
- # Workouts
- $ Responsavel pela criações de treinos do usuário.
- #  Users
- $ E por último a entidade de user que é responsavel pelo usuário. assim como nas outras entidades também tem todos as rotas de um CRUD.
```

## 👨‍💻 Dependências Utilizadas
📚 Aqui estão as estrelas do show, as dependências que fazem tudo funcionar:

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [typeORM](https://docs.nestjs.com/recipes/sql-typeorm)
- [jsonwebtoken](https://jwt.io/)
- [firebase](https://firebase.google.com/?hl=pt)
- [@nestjs/common](https://www.npmjs.com/package/@nestjs/common)
- [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
- [@nestjs/jwt](https://docs.nestjs.com/security/authentication)
- [@nestjs/config](https://docs.nestjs.com/techniques/configuration)
- [@Class-transformer @Class-validator](https://docs.nestjs.com/techniques/validation)


## 🛣️ Rotas da API

### 🔵 GET /users/infouser
- **Descrição**: Retorna todas as informações do usuário. (Necessita autenticação).
### 🔵 GET /workouts
- **Descrição**: Retorna o todos os treinos registrados (Necessita autenticação).


### 🟢 POST /auth
- **Descrição**: Verifica o login e retornar um token.
- **Corpo da Requisição**:
```javascript
{
email: "fulano@ciclano.com.br",
password: "senha1234"
}
```
### 🟢 POST /auth/register
- **Descrição**: Cria um usuário no bando de dados(Necessita autenticação).
- **Aviso**: A Imagem de perfil do usuário não é obrigatória. 
- **Corpo da Requisição**:
```javascript
{
FirstName: "Fulano"
LastName: "Beltrano"
email: "beltrano@fulano.com.br"
profileImage: "URL Da imagem enviada."
password: "senha123"
}
```
- **Caso queira criar um adm adicionar a propriedade**:
```javascript
{
role: "admin"
}
```

### 🟢 POST /workouts
- **Descrição**: Cadastra um treino no usuário.
- **Corpo da Requisição**:
```javascript
{
	"trainingName": "treino de costas e biceps",
	"dayOfWeek": "quarta-feira",
	"exercises": [
		{
			"name": "Rosca 21",
			"series": "3",
			"repetitions": "7"
		},
		{
			"name": "Puxada de frente",
			"series": "3",
			"repetitions": "12"
		},
		{
			"name": "Pulldown",
			"series": "3",
			"repetitions": "12"
		}
	]
}
```



<!-- ### 🟡 PATH /v1/users/:id
- **Descrição**: Atualiza as propriedades de um usuário encontrado.
- **Corpo da Requisição**:
 ```javascript
{
  FirstName: "Fulano Editado"

}
``` -->

<!-- ### 🔴 DELETE /v1/users/:id
- **Descrição**: Remove um usuário específico do banco de dados.

### 🔴 DELETE /v1/products/:id
- **Descrição**: Remove um produto específico do banco de dados. -->



### Detalhes Adicionais
- **Autores da API:** [Gabriel Anacleto](https://www.linkedin.com/in/gabriel-anacletoo/) 
- **Contato:** gabrielanacleto159@live.com
