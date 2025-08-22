Cypress.Commands.add('agendarConsulta', (formaConsulta, tipoServico, especialidade, medico, getData, getHora) => {
     const dataValor = typeof getData === 'function' ? getData() : getData;
     const horaValor = typeof getHora === 'function' ? getHora() : getHora;

     cy.get('#btnAgendarHome').click()
     cy.get(formaConsulta).check()
     cy.get(`input[name="tipoServico"][value="${tipoServico}"]`).should('be.visible').check()
     cy.get(`input[name="especialidade"][value="${especialidade}"]`).should('be.visible').check()
     cy.get('#medico').should('not.be.disabled')
     cy.get('#medico').should('be.visible').select(medico)
     cy.get('#data').should('not.be.disabled')
     cy.get('#data').type(dataValor)
     cy.get('body').click()
     cy.get(`input[name="horario"][value="${horaValor}"]`).should('be.visible').check()
     cy.get('#btnResumoAgendamento').should('not.be.disabled').click()
     cy.get('#btnConfirmarAgendamento').should('be.visible').click()
 })