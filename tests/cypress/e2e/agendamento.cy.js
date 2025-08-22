describe('Agendamento', () => {
   beforeEach(() => {
    cy.clearCookies()
    cy.visit("/")
    cy.login(users.email, users.cpf, users.password)
   })
  it('Ao preencher todas as informações válidas e confirmar, deve realizar o agendamento com sucesso', () => {})

  it('Ao não preencher campos obrigatórios, deve manter o botão Continuar desabilitado e impedir o agendamento', () => {})

  it('Ao selecionar data inválida (passada/fora do expediente), deve impedir o agendamento e exibir mensagem apropriada', () => {})

  it('Ao tentar agendar novamente com o mesmo médico no mesmo dia, deve bloquear com mensagem de erro', () => {})

  it('Ao tentar agendar em horário já ocupado do mesmo médico, deve não disponibilizar o horário', () => {})

  it('Ao prosseguir para o resumo, deve exibir todos os dados do agendamento corretamente', () => {})

  it('Ao cancelar um agendamento válido, deve confirmar cancelamento e remover da lista', () => {})

  it('Ao confirmar um agendamento válido, deve exibir mensagem de sucesso', () => {})

  it('Ao tentar agendar presencial sem antecedência mínima de 24h, deve impedir o agendamento', () => {})

  it('Ao tentar agendar online sem antecedência mínima de 2h, deve impedir o agendamento', () => {})

  it('Ao acessar Meus Agendamentos, deve listar apenas os agendamentos do usuário com informações corretas', () => {})

  it('Ao cancelar agendamento presencial com antecedência mínima de 24h, deve permitir e confirmar', () => {})

  it('Ao cancelar agendamento online com antecedência mínima de 1h, deve permitir e confirmar', () => {})

  it('Ao tentar cancelar fora do prazo, deve bloquear e manter agendamento', () => {})

  it('Ao preencher data com caracteres inválidos, deve exibir mensagem de formato inválido', () => {})

  it('Ao buscar horários fora do expediente (07:00–18:00), deve não exibir horários indisponíveis', () => {})

  it('Ao selecionar em cascata (Forma → Tipo → Especialidade → Médico), deve habilitar campos progressivamente e filtrar opções', () => {})
})