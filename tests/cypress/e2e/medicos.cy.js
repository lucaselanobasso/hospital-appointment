const { dataDDMMYYYY } = require('../support/dataUtils')

describe('Página de Médicos e Filtros', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('/')
  })

  it('CT030 - Deve exibir a página de Doutores', () => {
    cy.contains('a', 'Nossos Médicos').click()
    cy.contains('h2', 'Nossos Doutores')
  })

  it('CT031 - Filtro por especialidade deve funcionar', () => {
    cy.contains('a', 'Nossos Médicos').click()
    cy.get('#filtroEspecialidade').select('Cardiologia')
    cy.get('.doctor-card').each(($card) => {
      cy.wrap($card).should('contain.text', 'Cardiologia')
    })
  })

  it('CT032 - Filtro por nome deve funcionar', () => {
    cy.contains('a', 'Nossos Médicos').click()
    cy.get('#filtroNome').type('Ana')
    cy.get('.doctor-card').each(($card) => {
      cy.wrap($card).should('contain.text', 'Ana')
    })
  })

  it('CT035 - Modal de detalhes do médico deve abrir e fechar', () => {
    cy.contains('a', 'Nossos Médicos').click()
    cy.get('.doctor-card').first().within(() => {
      cy.contains('button', 'Ver Detalhes').click()
    })
    cy.get('.modal').should('be.visible')
    cy.get('.modal').within(() => {
      cy.contains(/Formação|Certificações|Contato/)
      cy.contains('button', 'Fechar').click()
    })
    cy.get('.modal').should('not.exist')
  })

  it('CT036 - Agendamento via modal deve redirecionar corretamente', () => {
    cy.contains('a', 'Nossos Médicos').click()
    cy.get('.doctor-card').first().within(() => {
      cy.contains('button', 'Ver Detalhes').click()
    })
    cy.get('.modal').should('be.visible')
    cy.get('.modal').within(() => {
      cy.contains('button', 'Agendar Consulta').click()
    })
    // Se autenticado, espera tela de agendamento; se não, tela de login
    cy.location('hash').then((hash) => {
      if (hash.includes('agendamento')) {
        cy.get('#medico').should('exist')
      } else {
        cy.contains('h2', 'Login')
      }
    })
  })
})
