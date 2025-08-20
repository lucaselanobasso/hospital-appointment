const { dataFutura, dataComHoras } = require('../support/dataUtils')
const users = require("../fixtures/users.json")

describe('Agendamento', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.visit("/")
    })
    
    it('Agendamento presencial válido deve ser realizado com sucesso', () => {
        const amanha = dataFutura(5)
        
        // Login
        cy.login(users.email, users.cpf, users.password)
        cy.contemTexto("#login-message", "Login realizado com sucesso!")
        cy.contemTexto("#logoutBtn", "Sair")

        // Ir para agendamento
        cy.get('#btnAgendarHome').click()
        
        // 1. Forma de Atendimento - RADIO
        cy.get('#formaPresencial').check()
        
        // 2. Tipo de Serviço - RADIO (aguardar aparecer)
        cy.get('input[name="tipoServico"][value="Exame"]').should('be.visible').check()
        
        // 3. Especialidade - RADIO (aguardar aparecer)
        cy.get('input[name="especialidade"][value="Cardiologia"]').should('be.visible').check()
        
        // 4. Médico - DROPDOWN (aguardar aparecer)
        cy.get('#medico').should('not.be.disabled')
        cy.get('#medico').select('1') // Dr. João Silva tem ID 1
        
        // 5. Data - DD/MM/AAAA (aguardar aparecer)
        cy.get('#data').should('not.be.disabled')
        cy.get('#data').type(amanha)
        
        // 6. Horário - RADIO (aguardar aparecer após data)
        cy.get('input[name="horario"][value="16:00"]').should('be.visible').check()
        
        // Ver resumo
        cy.get('#btnResumoAgendamento').should('not.be.disabled').click()
        
        // Confirmar no modal
        cy.get('#btnConfirmarAgendamento').should('be.visible').click()
        
        // Verificar sucesso
        cy.contemTexto("#agendar-message", "Agendamento realizado com sucesso!")
        
        // Verificar redirecionamento para meus agendamentos
        cy.url().should('include', '#meus-agendamentos')
    })
    
    it('Deve validar preenchimento em cascata dos campos', () => {
        cy.login(users.email, users.cpf, users.password)
        cy.get('#btnAgendarHome').click()
        
        // Verificar que campos estão desabilitados inicialmente
        cy.get('#tipoServicoGroup').should('have.class', 'disabled-fieldset')
        cy.get('#especialidadeGroup').should('have.class', 'disabled-fieldset')
        cy.get('#medico').should('be.disabled')
        cy.get('#data').should('be.disabled')
        cy.get('#horarioGroup').should('have.class', 'disabled-fieldset')
        cy.get('#btnResumoAgendamento').should('be.disabled')
        
        // Selecionar forma de atendimento deve habilitar tipo de serviço
        cy.get('#formaPresencial').check()
        cy.get('#tipoServicoGroup').should('not.have.class', 'disabled-fieldset')
        
        // Selecionar tipo de serviço deve habilitar especialidade
        cy.get('input[name="tipoServico"][value="Consulta de rotina"]').check()
        cy.get('#especialidadeGroup').should('not.have.class', 'disabled-fieldset')
        
        // Selecionar especialidade deve habilitar médico
        cy.get('input[name="especialidade"][value="Cardiologia"]').check()
        cy.get('#medico').should('not.be.disabled')
        
        // Selecionar médico deve habilitar data
        cy.get('#medico').select('1')
        cy.get('#data').should('not.be.disabled')
    })
    
    it('Deve validar formato de data DD/MM/AAAA', () => {
        cy.login(users.email, users.cpf, users.password)
        cy.get('#btnAgendarHome').click()
        
        // Preencher até data
        cy.get('#formaPresencial').check()
        cy.get('input[name="tipoServico"][value="Consulta de rotina"]').check()
        cy.get('input[name="especialidade"][value="Cardiologia"]').check()
        cy.get('#medico').select('1')
        
        // Testar formatação automática
        cy.get('#data').type('25122024')
        cy.get('#data').should('have.value', '25/12/2024')
        
        // Testar data inválida
        cy.get('#data').clear().type('32/13/2024').blur()
        cy.contemTexto("#agendar-message", "Data inválida. Use o formato DD/MM/AAAA.")
    })
})