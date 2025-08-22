// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//Relatorio de testes em HTML
import 'cypress-mochawesome-reporter/register'

// Resetar o backend antes de cada teste para isolar cenários
beforeEach(() => {
  // Se o backend estiver rodando em modo de teste, os dados são apenas em memória,
  // e este reset garante isolamento entre testes/suítes.
  cy.resetBackend()
})