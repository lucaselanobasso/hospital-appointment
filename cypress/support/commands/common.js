Cypress.Commands.add('contemTexto', (elemento, texto)=>{
    cy.get(elemento).should('contain', texto)
})

Cypress.Commands.add('resetBackend', () => {
    cy.request('POST', 'http://localhost:3001/api/dev/reset-all')
  })