# Testes de API (Mocha + Chai + Supertest)

Pré-requisitos:
- Servidor rodando em http://localhost:3001 (ou configure BASE_URL)

Instalação:
```
npm i -D mocha chai supertest
```

Scripts sugeridos:
```
npm run test:api
npm run test:api:watch
```

Estrutura:
- test/register.spec.js
- test/login.spec.js

Execução:
```
BASE_URL=http://localhost:3001 npm run test:api
```
