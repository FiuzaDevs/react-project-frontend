<h1 align="center">ACCESS-CONTROL-API</h1>

## :computer: Requisitos

[![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)]((https://nodejs.org/en//))
[![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/install/#install-compose)

## Descriçao

API controle de acesso

## Instalação

Acesse o diretório raiz da API e execute o comando.

```bash
$ npm install
```

## Preparar o ambiente

**1**. Acesse o diretório raiz da API e execute o comando abaixo:

``` sh
$ docker-compose up -d
```

**2**. Crie um arquivo `.env` na pasta raiz da API com o seguinte formato:

``` sh
PORT=4000
ENABLE_CORS=true
JWT_KEY=9fd26a11-a1a6-4dfd-b754-78b56f9d7c30
PAYLOAD_KEY=78e5ecc2-18f2-4cba-8268-a07f8a414af7
JWT_EXPIRATION=1d
NOSQL_CONNECTION_STRING=mongodb://admin:Passw0rd@127.0.0.1:30000/access-app
```

## Executando a API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentação

Após executar a api acesse http://localhost:4000/docs

Infelimente não conseguir implementar o seed, então usando o swagger, você pode cadastrar o usuarios usando a API.
no meotodo register coloque o email ficticio e a senha. Por essas questões tirei o crptografia da senha.

## Testes

```bash

# end to end tests
$ npm run test:e2e

# end to end test watch
$ npm run test:e2e:watch

# test coverage
$ npm run test:e2e:cov

```