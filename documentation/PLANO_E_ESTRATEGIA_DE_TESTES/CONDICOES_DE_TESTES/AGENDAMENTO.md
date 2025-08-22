# Condições de Teste e Camadas
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3*

### Funcionalidade: Agendamento (cobre US04, US05, US06, US07, US08, US09, US10, US11, US12, US13, US14, US15)

| ID | Condição | Resultado Esperado | US Relacionada | Camada |
|----|----------|-------------------|----------------|---------|
| CT01 | Agendamentos com informações válidas | Resumo do agendamento aparece e ao confirmar o agendamento é realizado | US04 + US11 | UI + API |
| CT02 | Agendamento com campos obrigatórios não preenchidos | Todos os campos são obrigatórios e mensagem de erro é exibida | US04 | UI + API |
| CT03 | Agendamento com data inválida (passada ou fora do expediente) | Mensagem de horários não disponíveis e agendamento não permitido | US04 + US10 + US12 | UI + API |
| CT04 | Agendamento de um paciente com o mesmo médico no mesmo dia mais de uma vez | Mensagem de erro exibida e agendamento não realizado | US13 | UI + API |
| CT05 | Agendamento de mais de um paciente no mesmo horário com o mesmo médico | Horário não é exibido/bloqueado e agendamento não realizado | US14 | UI |
| CT06 | Exibição do resumo antes da confirmação | Resumo exibido contendo médico, data, horário, tipo de consulta e especialidade | US11 | UI |
| CT07 | Cancelar agendamento existente | Mensagem de confirmação exibida e, ao confirmar, o agendamento é cancelado | US15 | UI + API |
| CT08 | Mensagem de sucesso após agendamento válido | Mensagem de sucesso exibida na tela | US05 | UI |
| CT09 | Agendamento presencial sem antecedência mínima (24 horas) | Mensagem de erro é exibida e agendamento não é efetuado | US10 + US12 | UI + API |
| CT10 | Agendamento online sem antecedência mínima (2 horas) | Mensagem de erro é exibida e agendamento não é efetuado | US10 + US12 | UI + API |
| CT11 | Visualização de agendamentos do usuário | Lista personalizada de consultas do paciente | US21 | UI + API |
| CT12 | Cancelamento de agendamento presencial dentro do prazo (24h) | Cancelamento realizado com sucesso | US15 | UI + API |
| CT13 | Cancelamento de agendamento online dentro do prazo (1h) | Cancelamento realizado com sucesso | US15 | UI + API |
| CT14 | Tentativa de cancelamento fora do prazo | Cancelamento não permitido | US15 | UI + API |
| CT15 | Data preenchida com caracteres inválidos | Mensagem de erro "Formato de data inválido" | US10 | UI + API |
| CT16 | Agendamento fora do horário de funcionamento (07:00-18:00) | Horário não disponível para seleção | US12 | UI + API |
| CT17 | Seleção em cascata: Forma → Tipo → Especialidade → Médico | Campos são habilitados progressivamente conforme seleção anterior | US06 + US07 + US08 + US09 | UI + API |