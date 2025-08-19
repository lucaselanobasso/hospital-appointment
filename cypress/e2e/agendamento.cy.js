const { dataFutura, dataComHoras } = require('../support/dataUtils')
const users = require("../fixtures/users.json")

describe('Agendamento', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.visit("/")
    })
  it('Agendamento presencial válido deve ser realizado com sucesso', () => {
    const amanha = dataFutura(5)
    cy.login(users.email, users.cpf, users.password)
    cy.contemTexto("#login-message", "Login realizado com sucesso!")
    cy.contemTexto("#logoutBtn", "Sair")


    cy.get('#btnAgendarHome').click()
    cy.get('#formaAtendimento').select('Presencial')
    cy.get('#tipoConsulta').select('Exame')
    cy.get('#especialidade').select('Cardiologia')
    cy.get('#medico').select('Dr. João Silva')
    cy.get('#data').type(amanha)


    cy.get('#horario').select('16:00')
    cy.get('#btnAgendar').click()
    cy.contemTexto("#agendamento-message", "Agendamento realizado com sucesso!")
  })
})