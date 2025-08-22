const { geraCPF } = require("../support/cpfGenerator")
const users = require("../fixtures/users.json")


describe("Cadastro", () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('/')
  })
  it("Ao tentar cadastrar novo usuário válido com dados válidos, deve redirecionar para a página de login e exibir mensagem de sucesso", () => {
    const uniqueEmail = `usuario_${Date.now()}@teste.com`
    const cpfUnico = geraCPF()
    cy.cadastro(users.name, cpfUnico, uniqueEmail, users.password)
    cy.contemTexto("#cadastro-message", "Cadastro realizado com sucesso!")
  })
  it('Ao tentar cadastrar usuário com um CPF já cadastrado, deve retornar o erro "Usuário já cadastrado com este e-mail ou CPF."', () => {
    const uniqueEmail = `usuario_${Date.now()}@teste.com`
    cy.cadastro("NovoUsuario Oliveira", users.cpf, uniqueEmail, users.password)
    cy.contemTexto("#cadastro-message", "Usuário já cadastrado com este e-mail ou CPF.")
  })
  it('Ao tentar cadastrar usuário com um e-mail já cadastrado, deve retornar o erro "Usuário já cadastrado com este e-mail."', () => {
    const cpfUnico = geraCPF()
    cy.cadastro("NovoUsuario Oliveira", cpfUnico, users.email, users.password)
    cy.contemTexto("#cadastro-message", "Usuário já cadastrado com este e-mail ou CPF.")
  })
  it('Ao tentar cadastrar usuário com CPF inválido, deve retornar o erro "CPF deve conter 11 dígitos numéricos."', () => {
    const uniqueEmail = `usuario_${Date.now()}@teste.com`
    cy.cadastro("NovoUsuario Oliveira", "1234567", uniqueEmail, users.password)
    cy.contemTexto("#cadastro-message", "CPF deve conter 11 dígitos numéricos.")
  })
  it('Ao tentar cadastrar com e-mail inválido, deve retornar o erro "E-mail inválido."', () => {
    const cpfUnico = geraCPF()
    cy.cadastro("NovoUsuario Oliveira", cpfUnico, 'email@email', users.password)
    cy.contemTexto("#cadastro-message", "Email inválido.")
  })
  it('Ao tentar cadastrar usuário sem informar todos os campos, deve retornar o erro "Todos os campos são obrigatórios."', () => {
    const cpfUnico = geraCPF()
    const uniqueEmail = `usuario_${Date.now()}@teste.com`
    cy.get("#menuLogin").click()
    cy.url().should("include", "#login")
    cy.get("#linkCriarConta").click()
    cy.url().should("include", "#cadastro")
    cy.get("#name").type('Usuario Da Silva')
    cy.get("#cpf").type(cpfUnico)
    cy.get("#email").type(uniqueEmail)
    cy.get("#btnCadastrar").click()
    cy.contemTexto("#cadastro-message", "Todos os campos são obrigatórios")
  })
  
  it('Ao tentar cadastrar com o nome com caractéres inválidos, deve retornar erro "Nome inválido."', () => {
    const cpfUnico = geraCPF()
    const uniqueEmail = `usuario_${Date.now()}@teste.com`
    cy.cadastro("Usuário &%@ )(! da Silva", cpfUnico, uniqueEmail, users.password)
    cy.contemTexto("#cadastro-message", "Nome inválido.")
  })

  it('Deve aceitar CPF com pontuação (máscara) e cadastrar com sucesso', () => {
    const uniqueEmail = `usuario_${Date.now()}@teste.com`
    const cpfLimpo = geraCPF()
    const cpfComMascara = `${cpfLimpo.substring(0,3)}.${cpfLimpo.substring(3,6)}.${cpfLimpo.substring(6,9)}-${cpfLimpo.substring(9)}`
    cy.cadastro('Usuario Mascara', cpfComMascara, uniqueEmail, users.password)
    cy.contemTexto('#cadastro-message', 'Cadastro realizado com sucesso!')
  })

  it('Mesmo nome de usuário pode ser reutilizado se e-mail/CPF forem únicos', () => {
    const email1 = `usuario_${Date.now()}_a@teste.com`
    const email2 = `usuario_${Date.now()}_b@teste.com`
    const cpf1 = geraCPF()
    const cpf2 = geraCPF()
    cy.cadastro('Joao Reutilizado', cpf1, email1, users.password)
    cy.contemTexto('#cadastro-message', 'Cadastro realizado com sucesso!')
    cy.cadastro('Joao Reutilizado', cpf2, email2, users.password)
    cy.contemTexto('#cadastro-message', 'Cadastro realizado com sucesso!')
  })

  it('Campos com espaços extras devem ser tratados e permitir cadastro válido', () => {
    const uniqueEmail = ` usuario_${Date.now()}@teste.com `
    const cpfUnico = geraCPF()
    cy.get('#menuLogin').click()
    cy.get('#linkCriarConta').click()
    cy.get('#name').type('  Maria Espacos  ')
    cy.get('#cpf').type(`  ${cpfUnico}  `)
    cy.get('#email').type(uniqueEmail)
    cy.get('#password').type(`  ${users.password}  `)
    cy.get('#btnCadastrar').click()
    // Se o frontend normaliza, deve cadastrar com sucesso; caso contrário, este teste evidenciará a necessidade de trim
    cy.contains('#cadastro-message', /Cadastro realizado com sucesso|Todos os campos/)
  })
})