# Testes de Performance (k6)

Pré-requisitos:
- k6 instalado (https://k6.io/docs/get-started/installation/)
- Servidor rodando em http://localhost:3001

Scripts:
- login-smoke.js: fumaça (autenticação básica)
- appointments-load.js: carga em endpoint de agendamentos

Execução:
```
# Smoke
k6 run tests/perf/login-smoke.js

# Carga leve
k6 run --vus 10 --duration 30s tests/perf/appointments-load.js
```
