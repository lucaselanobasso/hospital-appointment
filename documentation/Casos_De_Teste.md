# Casos de Teste
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3 e no Plano de Estratégia de Testes*

---

## FUNCIONALIDADE: CADASTRO

### Caso de Teste 001
**ID:** CT001  
**Título:** Cadastro de novo usuário com credenciais válidas  
**Prioridade:** Alta  
**Rastreabilidade:** CT01 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução (http://localhost:3001)
- Usuário não possui conta cadastrada
- CPF e email não existem no sistema

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar a aplicação e clicar em "Login" | Página de login é exibida |
| 2 | Clicar em "Criar conta" | Formulário de cadastro é exibido |
| 3 | Preencher Nome: "João Silva" | Campo nome aceita a entrada |
| 4 | Preencher CPF: "12345678901" | Campo CPF aceita 11 dígitos numéricos |
| 5 | Preencher Email: "joao.silva@email.com" | Campo email aceita formato válido |
| 6 | Preencher Senha: "minhasenha123" | Campo senha aceita a entrada |
| 7 | Clicar em "Cadastrar" | Cadastro é realizado com sucesso |
| 8 | Verificar redirecionamento | Sistema redireciona para página de login |

**Pós-Condições:**
- Usuário está cadastrado no sistema
- Dados persistem no arquivo hospital-data.json
- Usuário pode fazer login com as credenciais cadastradas

---

### Caso de Teste 002
**ID:** CT002  
**Título:** Tentativa de cadastro com CPF duplicado  
**Prioridade:** Alta  
**Rastreabilidade:** CT02 (Cadastro) - US01

**Pré-Condições:**
- Usuário com CPF "10020030040" já existe no sistema
- Aplicação está em execução

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar formulário de cadastro | Formulário de cadastro é exibido |
| 2 | Preencher Nome: "Maria Santos" | Campo nome aceita a entrada |
| 3 | Preencher CPF: "10020030040" (já existente) | Campo CPF aceita a entrada |
| 4 | Preencher Email: "maria.nova@email.com" | Campo email aceita a entrada |
| 5 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 6 | Clicar em "Cadastrar" | Sistema exibe mensagem de erro |
| 7 | Verificar mensagem | "Usuário já cadastrado com este CPF" |
| 8 | Verificar não cadastramento | Usuário não é cadastrado e cadastro não realizado |

**Pós-Condições:**
- Novo usuário não é criado
- Sistema mantém integridade dos dados
- Usuário permanece na tela de cadastro

---

### Caso de Teste 003
**ID:** CT003  
**Título:** Tentativa de cadastro com email duplicado  
**Prioridade:** Alta  
**Rastreabilidade:** CT03 (Cadastro) - US01

**Pré-Condições:**
- Usuário com email "joaopedro@gmail.com" já existe no sistema
- Aplicação está em execução

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar formulário de cadastro | Formulário de cadastro é exibido |
| 2 | Preencher Nome: "Pedro João" | Campo nome aceita a entrada |
| 3 | Preencher CPF: "98765432101" | Campo CPF aceita a entrada |
| 4 | Preencher Email: "joaopedro@gmail.com" (já existente) | Campo email aceita a entrada |
| 5 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 6 | Clicar em "Cadastrar" | Sistema exibe mensagem de erro |
| 7 | Verificar mensagem | "Usuário já cadastrado com este e-mail" |
| 8 | Verificar não cadastramento | Usuário não é cadastrado e cadastro não realizado |

**Pós-Condições:**
- Novo usuário não é criado
- Sistema mantém integridade dos dados
- Usuário permanece na tela de cadastro

---

### Caso de Teste 004
**ID:** CT004  
**Título:** Cadastro com CPF inválido  
**Prioridade:** Alta  
**Rastreabilidade:** CT04 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na tela de cadastro

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Preencher Nome: "Ana Costa" | Campo nome aceita a entrada |
| 2 | Preencher CPF: "123456789" (9 dígitos) | Campo CPF aceita a entrada |
| 3 | Preencher Email: "ana@email.com" | Campo email aceita a entrada |
| 4 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 5 | Clicar em "Cadastrar" | Sistema valida CPF |
| 6 | Verificar mensagem de erro | "CPF deve conter 11 dígitos numéricos" |
| 7 | Verificar não cadastramento | Cadastro não realizado |

**Pós-Condições:**
- Usuário não é cadastrado
- Sistema valida formato de CPF
- Usuário pode corrigir os dados

---

### Caso de Teste 005
**ID:** CT005  
**Título:** Cadastro com email inválido  
**Prioridade:** Alta  
**Rastreabilidade:** CT05 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na tela de cadastro

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Preencher Nome: "Carlos Souza" | Campo nome aceita a entrada |
| 2 | Preencher CPF: "11122233344" | Campo CPF aceita a entrada |
| 3 | Preencher Email: "email-invalido" | Campo email aceita a entrada |
| 4 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 5 | Clicar em "Cadastrar" | Sistema valida formato do email |
| 6 | Verificar mensagem de erro | "E-mail inválido" |
| 7 | Verificar não cadastramento | Cadastro não realizado |

**Pós-Condições:**
- Usuário não é cadastrado
- Sistema valida formato de email
- Usuário pode corrigir os dados

---

### Caso de Teste 006
**ID:** CT006  
**Título:** Cadastro sem informar todos os campos obrigatórios  
**Prioridade:** Alta  
**Rastreabilidade:** CT06 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na tela de cadastro

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Deixar campo Nome em branco | Campo permanece vazio |
| 2 | Preencher CPF: "12345678901" | Campo aceita entrada |
| 3 | Preencher Email: "teste@email.com" | Campo aceita entrada |
| 4 | Preencher Senha: "senha123" | Campo aceita entrada |
| 5 | Clicar em "Cadastrar" | Sistema valida campos obrigatórios |
| 6 | Verificar mensagem de erro | "Todos os campos são obrigatórios" |
| 7 | Verificar não cadastramento | Cadastro não realizado |

**Pós-Condições:**
- Usuário não é cadastrado
- Sistema valida campos obrigatórios
- Usuário pode preencher campos faltantes

---

### Caso de Teste 007
**ID:** CT007  
**Título:** Cadastro com nome contendo caracteres inválidos  
**Prioridade:** Alta  
**Rastreabilidade:** CT07 (Cadastro) - US01 - BUG01

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na tela de cadastro

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Preencher Nome: "Usuário5&%#¨$¨ Da Silva" | Campo aceita a entrada |
| 2 | Preencher CPF: "12345678901" | Campo aceita entrada |
| 3 | Preencher Email: "usuario@email.com" | Campo aceita entrada |
| 4 | Preencher Senha: "senha123" | Campo aceita entrada |
| 5 | Clicar em "Cadastrar" | Sistema deveria validar caracteres |
| 6 | Verificar resultado | **BUG: Sistema permite cadastro (defeito conhecido)** |
| 7 | Verificar mensagem esperada | "Nome inválido" (não aparece devido ao bug) |

**Pós-Condições:**
- **DEFEITO CONHECIDO:** Sistema permite cadastro com caracteres inválidos
- Cadastro é realizado incorretamente
- Bug registrado como BUG01

---

## FUNCIONALIDADE: LOGIN

### Caso de Teste 008
**ID:** CT008  
**Título:** Login com credenciais válidas  
**Prioridade:** Alta  
**Rastreabilidade:** CT01 (Login) - US02

**Pré-Condições:**
- Usuário cadastrado no sistema
- Email: "joaopedro@gmail.com", Senha: "joao12131senha"

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar a aplicação e clicar em "Login" | Página de login é exibida |
| 2 | Preencher Email: "joaopedro@gmail.com" | Campo email aceita a entrada |
| 3 | Preencher Senha: "joao12131senha" | Campo senha aceita a entrada |
| 4 | Clicar em "Entrar" | Login realizado com sucesso |
| 5 | Verificar redirecionamento | Sistema redireciona para home page |
| 6 | Verificar estado autenticado | Usuário aparece como logado |

**Pós-Condições:**
- Usuário está autenticado no sistema
- Funcionalidades restritas ficam disponíveis
- Botão de logout aparece na interface

---

### Caso de Teste 009
**ID:** CT009  
**Título:** Login com credenciais inválidas  
**Prioridade:** Alta  
**Rastreabilidade:** CT02 (Login) - US02

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na página de login

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Preencher Email: "usuario@inexistente.com" | Campo aceita a entrada |
| 2 | Preencher Senha: "senhaerrada" | Campo aceita a entrada |
| 3 | Clicar em "Entrar" | Sistema processa tentativa |
| 4 | Verificar mensagem de erro | "Credenciais inválidas" |
| 5 | Verificar não autenticação | Usuário não é autenticado |
| 6 | Verificar permanência na tela | Usuário permanece na tela de login |

**Pós-Condições:**
- Usuário não é autenticado
- Sistema mantém segurança
- Tentativa de login é rejeitada

---

### Caso de Teste 010
**ID:** CT010  
**Título:** Login com campos obrigatórios vazios  
**Prioridade:** Alta  
**Rastreabilidade:** CT03 (Login) - US02

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na página de login

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Deixar campo Email vazio | Campo permanece vazio |
| 2 | Preencher Senha: "qualquersenha" | Campo senha aceita entrada |
| 3 | Clicar em "Entrar" | Sistema valida campos |
| 4 | Verificar mensagem de erro | "Todos os campos são obrigatórios" |
| 5 | Verificar não autenticação | Usuário não é autenticado |

**Pós-Condições:**
- Usuário não é autenticado
- Sistema valida campos obrigatórios
- Usuário pode preencher campos faltantes

---

### Caso de Teste 011
**ID:** CT011  
**Título:** Logout do usuário  
**Prioridade:** Média  
**Rastreabilidade:** CT04 (Login) - US03

**Pré-Condições:**
- Usuário está logado no sistema
- Funcionalidades autenticadas estão disponíveis

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar botão/opção de logout | Botão de logout está visível |
| 2 | Clicar em "Sair" ou "Logout" | Sistema processa logout |
| 3 | Verificar redirecionamento | Usuário é desautenticado e redirecionado para a home |
| 4 | Verificar estado da sessão | Usuário não está mais autenticado |
| 5 | Tentar acessar funcionalidade restrita | Sistema redireciona para login |

**Pós-Condições:**
- Usuário é desautenticado
- Funcionalidades restritas ficam inacessíveis
- Segurança da sessão é mantida

---

### Caso de Teste 012
**ID:** CT012  
**Título:** Tentar acessar funcionalidade sem login  
**Prioridade:** Alta  
**Rastreabilidade:** CT05 (Login) - US02

**Pré-Condições:**
- Usuário não está logado no sistema
- Aplicação está em execução

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Tentar acessar "Meus Agendamentos" diretamente | Sistema detecta falta de autenticação |
| 2 | Verificar redirecionamento | Redirecionamento para tela de login |
| 3 | Tentar acessar "Agendar Horário" | Sistema detecta falta de autenticação |
| 4 | Verificar redirecionamento | Redirecionamento para tela de login |

**Pós-Condições:**
- Usuário é redirecionado para login
- Funcionalidades restritas permanecem protegidas
- Sistema mantém controle de acesso

---

## FUNCIONALIDADE: AGENDAMENTO

### Caso de Teste 013
**ID:** CT013  
**Título:** Agendamento completo com informações válidas  
**Prioridade:** Alta  
**Rastreabilidade:** CT01 (Agendamento) - US04 + US11

**Pré-Condições:**
- Usuário está logado no sistema
- Médicos disponíveis no sistema
- Data futura válida (respeitando antecedência)

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Clicar em "Agendar Horário" | Tela de agendamento é exibida |
| 2 | Selecionar "Presencial" em Forma de Atendimento | Opção é selecionada |
| 3 | Selecionar "Consulta de rotina" em Tipo de Serviço | Campo Especialidade é habilitado |
| 4 | Selecionar "Cardiologia" em Especialidade | Campo Médico é habilitado com cardiologistas |
| 5 | Selecionar um médico cardiologista | Campo Data é habilitado |
| 6 | Selecionar data futura válida | Campo Horário é habilitado |
| 7 | Selecionar horário disponível | Botão "Continuar" é habilitado |
| 8 | Clicar em "Continuar" | Resumo do agendamento aparece |
| 9 | Verificar dados no resumo | Dados estão corretos (médico, data, horário, tipo, especialidade) |
| 10 | Clicar em "Confirmar" | Agendamento é realizado |

**Pós-Condições:**
- Agendamento é criado no sistema
- Consulta aparece em "Meus Agendamentos"
- Horário fica indisponível para outros pacientes

---

### Caso de Teste 014
**ID:** CT014  
**Título:** Agendamento com campos obrigatórios não preenchidos  
**Prioridade:** Alta  
**Rastreabilidade:** CT02 (Agendamento) - US04

**Pré-Condições:**
- Usuário está logado no sistema
- Usuário está na tela de agendamento

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Deixar "Forma de Atendimento" sem seleção | Campo permanece vazio |
| 2 | Tentar selecionar outros campos | Campos seguintes permanecem desabilitados |
| 3 | Tentar clicar em "Continuar" | Botão permanece desabilitado |
| 4 | Selecionar forma de atendimento e deixar tipo vazio | Próximos campos continuam desabilitados |
| 5 | Verificar mensagem ou bloqueio | Todos os campos são obrigatórios e mensagem de erro é exibida |

**Pós-Condições:**
- Agendamento não é criado
- Sistema força preenchimento de campos obrigatórios
- Usuário pode completar o preenchimento

---

### Caso de Teste 015
**ID:** CT015  
**Título:** Agendamento com data inválida (passada ou fora do expediente)  
**Prioridade:** Alta  
**Rastreabilidade:** CT03 (Agendamento) - US04 + US10 + US12

**Pré-Condições:**
- Usuário está logado no sistema
- Usuário preencheu campos até data

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Tentar selecionar data passada | Data passada não está disponível para seleção |
| 2 | Tentar selecionar data fora do expediente | Data fora do expediente não está disponível |
| 3 | Verificar calendário | Apenas datas válidas são clicáveis |
| 4 | Verificar mensagem | "Mensagem de horários não disponíveis" |
| 5 | Verificar bloqueio | Agendamento não permitido |

**Pós-Condições:**
- Agendamento não é criado
- Sistema bloqueia datas inválidas
- Usuário pode selecionar data válida

---

### Caso de Teste 016
**ID:** CT016  
**Título:** Tentativa de agendamento duplo com mesmo médico no mesmo dia  
**Prioridade:** Alta  
**Rastreabilidade:** CT04 (Agendamento) - US13

**Pré-Condições:**
- Usuário está logado no sistema
- Usuário já possui agendamento com Dr. João Silva em 25/08/2025

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Iniciar novo agendamento | Tela de agendamento é exibida |
| 2 | Preencher campos até médico | Todos os campos são preenchidos |
| 3 | Selecionar "Dr. João Silva" | Médico é selecionado |
| 4 | Tentar selecionar data 25/08/2025 | Sistema deve impedir ou mostrar aviso |
| 5 | Tentar confirmar agendamento | Mensagem de erro exibida |
| 6 | Verificar mensagem | "Você já possui consulta com este médico nesta data" |
| 7 | Verificar não criação | Agendamento não realizado |

**Pós-Condições:**
- Segundo agendamento não é criado
- Sistema mantém regra de um agendamento por médico/dia
- Usuário pode escolher outra data ou médico

---

### Caso de Teste 017
**ID:** CT017  
**Título:** Conflito de horário - mesmo médico, mesmo horário  
**Prioridade:** Alta  
**Rastreabilidade:** CT05 (Agendamento) - US14

**Pré-Condições:**
- Usuário A está logado
- Dr. Silva tem agendamento às 14:00 de 25/08/2025 com outro paciente

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Iniciar agendamento | Tela de agendamento é exibida |
| 2 | Preencher campos até médico Dr. Silva | Campos são preenchidos |
| 3 | Selecionar data 25/08/2025 | Data é selecionada |
| 4 | Verificar horários disponíveis | Horário 14:00 não é exibido/está bloqueado |
| 5 | Tentar forçar seleção (se possível) | Sistema impede seleção |
| 6 | Verificar disponibilidade | Apenas horários livres são mostrados |

**Pós-Condições:**
- Horário conflitante não está disponível
- Sistema evita duplo agendamento
- Paciente pode escolher horário livre

---

### Caso de Teste 018
**ID:** CT018  
**Título:** Exibição do resumo antes da confirmação  
**Prioridade:** Média  
**Rastreabilidade:** CT06 (Agendamento) - US11

**Pré-Condições:**
- Usuário completou todos os campos do agendamento
- Clicou em "Continuar"

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Verificar exibição do resumo | Resumo é exibido na tela |
| 2 | Verificar dados do médico | Nome do médico está correto |
| 3 | Verificar data e horário | Data e horário estão corretos |
| 4 | Verificar tipo de consulta | Tipo de serviço está correto |
| 5 | Verificar especialidade | Especialidade está correta |
| 6 | Verificar forma de atendimento | Presencial/Online está correto |
| 7 | Verificar botões de ação | "Confirmar" e "Voltar" estão disponíveis |

**Pós-Condições:**
- Todas as informações são exibidas corretamente
- Usuário pode confirmar ou voltar para editar
- Dados estão íntegros

---

### Caso de Teste 019
**ID:** CT019  
**Título:** Cancelamento de agendamento existente  
**Prioridade:** Média  
**Rastreabilidade:** CT07 (Agendamento) - US15

**Pré-Condições:**
- Usuário está logado
- Usuário possui agendamento futuro válido para cancelamento
- Agendamento respeita prazo de cancelamento

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar "Meus Agendamentos" | Lista de consultas é exibida |
| 2 | Localizar consulta para cancelar | Consulta aparece com botão "Cancelar" |
| 3 | Clicar em "Cancelar" | Mensagem de confirmação exibida |
| 4 | Verificar dados na confirmação | Dados da consulta estão corretos |
| 5 | Clicar em "Confirmar Cancelamento" | Cancelamento é processado |
| 6 | Verificar mensagem de sucesso | Mensagem de confirmação aparece |
| 7 | Verificar remoção da lista | Agendamento é cancelado |

**Pós-Condições:**
- Agendamento é removido do sistema
- Horário volta a ficar disponível
- Usuário recebe confirmação

---

### Caso de Teste 020
**ID:** CT020  
**Título:** Mensagem de sucesso após agendamento válido  
**Prioridade:** Baixa  
**Rastreabilidade:** CT08 (Agendamento) - US05 - BUG02

**Pré-Condições:**
- Usuário completou agendamento válido
- Clicou em "Confirmar Agendamento"

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Confirmar agendamento válido | Agendamento é processado |
| 2 | Verificar mensagem de sucesso | **ESPERADO:** "Agendamento realizado com sucesso" |
| 3 | Verificar comportamento atual | **BUG:** Usuário é redirecionado direto para "Meus Agendamentos" |
| 4 | Verificar ausência da mensagem | **DEFEITO:** Mensagem de sucesso não é exibida |

**Pós-Condições:**
- **DEFEITO CONHECIDO:** Sistema não exibe mensagem de sucesso
- Agendamento é criado corretamente
- Bug registrado como BUG02

---

### Caso de Teste 021
**ID:** CT021  
**Título:** Agendamento presencial sem antecedência mínima (24 horas)  
**Prioridade:** Alta  
**Rastreabilidade:** CT09 (Agendamento) - US10 + US12

**Pré-Condições:**
- Usuário está logado
- Data/horário com menos de 24h disponível
- Forma de atendimento "Presencial" selecionada

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Selecionar "Presencial" | Opção é selecionada |
| 2 | Preencher campos até data | Campos são preenchidos |
| 3 | Tentar selecionar data com menos de 24h | Data não aparece disponível |
| 4 | Verificar calendário | Apenas datas com +24h são clicáveis |
| 5 | Verificar mensagem (se aplicável) | "Agendamento presencial requer antecedência mínima de 24 horas" |
| 6 | Tentar forçar agendamento | Sistema impede criação |

**Pós-Condições:**
- Agendamento não é criado
- Sistema mantém regra de 24h para presencial
- Usuário pode selecionar data válida

---

### Caso de Teste 022
**ID:** CT022  
**Título:** Agendamento online sem antecedência mínima (2 horas)  
**Prioridade:** Alta  
**Rastreabilidade:** CT10 (Agendamento) - US10 + US12

**Pré-Condições:**
- Usuário está logado
- Data/horário com menos de 2h disponível
- Forma de atendimento "Online" selecionada

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Selecionar "Online" | Opção é selecionada |
| 2 | Preencher campos até horário | Campos são preenchidos |
| 3 | Tentar selecionar horário com menos de 2h | Horário não aparece disponível |
| 4 | Verificar horários disponíveis | Apenas horários com +2h são mostrados |
| 5 | Verificar mensagem (se aplicável) | "Agendamento online requer antecedência mínima de 2 horas" |
| 6 | Tentar forçar agendamento | Sistema impede criação |

**Pós-Condições:**
- Agendamento não é criado
- Sistema mantém regra de 2h para online
- Usuário pode selecionar horário válido

---

### Caso de Teste 023
**ID:** CT023  
**Título:** Visualização de agendamentos do usuário  
**Prioridade:** Média  
**Rastreabilidade:** CT11 (Agendamento) - US21

**Pré-Condições:**
- Usuário está logado
- Usuário possui agendamentos no sistema

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Clicar em "Meus Agendamentos" | Página de agendamentos é exibida |
| 2 | Verificar listagem | Lista personalizada de consultas do paciente |
| 3 | Verificar informações exibidas | Médico, data, horário, especialidade, tipo |
| 4 | Verificar apenas agendamentos próprios | Apenas consultas do usuário logado são exibidas |
| 5 | Verificar ordenação | Agendamentos estão organizados (por data/horário) |
| 6 | Verificar botões de ação | Botões "Cancelar" aparecem quando aplicável |

**Pós-Condições:**
- Lista personalizada é exibida corretamente
- Apenas agendamentos do usuário são mostrados
- Interface permite ações sobre os agendamentos

---

### Caso de Teste 024
**ID:** CT024  
**Título:** Cancelamento de agendamento presencial dentro do prazo (24h)  
**Prioridade:** Média  
**Rastreabilidade:** CT12 (Agendamento) - US15

**Pré-Condições:**
- Usuário está logado
- Usuário possui agendamento presencial com mais de 24h de antecedência

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar "Meus Agendamentos" | Lista de consultas é exibida |
| 2 | Localizar consulta presencial futura (+24h) | Consulta aparece com botão "Cancelar" habilitado |
| 3 | Clicar em "Cancelar" | Modal de confirmação é exibido |
| 4 | Verificar informações no modal | Dados da consulta estão corretos |
| 5 | Clicar em "Confirmar Cancelamento" | Cancelamento realizado com sucesso |
| 6 | Verificar mensagem de sucesso | Mensagem de confirmação é exibida |
| 7 | Verificar remoção da lista | Consulta desaparece da lista |

**Pós-Condições:**
- Agendamento é cancelado com sucesso
- Horário volta a ficar disponível
- Sistema respeita regra de 24h para presencial

---

### Caso de Teste 025
**ID:** CT025  
**Título:** Cancelamento de agendamento online dentro do prazo (1h)  
**Prioridade:** Média  
**Rastreabilidade:** CT13 (Agendamento) - US15

**Pré-Condições:**
- Usuário está logado
- Usuário possui agendamento online com mais de 1h de antecedência

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar "Meus Agendamentos" | Lista de consultas é exibida |
| 2 | Localizar consulta online futura (+1h) | Consulta aparece com botão "Cancelar" habilitado |
| 3 | Clicar em "Cancelar" | Modal de confirmação é exibido |
| 4 | Verificar informações no modal | Dados da consulta estão corretos |
| 5 | Clicar em "Confirmar Cancelamento" | Cancelamento realizado com sucesso |
| 6 | Verificar mensagem de sucesso | Mensagem de confirmação é exibida |
| 7 | Verificar remoção da lista | Consulta desaparece da lista |

**Pós-Condições:**
- Agendamento é cancelado com sucesso
- Horário volta a ficar disponível
- Sistema respeita regra de 1h para online

---

### Caso de Teste 026
**ID:** CT026  
**Título:** Tentativa de cancelamento fora do prazo  
**Prioridade:** Alta  
**Rastreabilidade:** CT14 (Agendamento) - US15

**Pré-Condições:**
- Usuário está logado
- Usuário possui agendamento fora do prazo de cancelamento
- Presencial: menos de 24h | Online: menos de 1h

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar "Meus Agendamentos" | Lista de consultas é exibida |
| 2 | Localizar consulta fora do prazo | Consulta aparece sem botão "Cancelar" ou botão desabilitado |
| 3 | Tentar cancelar (se botão existir) | Sistema impede cancelamento |
| 4 | Verificar mensagem | "Cancelamento não permitido - prazo expirado" |
| 5 | Verificar permanência na lista | Agendamento permanece na lista |

**Pós-Condições:**
- Cancelamento não é permitido
- Sistema respeita regras de prazo
- Agendamento permanece válido

---

### Caso de Teste 027
**ID:** CT027  
**Título:** Data preenchida com caracteres inválidos  
**Prioridade:** Média  
**Rastreabilidade:** CT15 (Agendamento) - US10 - BUG03

**Pré-Condições:**
- Usuário está logado
- Usuário está na tela de agendamento
- Campo data está habilitado

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Clicar no campo data | Campo data recebe foco |
| 2 | Digitar caracteres inválidos: "abc123" | Sistema deveria validar entrada |
| 3 | Pressionar Enter | **ESPERADO:** Validação de formato |
| 4 | Verificar comportamento atual | **BUG:** Usuário é deslogado e redirecionado para login |
| 5 | Verificar mensagem esperada | "Formato de data inválido" (não aparece devido ao bug) |

**Pós-Condições:**
- **DEFEITO CONHECIDO:** Sistema desloga usuário ao pressionar Enter no campo data
- Bug registrado como BUG03
- Entrada inválida causa comportamento inesperado

---

### Caso de Teste 028
**ID:** CT028  
**Título:** Agendamento fora do horário de funcionamento (07:00-18:00)  
**Prioridade:** Alta  
**Rastreabilidade:** CT16 (Agendamento) - US12

**Pré-Condições:**
- Usuário está logado
- Usuário preencheu campos até seleção de horário

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Selecionar data válida | Campo horário é habilitado |
| 2 | Verificar horários disponíveis | Apenas horários entre 07:00-18:00 são exibidos |
| 3 | Tentar encontrar horário 06:00 | Horário não está disponível para seleção |
| 4 | Tentar encontrar horário 19:00 | Horário não está disponível para seleção |
| 5 | Verificar faixa de horários | Apenas horários dentro do expediente são mostrados |

**Pós-Condições:**
- Sistema limita horários ao funcionamento do hospital
- Horários fora do expediente não são oferecidos
- Regra de funcionamento é respeitada

---

### Caso de Teste 029
**ID:** CT029  
**Título:** Seleção em cascata - Forma → Tipo → Especialidade → Médico  
**Prioridade:** Alta  
**Rastreabilidade:** CT17 (Agendamento) - US06 + US07 + US08 + US09

**Pré-Condições:**
- Usuário está logado
- Usuário está na tela de agendamento

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Verificar estado inicial | Apenas "Forma de Atendimento" está habilitado |
| 2 | Selecionar "Presencial" | Campo "Tipo de Serviço" é habilitado |
| 3 | Verificar campos seguintes | Especialidade, Médico, Data e Horário permanecem desabilitados |
| 4 | Selecionar "Consulta de rotina" | Campo "Especialidade" é habilitado |
| 5 | Selecionar "Cardiologia" | Campo "Médico" é habilitado com cardiologistas |
| 6 | Verificar filtro de médicos | Apenas médicos da especialidade selecionada aparecem |
| 7 | Selecionar médico | Campo "Data" é habilitado |
| 8 | Selecionar data | Campo "Horário" é habilitado |

**Pós-Condições:**
- Campos são habilitados progressivamente
- Seleções anteriores filtram opções seguintes
- Fluxo em cascata funciona corretamente

---

## FUNCIONALIDADE: NAVEGAÇÃO

### Caso de Teste 030
**ID:** CT030  
**Título:** Visualização da página de Doutores  
**Prioridade:** Média  
**Rastreabilidade:** CT01 (Navegação) - US17

**Pré-Condições:**
- Sistema possui 15 médicos cadastrados em 5 especialidades
- Aplicação está em execução

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Clicar em "Nossos Doutores" | Página de médicos é exibida |
| 2 | Verificar carregamento da página | A página de doutores é exibida com 15 médicos em 5 especialidades |
| 3 | Verificar informações exibidas | Nome, especialidade e foto (se aplicável) são mostrados |
| 4 | Verificar distribuição por especialidades | Médicos estão distribuídos nas 5 especialidades |
| 5 | Verificar botões de ação | Botões "Ver Detalhes" e "Agendar Consulta" estão visíveis |

**Pós-Condições:**
- Página carrega todos os 15 médicos
- Informações são exibidas corretamente
- Interface permite interação com os médicos

---

### Caso de Teste 031
**ID:** CT031  
**Título:** Filtro de médicos por especialidade  
**Prioridade:** Média  
**Rastreabilidade:** CT02 (Navegação) - US18

**Pré-Condições:**
- Usuário está na página "Nossos Doutores"
- Médicos de diferentes especialidades estão carregados

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar filtros de especialidade | Filtros estão visíveis na página |
| 2 | Selecionar filtro "Cardiologia" | É exibido somente o(s) doutor(es) da especialidade filtrada |
| 3 | Verificar quantidade | 3 cardiologistas são exibidos |
| 4 | Selecionar filtro "Ortopedia" | É exibido somente o(s) doutor(es) de ortopedia |
| 5 | Selecionar "Todas as especialidades" | Todos os 15 médicos voltam a ser exibidos |

**Pós-Condições:**
- Filtro por especialidade funciona corretamente
- Apenas médicos da especialidade selecionada são mostrados
- Opção de "limpar filtro" retorna todos os médicos

---

### Caso de Teste 032
**ID:** CT032  
**Título:** Filtro de médicos por nome  
**Prioridade:** Média  
**Rastreabilidade:** CT03 (Navegação) - US18

**Pré-Condições:**
- Usuário está na página "Nossos Doutores"
- Campo de busca por nome está disponível

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar campo de busca por nome | Campo de busca está visível |
| 2 | Digitar "Silva" no campo de busca | É exibido somente o(s) doutor(es) que correspondem ao nome buscado |
| 3 | Verificar resultados da busca | Apenas médicos com "Silva" no nome são exibidos |
| 4 | Limpar campo de busca | Todos os médicos voltam a ser exibidos |
| 5 | Testar busca sem resultados | Digitar nome inexistente |
| 6 | Verificar comportamento | Mensagem "Nenhum médico encontrado" ou lista vazia |

**Pós-Condições:**
- Busca por nome funciona corretamente
- Sistema filtra médicos conforme texto digitado
- Limpeza do filtro restaura lista completa

---

### Caso de Teste 033
**ID:** CT033  
**Título:** Visualização da página Sobre Nós  
**Prioridade:** Baixa  
**Rastreabilidade:** CT04 (Navegação) - US19

**Pré-Condições:**
- Aplicação está em execução
- Menu de navegação está disponível

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar link "Sobre Nós" no menu | Link está visível no menu |
| 2 | Clicar em "Sobre Nós" | A página Sobre nós é exibida |
| 3 | Verificar conteúdo da página | Informações sobre o hospital são exibidas |
| 4 | Verificar navegação | Usuário pode navegar de volta para outras páginas |

**Pós-Condições:**
- Página "Sobre Nós" carrega corretamente
- Conteúdo informativo é exibido
- Navegação permanece funcional

---

### Caso de Teste 034
**ID:** CT034  
**Título:** Visualização da página Contato  
**Prioridade:** Baixa  
**Rastreabilidade:** CT05 (Navegação) - US20

**Pré-Condições:**
- Aplicação está em execução
- Menu de navegação está disponível

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar link "Contato" no menu | Link está visível no menu |
| 2 | Clicar em "Contato" | A página Contato é exibida |
| 3 | Verificar informações de contato | Telefone, email, endereço são exibidos |
| 4 | Verificar funcionalidade | Links de contato são clicáveis (se aplicável) |

**Pós-Condições:**
- Página "Contato" carrega corretamente
- Informações de contato são acessíveis
- Usuário pode entrar em contato com o hospital

---

### Caso de Teste 035
**ID:** CT035  
**Título:** Modal de detalhes do médico  
**Prioridade:** Média  
**Rastreabilidade:** CT06 (Navegação) - US22

**Pré-Condições:**
- Usuário está na página "Nossos Doutores"
- Médicos estão carregados na página

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar botão "Ver Detalhes" de um médico | Botão está visível no card do médico |
| 2 | Clicar em "Ver Detalhes" | Modal com informações completas é exibido |
| 3 | Verificar informações no modal | Formação, certificações, contato estão presentes |
| 4 | Verificar dados completos | Nome, especialidade, experiência, telefone |
| 5 | Verificar botão de fechar | Modal pode ser fechado |
| 6 | Fechar modal | Modal desaparece e página permanece funcional |

**Pós-Condições:**
- Modal exibe informações detalhadas do médico
- Todas as informações relevantes estão presentes
- Interface permite fechar modal normalmente

---

### Caso de Teste 036
**ID:** CT036  
**Título:** Agendamento direto via modal do médico  
**Prioridade:** Média  
**Rastreabilidade:** CT07 (Navegação) - US22

**Pré-Condições:**
- Usuário está visualizando modal de detalhes do médico
- Usuário está ou não logado no sistema

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Verificar botão "Agendar Consulta" no modal | Botão está presente no modal |
| 2 | Clicar em "Agendar Consulta" | Sistema verifica autenticação |
| 3a | Se usuário logado | Redireciona para tela de agendamento com médico pré-selecionado |
| 3b | Se usuário não logado | Redireciona para tela de login |
| 4 | Verificar pré-seleção (se logado) | Médico já está selecionado no formulário |

**Pós-Condições:**
- Botão redireciona corretamente conforme estado de autenticação
- Médico é pré-selecionado quando aplicável
- Fluxo de agendamento é otimizado

---

## FUNCIONALIDADE: PERSISTÊNCIA DE DADOS

### Caso de Teste 037
**ID:** CT037  
**Título:** Persistência de dados após cadastro e reinicialização  
**Prioridade:** Alta  
**Rastreabilidade:** CT01 (Persistência) - US23

**Pré-Condições:**
- Sistema está executando
- Usuário não cadastrado previamente

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Cadastrar novo usuário "Maria Silva" | Cadastro é realizado com sucesso |
| 2 | Verificar arquivo hospital-data.json | Dados do usuário são salvos no arquivo |
| 3 | Parar aplicação (Ctrl+C no servidor) | Aplicação é encerrada |
| 4 | Reiniciar aplicação (npm run start:backend) | Aplicação reinicia normalmente |
| 5 | Tentar fazer login com usuário "Maria Silva" | Dados do usuário permanecem salvos |
| 6 | Verificar login bem-sucedido | Login realizado com sucesso |

**Pós-Condições:**
- Dados do usuário sobrevivem à reinicialização
- Arquivo JSON mantém integridade
- Sistema recupera dados corretamente

---

### Caso de Teste 038
**ID:** CT038  
**Título:** Persistência de agendamentos após reinicialização  
**Prioridade:** Alta  
**Rastreabilidade:** CT02 (Persistência) - US23

**Pré-Condições:**
- Usuário está logado
- Agendamento foi criado com sucesso

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Criar agendamento válido | Agendamento é criado com sucesso |
| 2 | Verificar em "Meus Agendamentos" | Agendamento aparece na lista |
| 3 | Parar aplicação (Ctrl+C no servidor) | Aplicação é encerrada |
| 4 | Reiniciar aplicação | Aplicação reinicia normalmente |
| 5 | Fazer login e acessar "Meus Agendamentos" | Agendamentos permanecem salvos |
| 6 | Verificar dados do agendamento | Dados estão íntegros e corretos |

**Pós-Condições:**
- Agendamentos sobrevivem à reinicialização
- Dados permanecem íntegros
- Sistema mantém estado consistente

---

### Caso de Teste 039
**ID:** CT039  
**Título:** Atualização automática do arquivo hospital-data.json  
**Prioridade:** Média  
**Rastreabilidade:** CT03 (Persistência) - US23

**Pré-Condições:**
- Sistema está executando
- Arquivo hospital-data.json existe
- Usuário está logado

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Verificar timestamp do arquivo hospital-data.json | Anotar horário de modificação |
| 2 | Criar novo agendamento | Agendamento é criado com sucesso |
| 3 | Verificar timestamp do arquivo novamente | Arquivo hospital-data.json é atualizado automaticamente |
| 4 | Cancelar um agendamento | Cancelamento é realizado |
| 5 | Verificar nova atualização do arquivo | Arquivo é atualizado novamente |

**Pós-Condições:**
- Arquivo é atualizado a cada modificação de dados
- Sistema mantém dados sincronizados
- DataManager funciona corretamente

---

## FUNCIONALIDADE: COMPORTAMENTOS ESPECÍFICOS

### Caso de Teste 040
**ID:** CT040  
**Título:** Exibição de horários disponíveis após seleção de data  
**Prioridade:** Média  
**Rastreabilidade:** BUG04 - Defeito conhecido

**Pré-Condições:**
- Usuário está logado
- Usuário preencheu campos até data no agendamento

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Selecionar data válida | Data é selecionada |
| 2 | Verificar exibição automática de horários | **ESPERADO:** Horários aparecem automaticamente |
| 3 | Verificar comportamento atual | **BUG:** Horários só aparecem após clicar na tela |
| 4 | Clicar em qualquer lugar da tela | Horários são exibidos |

**Pós-Condições:**
- **DEFEITO CONHECIDO:** Horários não aparecem automaticamente
- Bug registrado como BUG04
- Workaround: clicar na tela força exibição

---

## RESUMO DE RASTREABILIDADE

### Por User Story:
- **US01 (Criar conta):** CT001-CT007
- **US02 (Acessar conta):** CT008-CT010, CT012
- **US03 (Sair da conta):** CT011
- **US04 (Realizar agendamento):** CT013-CT015, CT029
- **US05 (Mensagem de sucesso):** CT020
- **US06 (Forma de atendimento):** CT013, CT021-CT022, CT029
- **US07 (Tipo de serviço):** CT013, CT029
- **US08 (Especialidade médica):** CT013, CT029
- **US09 (Escolher médico):** CT013, CT029
- **US10 (Data e horário):** CT013, CT015, CT021-CT022, CT027
- **US11 (Resumo da consulta):** CT013, CT018
- **US12 (Impedir datas inválidas):** CT015, CT021-CT022, CT028
- **US13 (Alertar consultas duplas):** CT016
- **US14 (Conflito de horários):** CT017
- **US15 (Cancelar agendamento):** CT019, CT024-CT026
- **US17 (Página de médicos):** CT030
- **US18 (Filtrar médicos):** CT031-CT032
- **US19 (Página Sobre nós):** CT033
- **US20 (Página Contato):** CT034
- **US21 (Lista de consultas):** CT023
- **US22 (Detalhes do médico):** CT035-CT036
- **US23 (Persistência de dados):** CT037-CT039

### Por Defeito Conhecido:
- **BUG01:** CT007 (Nome com caracteres inválidos)
- **BUG02:** CT020 (Mensagem de sucesso não aparece)
- **BUG03:** CT027 (Enter no campo data desloga usuário)
- **BUG04:** CT040 (Horários só aparecem após clicar na tela)

### Por Camada de Teste:
- **UI + API:** 30 casos de teste
- **UI:** 6 casos de teste
- **API:** 3 casos de teste
- **E2E:** Todos os casos principais

**Total de Casos de Teste:** 40