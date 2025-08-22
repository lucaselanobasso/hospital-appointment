const { dataDDMMYYYY } = require('../support/dataUtils')
const users = require("../fixtures/users.json")

describe('Agendamento', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.request('POST', '/api/dev/reset-appointments')
        cy.visit("/")
        cy.login(users.email, users.cpf, users.password)
    })
    
    it('Agendamento presencial válido deve ser realizado com sucesso e usuário deve ser encaminhado para a página de meus agendamentos', () => {
        cy.agendarConsulta('#formaPresencial', 'Exame', 'Cardiologia', 'Dr. Ana Costa', dataDDMMYYYY(2), '15:00')
        cy.contemTexto("body","Agendamento realizado com sucesso!")
        cy.contains("h2","Meus Agendamentos")
    })
    it('Agendamento online válido deve ser realizado com sucesso e usuário deve ser encaminhado para a página de meus agendamentos', () => {
        cy.agendarConsulta('#formaOnline', 'Consulta de rotina', 'Dermatologia', 'Dr. Pedro Santos', dataDDMMYYYY(2), '15:00')
        cy.contemTexto("body","Agendamento realizado com sucesso!")
        cy.contains("h2","Meus Agendamentos")
    })
    it('Agendamento com campos obrigatórios vazios deve não permitir o clique no botão resumo', () => {
        cy.agendarConsulta('#formaPresencial', '', '', '', '', '')
        cy.get("#btnResumo").should("be.disabled")
    })
    
    it('Não deve permitir mais de um agendamento com o mesmo médico na mesma data (limite diário)', () => {
        // 1º agendamento OK
        cy.agendarConsulta('#formaPresencial', 'Consulta de rotina', 'Cardiologia', 'Dr. Ana Costa', dataDDMMYYYY(3), '11:00')
        cy.contemTexto('body', 'Agendamento realizado com sucesso!')
        cy.contains('h2', 'Meus Agendamentos')

        // 2º agendamento com mesmo médico e mesma data deve falhar
        cy.get('#menuHome').click()
        cy.agendarConsulta('#formaPresencial', 'Retorno', 'Cardiologia', 'Dr. Ana Costa', dataDDMMYYYY(3), '12:00')
        cy.contemTexto('body', 'já possui agendamento')
    })

    it('Cancelar consulta online com mais de 1h de antecedência deve ser permitido', () => {
        cy.agendarConsulta('#formaOnline', 'Consulta de rotina', 'Dermatologia', 'Dr. Pedro Santos', dataDDMMYYYY(1), '17:00')
        cy.contains('h2', 'Meus Agendamentos')
        cy.contains('button', 'Cancelar').first().click()
        cy.contemTexto('body', 'Agendamento cancelado com sucesso')
    })

    it('Campos obrigatórios: sem selecionar especialidade/médico/data/horário não habilita o resumo', () => {
        cy.get('#btnAgendarHome').click()
        cy.get('#formaPresencial').check()
        // Não seleciona tipo, especialidade, médico, data, horário
        cy.get('#btnResumoAgendamento').should('be.disabled')
    })

    it('Validação: não deve permitir agendamento em data passada', () => {
        cy.get('#btnAgendarHome').click()
        cy.get('#formaPresencial').check()
        cy.get('input[name="tipoServico"][value="Consulta de rotina"]').check()
        cy.get('input[name="especialidade"][value="Cardiologia"]').check()
        cy.get('#medico').select('Dr. Ana Costa')
        cy.get('#data').type(dataDDMMYYYY(-1))
        cy.get('body').click()
        cy.get('input[name="horario"][value="10:00"]').should('exist').check()
        cy.get('#btnResumoAgendamento').click()
        cy.get('#btnConfirmarAgendamento').click()
        cy.contemTexto('body', 'anteriores')
    })

    it('Regra de negócio: atendimento Online não permite Exame para Cardiologia', () => {
        // Serviço "Exame" só é permitido presencial para Cardiologia
        cy.agendarConsulta('#formaOnline', 'Exame', 'Cardiologia', 'Dr. Ana Costa', dataDDMMYYYY(4), '10:00')
        cy.contemTexto('body', 'Serviço não disponível para esta especialidade/forma de atendimento')
    })
})