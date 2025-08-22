Cypress.Commands.add('login', (email, cpf, senha) =>{
    cy.get('#menuLogin').click()
    cy.contains('h2', 'Login')
    cy.get('#email').type(email)
    cy.get('#cpf').type(cpf)
    cy.get('#password').type(senha)
    cy.get('#btnEntrar').click()
})