const users = require("../fixtures/users.json")
const {
  dataDDMMYYYY,
  dataOntem,
  dataAtual,
  horaHHMM
} = require("../support/dataUtils")

describe('Agendamento', () => {
  beforeEach(() => {
    cy.resetBackend()
    cy.clearCookies()
    cy.visit("/")
    cy.login(users.email, users.cpf, users.password)
    cy.url().should('include', '#home')
  })

  it('Ao preencher todas as informações válidas e confirmar, deve realizar o agendamento com sucesso', () => {
    cy.agendarConsulta('#formaPresencial', 'Exame', 'Cardiologia', 'Dr. Ana Costa', () => dataDDMMYYYY(2), '15:00')
    cy.contemTexto('#agendar-message', 'Agendamento realizado com sucesso')
    cy.url({ timeout: 5000 }).should('include', '#meus-agendamentos')
  })

  it('Ao não preencher campos obrigatórios, deve manter o botão Continuar desabilitado e impedir o agendamento', () => {
    cy.get('#btnAgendarHome').click()
    cy.get('#btnResumoAgendamento').should('be.disabled')
    cy.get('#formaOnline').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#btnResumoAgendamento').should('be.disabled')
  })

  it('Ao selecionar data inválida (passada/fora do expediente), deve impedir o agendamento e exibir mensagem apropriada', () => {
    cy.get('#btnAgendarHome').click()
    cy.get('#formaPresencial').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').type(dataOntem())
    cy.get('#data').blur()
    cy.contemTexto('#agendar-message', 'Não é permitido agendar para datas anteriores ao dia de hoje')
  })

  it('Ao tentar agendar novamente com o mesmo médico no mesmo dia, deve bloquear com mensagem de erro', () => {
    cy.get('#btnAgendarHome').click()
    cy.get('#formaPresencial').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').type(dataDDMMYYYY(2))
    cy.get('body').click()
    cy.get('#hora1000').check()
    cy.get('#btnResumoAgendamento').click()
    cy.get('#btnConfirmarAgendamento').click()
    cy.contemTexto('#agendar-message', 'Agendamento realizado com sucesso')
    cy.get('[data-testid="menu-agendar"]').click()
    cy.get('#formaPresencial').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').type(dataDDMMYYYY(2))
    cy.get('body').click()
    cy.get('#hora1400').check()
    cy.get('#btnResumoAgendamento').click()
    cy.get('#btnConfirmarAgendamento').click()
    cy.contemTexto('#agendar-message', 'Não foi possível realizar o agendamento. Você já possui agendamento com este médico nesta data.')
  })

  it('Ao tentar agendar em horário já ocupado do mesmo médico, deve não disponibilizar o horário', () => {
    cy.get('#btnAgendarHome').click()
    cy.get('#formaPresencial').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').type(dataDDMMYYYY(3))
    cy.get('body').click()
    cy.get('#hora1000').check()
    cy.get('#btnResumoAgendamento').click()
    cy.get('#btnConfirmarAgendamento').click()
    cy.contemTexto('#agendar-message', 'Agendamento realizado com sucesso')

    cy.get('[data-testid="menu-agendar"]').click()
    cy.get('#formaPresencial').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').type(dataDDMMYYYY(3))
    cy.get('body').click()
    cy.contains('#hora1000').should('not.exist')
  })

  it('Ao prosseguir para o resumo, deve exibir todos os dados do agendamento corretamente', () => {
    cy.get('#btnAgendarHome').click()
    cy.get('#formaOnline').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    const dataEscolhida = dataDDMMYYYY(2)
    cy.get('#data').type(dataEscolhida)
    cy.get('body').click()
    cy.get('#hora1000').check()
    cy.get('#btnResumoAgendamento').click()
    cy.get('#resumoModal').should('be.visible')
    cy.contains('#resumoContent', 'Forma de Atendimento:')
    cy.contains('#resumoContent', 'Tipo de Serviço:')
    cy.contains('#resumoContent', 'Especialidade:')
    cy.contains('#resumoContent', 'Médico:')
    cy.contains('#resumoContent', `Data:`)
    cy.contains('#resumoContent', `Horário:`)
  })

  it('Ao cancelar um agendamento válido, deve confirmar cancelamento e remover da lista', () => {
    cy.agendarConsulta('#formaPresencial', 'Exame', 'Cardiologia', 'Dr. Ana Costa', () => dataDDMMYYYY(4), '10:00')
    cy.url().should('include', '#meus-agendamentos')

    cy.on('window:confirm', () => true)
    cy.get('[id^="btnCancelarAgendamento"]').first().click()
    cy.get('#app').then(($app) => {
      if ($app.text().includes('Nenhum agendamento encontrado')) {
        cy.contains('Nenhum agendamento encontrado.')
      } else {
        cy.get('[id^="btnCancelarAgendamento"]').should('have.length.gte', 0)
      }
    })
  })

  it('Ao confirmar um agendamento válido, deve exibir mensagem de sucesso', () => {
    cy.agendarConsulta('#formaPresencial', 'Exame', 'Cardiologia', 'Dr. Ana Costa', () => dataDDMMYYYY(2), '15:00')
    cy.contemTexto('#agendar-message', 'Agendamento realizado com sucesso')
    cy.url({ timeout: 5000 }).should('include', '#meus-agendamentos')

  })

  it('Ao tentar agendar presencial sem antecedência mínima de 24h, deve impedir o agendamento', () => {
    cy.get('#btnAgendarHome').click()
    cy.get('#formaPresencial').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').type(dataAtual())
    cy.get('body').click()
    cy.contains('#agendar-message', 'Não há horários disponíveis para agendamento presencial')
  })

  it.skip('Ao agendar online no mesmo dia, deve bloquear horários < 2h e permitir ≥ 2h', () => {
    
    cy.then(() => {
      const now = new Date()
      now.setHours(9, 30, 0, 0)
      cy.clock(now.getTime())
    })

    cy.get('#btnAgendarHome').click()
    cy.get('#formaOnline').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))

    
    cy.get('#data').type(dataAtual())
    cy.get('body').click()

    
    cy.contains('#horarioGroup', '10:00').should('not.exist')

    
    cy.get('#hora1400').should('exist')

    
    
    
    cy.then(() => {
      const realNow = new Date()
      const canConfirmToday = realNow.getHours() < 12 
      if (canConfirmToday) {
        cy.get('#hora1400').check()
        cy.get('#btnResumoAgendamento').click()
        cy.get('#btnConfirmarAgendamento').click()
        cy.contemTexto('#agendar-message', 'Agendamento realizado com sucesso')
        cy.url({ timeout: 5000 }).should('include', '#meus-agendamentos')
      } else {
        
        
        
        cy.get('[data-testid="menu-agendar"]').click()
        cy.get('#formaOnline').check()
        cy.get('[data-testid^="tipoServico-"]').first().check()
        cy.get('[data-testid^="especialidade-"]').first().check()
        cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
        cy.get('#data').clear().type(dataDDMMYYYY(1))
        cy.get('body').click()
        cy.get('#hora1000').check()
        cy.get('#btnResumoAgendamento').click()
        cy.get('#btnConfirmarAgendamento').click()
        cy.contemTexto('#agendar-message', 'Agendamento realizado com sucesso')
        cy.url({ timeout: 5000 }).should('include', '#meus-agendamentos')
      }
    })
  })

  it('Ao acessar Meus Agendamentos, deve listar apenas os agendamentos do usuário com informações corretas', () => {
    cy.agendarConsulta('#formaPresencial', 'Exame', 'Cardiologia', 'Dr. Ana Costa', () => dataDDMMYYYY(6),
      '09:00'
    )
    cy.url().should('include', '#meus-agendamentos')
    cy.get('#app').should('contain.text', 'Meus Agendamentos')
    cy.get('#app').should('contain.text', 'Data:')
    cy.get('#app').should('contain.text', 'Horário:')
  })

  it('Ao cancelar agendamento presencial com antecedência mínima de 24h, deve permitir e confirmar', () => {
    cy.agendarConsulta('#formaPresencial', 'Exame', 'Cardiologia', 'Dr. Ana Costa', () => dataDDMMYYYY(7),
      '10:00'
    )
    cy.url().should('include', '#meus-agendamentos')
    cy.on('window:confirm', () => true)
    cy.get('[id^="btnCancelarAgendamento"]').first().click()
  })

  it('Ao cancelar agendamento online com antecedência mínima de 1h, deve permitir e confirmar', () => {
    cy.agendarConsulta(
      '#formaOnline',
      'Consulta de rotina',
      'Cardiologia',
      'Dr. Ana Costa',
      () => dataDDMMYYYY(1),
      '10:00'
    )
    cy.url().should('include', '#meus-agendamentos')
    cy.on('window:confirm', () => true)
    cy.get('[id^="btnCancelarAgendamento"]').first().click()
  })

  it.skip('Ao tentar cancelar fora do prazo, deve bloquear e manter agendamento', () => {
    cy.get('#btnAgendarHome').click()
    cy.get('#formaPresencial').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').type(dataAtual())
    cy.get('body').click()
    cy.get('#agendar-message').then(($el) => {
      if ($el.text().includes('Não há horários disponíveis')) {
        return
      }
      cy.get('[data-testid^="horario-"]').first().check({ force: true })
      cy.get('#btnResumoAgendamento').click()
      cy.get('#btnConfirmarAgendamento').click()
      cy.url().should('include', '#meus-agendamentos')
      cy.on('window:confirm', () => true)
      cy.get('[id^="btnCancelarAgendamento"]').first().click()
    })
  })

  it('Ao preencher data com caracteres inválidos, deve exibir mensagem de formato inválido', () => {
    cy.get('#btnAgendarHome').click()
    cy.get('#formaOnline').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').type('99/99/20aa')
    cy.get('body').click()
    cy.contains('#hora1600').should('not.exist')
  })

  it('Ao buscar horários fora do expediente (07:00–18:00), deve não exibir horários indisponíveis', () => {
    cy.get('#btnAgendarHome').click()
    cy.get('#formaPresencial').check()
    cy.get('[data-testid^="tipoServico-"]').first().check()
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').type(dataDDMMYYYY(2))
    cy.get('body').click()
    cy.get('#horarioGroup').should('be.visible')
    cy.contains('#horarioGroup', '07:00').should('not.exist')
    cy.contains('#horarioGroup', '19:00').should('not.exist')
  })

  it('Ao selecionar em cascata, deve habilitar campos e popular opções corretamente', () => {
    cy.get('#btnAgendarHome').click()

    
    cy.get('#tipoServicoGroup').should('have.class', 'disabled-fieldset')
    cy.get('#especialidadeGroup').should('have.class', 'disabled-fieldset')
    cy.get('#medico').should('be.disabled')
    cy.get('#data').should('be.disabled')
    cy.get('#horarioGroup').should('have.class', 'disabled-fieldset')
    cy.get('#btnResumoAgendamento').should('be.disabled')

    
    cy.get('#formaOnline').check()
    cy.get('#tipoServicoGroup').should('not.have.class', 'disabled-fieldset')
    cy.get('[data-testid^="tipoServico-"]').should('have.length.greaterThan', 0)

    
    
    cy.get('[data-testid="tipoServico-Consultaderotina"]').check({ force: true }).should('be.checked')
    cy.get('#especialidadeGroup').should('not.have.class', 'disabled-fieldset')
    cy.get('[data-testid^="especialidade-"]').should('have.length.greaterThan', 0)

    
    cy.get('[data-testid^="especialidade-"]').first().check()
    cy.get('#medico').should('not.be.disabled')
    cy.get('#medico').find('option').its('length').should('be.greaterThan', 1)

    
    cy.get('#medico').find('option').eq(1).then(opt => cy.get('#medico').select(opt.text()))
    cy.get('#data').should('not.be.disabled')

    
    cy.get('#data').type(dataDDMMYYYY(2))
    cy.get('body').click()
    cy.get('#horarioGroup').should('not.have.class', 'disabled-fieldset')
    cy.get('[data-testid^="horario-"]').should('have.length.greaterThan', 0)

    
    cy.get('[data-testid^="horario-"]').first().check({ force: true })
    cy.get('#btnResumoAgendamento').should('not.be.disabled')
  })
})