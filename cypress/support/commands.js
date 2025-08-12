// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("cadastro", (nome, cpf, email, senha) => {
  cy.get("#menuLogin").click()
  cy.url().should("include", "#login")
  cy.get("#linkCriarConta").click()
  cy.url().should("include", "#cadastro")
  cy.get("#name").type(nome)
  cy.get("#cpf").type(cpf)
  cy.get("#email").type(email)
  cy.get("#password").type(senha)
  cy.get("#btnCadastrar").click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
