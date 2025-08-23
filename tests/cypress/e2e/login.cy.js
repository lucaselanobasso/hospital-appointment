const users = require("../fixtures/users.json")

describe("Login", () => {
  
  beforeEach(() => {
    cy.clearCookies()
    cy.visit("/")
  })
  describe("Login válido", () => {
    it("Ao preencher credenciais válidas e submeter o formulário, deve exibir mensagem de sucesso e autenticar o usuário", () => {
      cy.login(users.email, users.cpf, users.password)
      cy.contemTexto("#login-message", "Login realizado com sucesso!")
      cy.contemTexto("#logoutBtn", "Sair")
    })
  })

  describe("Login inválido", () => {
    it("Ao preencher credenciais incorretas e submeter o formulário, deve exibir mensagem de erro e não autenticar o usuário", () => {
      cy.login("email_inexistente@email.com", "12342131234", "senha")
      cy.contemTexto("#login-message", "Credenciais inválidas. Verifique e-mail, senha e CPF.")
    })
    it("Ao preencher e-mail inválido e submeter o formulário, deve exibir mensagem de erro e não autenticar o usuário", () => {
      cy.login("email@email", "12342131234", "senha")
      cy.contemTexto("#login-message", "Email inválido.")
    })
    it("Ao preencher CPF inválido e submeter o formulário, deve exibir mensagem de erro e não autenticar o usuário", () => {
      cy.login(users.email, "1234", users.password)
      cy.contemTexto("#login-message", "CPF deve conter 11 dígitos numéricos.")
    })

    it("Ao não preencher e-mail e submeter o formulário, deve exibir mensagem de erro e não autenticar o usuário", () => {
      cy.get('[data-testid="menu-login"]').click()
      cy.contains("h2", "Login")
      cy.get("#cpf").type(users.cpf)
      cy.get("#password").type(users.password)
      cy.get("#btnEntrar").click()
      cy.contemTexto("#login-message", "Todos os campos são obrigatórios")
    })
    it("Ao não preencher CPF e submeter o formulário, deve exibir mensagem de erro e não autenticar o usuário", () => {
      cy.get('[data-testid="menu-login"]').click()
      cy.contains("h2", "Login")
      cy.get("#email").type(users.email)
      cy.get("#password").type(users.password)
      cy.get("#btnEntrar").click()
      cy.contemTexto("#login-message", "Todos os campos são obrigatórios")
    })
    it("Ao não preencher senha e submeter o formulário, deve exibir mensagem de erro e não autenticar o usuário", () => {
      cy.get('[data-testid="menu-login"]').click()
      cy.contains("h2", "Login")
      cy.get("#email").type(users.email)
      cy.get("#cpf").type(users.cpf)
      cy.get("#btnEntrar").click()
      cy.contemTexto("#login-message", "Todos os campos são obrigatórios")
    })
    it('Ao tentar acessar funcionalidade sem login, deve redirecionar para a página de login', ()=>{
      cy.visit('/#agendar')
      cy.get('[data-testid="menu-login"]').should('be.visible')
    })
  })
  describe('Logout', ()=>{
    it('Ao clicar no nome do usuário e selecionar Sair, deve desautenticar e redirecionar para a página de login', ()=>{
      cy.login(users.email, users.cpf, users.password)
      cy.get('#userDropdown').click()
      cy.get('[data-testid="menu-logout"]').click()
      cy.get('[data-testid="menu-login"]').should('be.visible')
    })
    it('Após logout, ao acessar agendamento, deve exigir login novamente', () => {
      cy.login(users.email, users.cpf, users.password)
      cy.get('#userDropdown').click()
      cy.get('[data-testid="menu-logout"]').click()
      cy.visit('/#agendar')
      cy.get('[data-testid="menu-login"]').should('be.visible')
    })
  })
  
})
