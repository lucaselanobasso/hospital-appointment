Cypress.Commands.add('contemTexto', (elemento, texto)=>{
    cy.get(elemento).should('contain', texto)
})