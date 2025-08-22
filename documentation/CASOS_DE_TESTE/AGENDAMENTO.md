# Casos de Teste
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3 e no Plano de Estratégia de Testes*

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
**Rastreabilidade:** CT08 (Agendamento) - US05

**Pré-Condições:**
- Usuário completou agendamento válido
- Clicou em "Confirmar Agendamento"

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Confirmar agendamento válido | Agendamento é processado |
| 2 | Verificar mensagem de sucesso | "Agendamento realizado com sucesso" |

**Pós-Condições:**
- Agendamento é criado corretamente
- Mensagem de sucesso é exibida

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
**Rastreabilidade:** CT15 (Agendamento) - US10

**Pré-Condições:**
- Usuário está logado
- Usuário está na tela de agendamento
- Campo data está habilitado

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Clicar no campo data | Campo data recebe foco |
| 2 | Digitar caracteres inválidos: "abc123" | Sistema valida a entrada |
| 3 | Pressionar Enter | Validação de formato |
| 4 | Verificar mensagem | "Formato de data inválido" |

**Pós-Condições:**
- Usuário permanece autenticado
- Entrada inválida é rejeitada e mensagem é exibida
- Usuário pode corrigir a data e prosseguir

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
