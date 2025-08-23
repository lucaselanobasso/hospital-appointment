
# 🏥 Hospital Verde - Sistema de Agendamento de Consultas

<div align="center">

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/Licença-ISC-green)
![Node](https://img.shields.io/badge/Node.js-16+-green)
![Testes](https://img.shields.io/badge/Testes-Cypress-brightgreen)
![API](https://img.shields.io/badge/API-Swagger-orange)

**Sistema completo de agendamento hospitalar com 15 médicos, 5 especialidades e validações robustas**

</div>

## 📋 Sobre o Projeto

> Aviso importante: Esta não é a versão final. Ainda há testes adicionais a serem implementados e validados. Algumas melhorias e correções estão em andamento.

Aplicação desenvolvida para o **Projeto de Portfólio Pessoal**, no contexto da **Mentoria 2.0 em Testes de Software** com **Julio de Lima**. O foco é qualidade de software, testes automatizados (Cypress) e boas práticas de desenvolvimento, aplicadas a um sistema realista de agendamento hospitalar.

### 🎯 Principais Características

- ✅ **15 médicos** distribuídos em 5 especialidades
- ✅ **Agendamento inteligente** com validações em cascata
- ✅ **Consultas presenciais e online** (telemedicina)
- ✅ **Regras de antecedência** diferenciadas por tipo
- ✅ **Testes automatizados** com Cypress
- ✅ **API documentada** com Swagger/OpenAPI 3.0
- ✅ **Persistência em JSON** com `DataManager` (dados sobrevivem a reinícios)

## 🏗️ Arquitetura Técnica

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend SPA  │◄──►│   Backend API   │◄──►│  Dados Memória  │
│  (Vanilla JS)   │    │   (Express.js)  │    │   (JSON Store)  │
│   Bootstrap 5   │    │   Swagger UI    │    │   15 Médicos    │
│     834 linhas  │    │   559 linhas    │    │   1 Usuário     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲
         │                       │
┌─────────────────┐    ┌─────────────────┐
│ Cypress E2E     │    │ Swagger Docs    │
│ (Testes Auto)   │    │ (OpenAPI 3.0)   │
│ Mochawesome     │    │ Schemas         │
└─────────────────┘    └─────────────────┘
```

### 🔧 Stack Tecnológica

#### Frontend (SPA)
- **JavaScript ES6+** - Lógica de negócio (834 linhas)
- **Bootstrap 5.3** - Framework CSS responsivo
- **HTML5 Semântico** - Estrutura acessível
- **CSS3 Customizado** - Tema verde hospitalar

#### Backend (API REST)
- **Node.js + Express** - Servidor web (559 linhas)
- **CORS** - Política de origem cruzada
- **Swagger UI** - Documentação interativa
- **JSON Storage** - Persistência em arquivo (`data/hospital-data.json`) via `DataManager`

#### Testes & Qualidade
- **Cypress** - Testes end-to-end
- **Mochawesome Reporter** - Relatórios visuais
- **Custom Commands** - Comandos reutilizáveis
- Página pública "Nossos Doutores" com informações completas
- Filtros dinâmicos por especialidade e nome
- Modal detalhado com dados profissionais, contato e certificações
- Integração direta com sistema de agendamento

### 📅 **Sistema de Agendamento Inteligente**
- Processo em cascata: Forma de atendimento → Tipo de serviço → Especialidade → Médico → Data → Horário
- Validações de antecedência (24h presencial, 2h online)
- Prevenção de conflitos de horários
- Resumo antes da confirmação

### 📊 **Gerenciamento de Consultas**
- Lista personalizada de agendamentos por usuário
- Cancelamento com validações de prazo
- Histórico completo de consultas

### 💾 Persistência de Dados
- Implementada via `src/api/dataManager.js`
- Arquivo: `data/hospital-data.json` é criado/atualizado automaticamente
- Persistem: usuários, médicos e agendamentos
- Salva a cada modificação (cadastro, agendamento, cancelamento)

## 🔍 Detalhes Técnicos

### **Frontend (SPA)**
- **Tecnologia**: JavaScript Vanilla + Bootstrap 5
- **Arquitetura**: Single Page Application com roteamento hash
- **Responsividade**: Design mobile-first
- **UI/UX**: Interface moderna nas cores verde e branco

### **Backend (API REST)**
- **Tecnologia**: Node.js + Express
- **Documentação**: Swagger UI completa
- **Armazenamento**: JSON persistente em `data/hospital-data.json` via `DataManager` (sem banco de dados)
- **Validações**: Client-side e server-side

### **Testes**
- **Framework**: Cypress para testes E2E
- **Cobertura**: Cenários de cadastro, login e agendamento (em evolução)
- **Relatórios**: Mochawesome para relatórios visuais
- Observação: Testes adicionais estão pendentes para ampliar a cobertura e estabilizar cenários edge cases.

## 📚 Documentações

- **Plano e Estratégia de Testes**: `documentation/Plano_e_Estrategia_de_Testes.md`
- **Casos de Teste Detalhados**: `documentation/Casos_De_Teste.md`
- **Swagger (API REST)**: disponível em `http://localhost:3001/api-docs` e definido em `src/api/swagger.js`

Esses documentos apresentam contexto, escopo, técnicas, cobertura, critérios de entrada/saída, além de cenários e dados de teste. A documentação de API (Swagger) permite explorar e executar os endpoints diretamente no navegador.

## 📋 Requisitos Funcionais Implementados

### ✅ **RF01 - Acessar Funcionalidade**
O cliente acessa o agendamento através da página inicial do hospital.

### ✅ **RF02 - Cadastro/Login**
- Login com dados existentes (email, CPF, senha)
- Cadastro de nova conta com validações completas

### ✅ **RF03 - Escolha do Tipo de Consulta**
Seleção entre consulta **presencial** ou **online (telemedicina)**.

### ✅ **RF04 - Seleção de Especialidade**
Escolha entre: Cardiologia, Ortopedia, Dermatologia, Pediatria, Ginecologia.

### ✅ **RF05 - Escolha do Médico**
Lista filtrada de médicos por especialidade selecionada.

### ✅ **RF06 - Escolha de Data e Horário**
- Calendário com datas disponíveis
- Horários dinâmicos baseados na disponibilidade

### ✅ **RF07 - Confirmação de Dados**
Resumo completo antes da finalização do agendamento.

### ✅ **RF08 - Confirmação do Agendamento**
Mensagem de sucesso e redirecionamento para "Meus Agendamentos".

### ✅ **RF09 - Simulação de Confirmação**
Mensagem fictícia de envio de confirmação por email/SMS.

### ✅ **RF10 - Cancelamento**
Cancelamento respeitando regras de antecedência.

## ⚖️ Regras de Negócio Implementadas

| Regra | Descrição | Status |
|-------|-----------|--------|
| **RN01** | Conflito de horário - Médico não pode ter dois agendamentos simultâneos | ✅ |
| **RN02** | Datas passadas - Não permite agendamento em datas/horários anteriores | ✅ |
| **RN03** | Horários do médico - Apenas horários disponíveis são exibidos | ✅ |
| **RN04** | Campos obrigatórios - Todos os campos devem estar preenchidos | ✅ |
| **RN05** | Especialidade-médico - Médicos filtrados por especialidade | ✅ |
| **RN06** | Serviços por especialidade - Serviços compatíveis com cada área | ✅ |
| **RN07** | Horário funcionamento - Limitado ao horário do hospital (07:00-18:00) | ✅ |
| **RN08** | Antecedência presencial - Mínimo 24 horas de antecedência | ✅ |
| **RN09** | Antecedência online - Mínimo 2 horas de antecedência | ✅ |
| **RN10** | Limite diário - Máximo uma consulta por médico/dia por paciente | ✅ |
| **RN11** | Cancelamento presencial - Até 24 horas antes | ✅ |
| **RN12** | Cancelamento online - Até 1 hora antes | ✅ |

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- Node.js 16+ instalado ([Download](https://nodejs.org/en/download/))
- Git instalado ([Download](https://git-scm.com/downloads))

### **1. 📥 Instalação**

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd hospital-appointment

# Instale as dependências
npm install
```

### **2. ⚙️ Configuração (Opcional)**

Crie um arquivo `.env` na raiz do projeto para personalizar as portas:

```env
# Porta do backend
PORT=3001
# Porta do frontend (se usar servidor separado)
FRONTEND_PORT=5000
```

### **3. 🏃‍♂️ Executando a Aplicação**

#### **Opção 1: Servidor Único (Recomendado)**
```bash
npm run start:backend
```
- **Backend API**: http://localhost:3001
- **Frontend**: http://localhost:3001
- **Documentação API**: http://localhost:3001/api-docs

#### **Opção 2: Servidores Separados**
```bash
# Terminal 1 - Backend
npm run start:backend

# Terminal 2 - Frontend (se necessário)
npm run start:frontend
```

### **4. 🧪 Executando os Testes**

```bash
# Testes em modo headless
npm test

# Testes com interface gráfica
npm run test:headed

# Abrir Cypress Test Runner
npm run test:open
```

Observações:
- **Inicie o backend** antes dos testes: `npm run start:backend` (ou `npm run start:backend:test` para um ambiente de teste)
- O Cypress usa `baseUrl: http://localhost:3001` (ver `cypress.config.js`)
- Reporter configurado: `cypress-mochawesome-reporter` (ver `cypress.config.js`). Os relatórios HTML/JSON são gerados na pasta padrão do reporter. Para personalizar, utilize `reporterOptions` no `cypress.config.js`.
- Para um estado determinístico nos testes, utilize o endpoint de reset: `POST /api/dev/reset-appointments`

### 📦 Scripts NPM úteis

```bash
# Backend (produção local)
npm run start:backend

# Backend (modo teste)
npm run start:backend:test

# Frontend estático (quando necessário)
npm run start:frontend

# Cypress
npm test            # headless
npm run test:headed # headed
npm run test:open   # UI
```

## 📱 Como Usar a Aplicação

### **🔐 Primeiro Acesso**

1. **Acesse**: http://localhost:3001
2. **Cadastre-se**: Clique em "Login" → "Criar conta"
3. **Preencha**: Nome, CPF (11 dígitos), email e senha
4. **Faça login**: Use os dados cadastrados

### **👨‍⚕️ Explorando os Médicos**

1. **Clique**: "Nossos Doutores" (disponível sem login)
2. **Filtre**: Por especialidade ou busque por nome
3. **Veja detalhes**: Clique "Ver Detalhes" em qualquer médico
4. **Agende direto**: Use "Agendar Consulta" no modal

### **📅 Agendando uma Consulta**

1. **Faça login** primeiro
2. **Clique**: "Agendar Horário"
3. **Siga o processo**:
   - Forma de atendimento (Presencial/Online)
   - Tipo de serviço
   - Especialidade
   - Médico
   - Data (respeitando antecedência)
   - Horário disponível
4. **Confirme**: Revise o resumo e confirme

### **📋 Gerenciando Agendamentos**

1. **Acesse**: "Meus Agendamentos"
2. **Visualize**: Todas suas consultas
3. **Cancele**: Se necessário (respeitando prazos)

## 🧪 Dados de Teste

### **Usuário Pré-cadastrado**
```
Name: Joao Pedro
Email: joaopedro@gmail.com
CPF: 10020030040
Senha: joao12131senha
```

### **Especialidades Disponíveis**
- **Cardiologia**: 3 médicos
- **Ortopedia**: 3 médicos  
- **Dermatologia**: 3 médicos
- **Pediatria**: 3 médicos
- **Ginecologia**: 3 médicos

## 📚 Documentação da API

### **Swagger UI**
Acesse http://localhost:3001/api-docs para documentação interativa completa.

### **Endpoints Principais**
```
POST /api/register     # Cadastrar usuário
POST /api/login        # Fazer login
GET  /api/doctors      # Listar médicos
POST /api/appointments # Criar agendamento
GET  /api/appointments/:email # Agendamentos do usuário
DELETE /api/appointments/:id  # Cancelar agendamento
POST /api/dev/reset-appointments # Reset de agendamentos (apenas dev/test)
```

Exemplo de requisição para `POST /api/appointments`:

```json
{
  "userEmail": "usuario@exemplo.com",
  "doctorId": 1,
  "date": "2025-08-22",
  "time": "15:00",
  "type": "Consulta de rotina",
  "attendance": "Presencial" // ou "Online" (retrocompatível se ausente)
}
```

## 🏗️ Estrutura do Projeto

```
hospital-appointment/
├── 📁 public/              # Frontend (SPA)
│   ├── index.html         # Página principal
│   ├── app.js            # Lógica da aplicação
│   └── style.css         # Estilos customizados
├── 📁 src/
│   └── 📁 api/           # Backend
│       ├── server.js     # Servidor Express
│       └── swagger.js    # Configuração Swagger
├── 📁 cypress/           # Testes E2E
│   ├── 📁 e2e/          # Cenários de teste
│   ├── 📁 fixtures/     # Dados de teste
│   └── 📁 support/      # Comandos customizados
├── package.json          # Dependências e scripts
└── README.md            # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **JavaScript ES6+**: Lógica da aplicação
- **Bootstrap 5**: Framework CSS responsivo
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos customizados

### **Backend**
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **Swagger**: Documentação da API
- **CORS**: Controle de acesso

### **Testes**
- **Cypress**: Framework de testes E2E
- **Mochawesome**: Relatórios de teste

### **Ferramentas**
- **NPM**: Gerenciador de pacotes
- **Git**: Controle de versão
- **VS Code**: Editor recomendado

## 🎯 Próximos Passos

Este projeto faz parte de um portfólio em desenvolvimento. Os próximos passos incluem:

- ✅ Aplicação funcional com persistência
- ✅ API documentada (Swagger)
- 🧪 Testes E2E com Cypress e reporter (em evolução)
- 🧩 Aumentar cobertura de testes e casos negativos/edge cases
- 🐛 Investigar e tratar bugs conhecidos (ver `documentation/PLANO_E_ESTRATEGIA_DE_TESTES/BUG_REPORTS.md`)
- 📊 Relatórios e métricas adicionais
- 🚀 Deploy em produção

## 👨‍💻 Sobre o Desenvolvedor

Projeto desenvolvido como parte da **Mentoria 2.0 em Testes de Software** do **Julio de Lima**, focando em:

- Desenvolvimento full-stack
- Testes automatizados com Cypress
- Boas práticas de documentação
- Criação de portfólio profissional

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de portfólio.

---

<div align="center">
  <strong>🏥 Hospital Verde - Cuidando da sua saúde com tecnologia</strong>
</div>
