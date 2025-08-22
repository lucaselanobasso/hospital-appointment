describe('Páginas Institucionais', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('/')
  })

  it('CT033 - Página Sobre Nós deve ser exibida', () => {
    cy.contains('a', 'Sobre Nós').click()
    cy.contains('h2', 'Sobre nós')
  })

  it('CT034 - Página Contato deve ser exibida', () => {
    cy.contains('a', 'Contato').click()
    cy.contains(/Telefone|Email|Endere/)
  })
})
