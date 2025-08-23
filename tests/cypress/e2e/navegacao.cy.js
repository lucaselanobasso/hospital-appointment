const users = require("../fixtures/users.json")

describe('Navegação', () => {
  beforeEach(() => {
    cy.resetBackend()
    cy.clearCookies()
    cy.visit("/")
  })

  it('Ao acessar "Nossos Doutores", deve exibir a página com 15 médicos em 5 especialidades', () => {
    cy.get('#menuNossosDoutores').click()
    cy.url().should('include', '#nossos-doutores')
    cy.contains('h2', 'Nossos Doutores')
    cy.get('#doctorsList .card').should('have.length', 15)
    cy.contains('#doctorsList', 'Cardiologia')
    cy.contains('#doctorsList', 'Dermatologia')
    cy.contains('#doctorsList', 'Ortopedia')
    cy.contains('#doctorsList', 'Pediatria')
    cy.contains('#doctorsList', 'Ginecologia')
  })

  it('Ao filtrar médicos por especialidade, deve exibir apenas a especialidade selecionada e permitir limpar o filtro', () => {
    cy.get('#menuNossosDoutores').click()
    cy.get('#filtroEspecialidade').select('Cardiologia')
    cy.get('#doctorsList').within(() => {
      cy.contains('Cardiologia')
      cy.contains('Ortopedia').should('not.exist')
      cy.contains('Dermatologia').should('not.exist')
      cy.contains('Pediatria').should('not.exist')
      cy.contains('Ginecologia').should('not.exist')
    })
    cy.get('#filtroEspecialidade').select('')
    cy.get('#doctorsList .card').should('have.length', 15)
  })

  it('Ao filtrar médicos por nome, deve exibir apenas correspondentes; ao limpar, restaura a lista; sem resultados, informa ausência', () => {
    cy.get('#menuNossosDoutores').click()
    cy.get('#buscaNome').type('João')
    cy.get('#doctorsList .card').should('have.length.at.least', 1)
    cy.get('#doctorsList').should('contain.text', 'João')
    cy.get('#buscaNome').clear().type('Nome Inexistente 123')
    cy.contains('#doctorsList', 'Nenhum médico encontrado')
    cy.get('#buscaNome').clear()
    cy.get('#doctorsList .card').should('have.length', 15)
  })

  it('Ao acessar "Sobre Nós", deve exibir conteúdo institucional e manter a navegação', () => {
    cy.get('#menuSobre').click()
    cy.url().should('include', '#sobre')
    cy.contains('h2', 'Sobre Nós')
    cy.contains('.card-body', 'Hospital fictício')
    cy.get('#mainMenu').should('be.visible')
  })

  it('Ao acessar "Contato", deve exibir informações de contato acessíveis', () => {
    cy.get('#menuContato').click()
    cy.url().should('include', '#contato')
    cy.contains('h2', 'Contato')
    cy.contains('.card-body', 'Telefone')
    cy.contains('.card-body', 'Email')
  })

  it('Abrir e fechar o modal de detalhes do médico', () => {
    cy.get('[data-testid="menu-nossos-doutores"]').click()
    cy.get('[data-testid^="btn-ver-detalhes-"]').first().click()
    cy.get('[data-testid="doctor-modal"]').should('be.visible')
    cy.contains('[data-testid="doctor-modal"] button', 'Fechar').click()

    
    cy.get('.doctor-modal').should('not.exist')
  })

  it('Ao clicar em "Agendar Consulta" no modal, deve redirecionar para a página de login', () => {
    cy.get('#menuNossosDoutores').click()
    cy.get('#doctorsList .card').first().within(() => {
      cy.contains('Ver Detalhes').click()
    })
    cy.get('#doctorModal').should('be.visible')
    cy.contains('[data-testid="doctor-modal"] button', 'Agendar Consulta').click()
    cy.url().should('include', '#login' || '#agendar')
  })
})
