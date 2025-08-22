describe('Navegação', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit("/")
  })
  it('Ao acessar "Nossos Doutores", deve exibir a página com 15 médicos em 5 especialidades', () => {})

  it('Ao filtrar médicos por especialidade, deve exibir apenas a especialidade selecionada e permitir limpar o filtro', () => {})

  it('Ao filtrar médicos por nome, deve exibir apenas correspondentes; ao limpar, restaura a lista; sem resultados, informa ausência', () => {})

  it('Ao acessar "Sobre Nós", deve exibir conteúdo institucional e manter a navegação', () => {})

  it('Ao acessar "Contato", deve exibir informações de contato acessíveis', () => {})

  it('Ao abrir o modal de detalhes do médico, deve exibir informações completas e permitir fechar', () => {})

  it('Ao clicar em "Agendar Consulta" no modal, deve redirecionar conforme autenticação e pré-selecionar o médico', () => {})
})
