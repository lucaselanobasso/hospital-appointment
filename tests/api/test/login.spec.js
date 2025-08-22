const request = require('supertest')
const { expect } = require('chai')

const URL_BASE = process.env.BASE_URL || 'http://localhost:3001'

describe('API - Login', function () {
  this.timeout(5000)

  beforeEach(async () => {
    await request(URL_BASE).post('/api/dev/reset-users')
  })

  it('deve recusar login com CPF inválido', async () => {
    const resposta = await request(URL_BASE)
      .post('/api/login')
      .send({ email: 'x@x.com', password: '123', cpf: '123' })
      .set('Accept', 'application/json')
    expect(resposta.status).to.be.oneOf([400, 401])
  })

  it('deve autenticar com credenciais válidas', async () => {
    const resposta = await request(URL_BASE)
      .post('/api/login')
      .send({ email: 'joaopedro@gmail.com', password: 'joao12131senha', cpf: '10020030040' })
    expect(resposta.status).to.equal(200)
    expect(resposta.body).to.have.property('success', true)
    expect(resposta.body).to.have.property('user')
    expect(resposta.body.user).to.include({ email: 'joaopedro@gmail.com', cpf: '10020030040' })
  })

  it('deve recusar senha inválida para usuário existente', async () => {
    const resposta = await request(URL_BASE)
      .post('/api/login')
      .send({ email: 'joaopedro@gmail.com', password: 'senha_errada', cpf: '10020030040' })
    expect(resposta.status).to.equal(401)
    expect(resposta.body).to.have.property('error')
  })
})
