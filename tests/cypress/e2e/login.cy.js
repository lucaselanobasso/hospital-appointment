const users = require("../fixtures/users.json")

describe("Login", () => {
  
  beforeEach(() => {
    cy.clearCookies()
    cy.visit("/")
  })
  describe("Login válido", () => {
    it("Ao preencher credenciais corretas e submeter o formulário, deve retornar mensagem de sucesso e ser encaminhado para a home já autenticado", () => {
      cy.login(users.email, users.cpf, users.password)
      cy.contemTexto("#login-message", "Login realizado com sucesso!")
      cy.contemTexto("#logoutBtn", "Sair")
    })
  })

  describe("Login inválido", () => {
    it("Ao preencher credenciais incorretas e submeter o formulário, deve retornar mensagem de erro e usuário não é autenticado", () => {
      cy.login("email_inexistente@email.com", "12342131234", "senha")
      cy.contemTexto("#login-message", "Credenciais inválidas. Verifique e-mail, senha e CPF.")
    })
    it("Ao preencher e-mail inválido e submeter o formulário, deve retornar mensagem de erro e usuário não é autenticado", () => {
      cy.login("email@email", "12342131234", "senha")
      cy.contemTexto("#login-message", "Email inválido.")
    })
    it("Ao preencher CPF inválido e submeter o formulário, deve retornar mensagem de erro e usuário não é autenticado", () => {
      cy.login(users.email, "1234", users.password)
      cy.contemTexto("#login-message", "CPF deve conter 11 dígitos numéricos.")
    })

    it("Ao não preencher e-mail e submeter o formulário, deve retornar mensagem de erro e usuário não é autenticado", () => {
      cy.get("#menuLogin").click()
      cy.contains("h2", "Login")
      cy.get("#cpf").type(users.cpf)
      cy.get("#password").type(users.password)
      cy.get("#btnEntrar").click()
      cy.contemTexto("#login-message", "Todos os campos são obrigatórios")
    })
    it("Ao não preencher CPF e submeter o formulário, deve retornar mensagem de erro e usuário não é autenticado", () => {
      cy.get("#menuLogin").click()
      cy.contains("h2", "Login")
      cy.get("#email").type(users.email)
      cy.get("#password").type(users.password)
      cy.get("#btnEntrar").click()
      cy.contemTexto("#login-message", "Todos os campos são obrigatórios")
    })
    it("Ao não preencher senha e submeter o formulário, deve retornar mensagem de erro e usuário não é autenticado", () => {
      cy.get("#menuLogin").click()
      cy.contains("h2", "Login")
      cy.get("#email").type(users.email)
      cy.get("#cpf").type(users.cpf)
      cy.get("#btnEntrar").click()
      cy.contemTexto("#login-message", "Todos os campos são obrigatórios")
    })
    it('Ao tentar acessar funcionalidade sem login, deve redirecionar para a página de login', ()=>{
      cy.visit('/agendamento')
      cy.get('#menuLogin').should('be.visible')
    })
  })
  describe('Logout', ()=>{
    it('Ao clicar no nome do usuário e clicar em Sair, deve ser redirecionado para a página de login', ()=>{
      cy.login(users.email, users.cpf, users.password)
      cy.get('#userDropdown').click()
      cy.get('#logoutBtn').click()
      cy.get('#menuLogin').should('be.visible')
    })
    it('Após logout, tentar acessar agendamento deve exigir login novamente', () => {
      cy.login(users.email, users.cpf, users.password)
      cy.get('#userDropdown').click()
      cy.get('#logoutBtn').click()
      cy.visit('/agendamento')
      cy.get('#menuLogin').should('be.visible')
    })
  })
  
  describe('Proteção de rota', () => {
    it('Acessar Meus Agendamentos sem login deve redirecionar ao Login', () => {
      cy.visit('/')
      cy.contains('a', 'Meus Agendamentos').click({ force: true })
      cy.contains('h2', 'Login')
    })
  })
})
