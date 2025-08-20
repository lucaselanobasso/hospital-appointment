const { dataDDMMYYYY } = require('../support/dataUtils')
const users = require("../fixtures/users.json")

describe('Agendamento', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.request('POST', '/api/dev/reset-appointments')
        cy.visit("/")
        cy.login(users.email, users.cpf, users.password)
    })
    
    it('Agendamento presencial válido deve ser realizado com sucesso e agendamento deve ser exibido na página de meus agendamentos', () => {
        cy.agendarConsulta('#formaPresencial', 'Exame', 'Cardiologia', 'Dr. Ana Costa', dataDDMMYYYY(2), '15:00')
        cy.contemTexto("body","Agendamento realizado com sucesso!")
        cy.contains("h2","Meus Agendamentos")
    })
    it('Agendamento online válido deve ser realizado com sucesso e agendamento deve ser exibido na página de meus agendamentos', () => {
        cy.agendarConsulta('#formaOnline', 'Consulta de rotina', 'Dermatologia', 'Dr. Pedro Santos', dataDDMMYYYY(2), '15:00')
        cy.contemTexto("body","Agendamento realizado com sucesso!")
        cy.contains("h2","Meus Agendamentos")
    })
})