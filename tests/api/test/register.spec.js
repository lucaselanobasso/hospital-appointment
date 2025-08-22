const request = require('supertest')
const { expect } = require('chai')

const URL_BASE = process.env.BASE_URL || 'http://localhost:3001'

describe('API - Registro', function () {
  this.timeout(5000)

  beforeEach(async () => {
    await request(URL_BASE).post('/api/dev/reset-users')
  })

  it('deve recusar cadastro com campos obrigatórios faltando', async () => {
    const resposta = await request(URL_BASE)
      .post('/api/register')
      .send({ name: 'Teste', email: 't@t.com' })
      .set('Accept', 'application/json')
    expect(resposta.status).to.equal(400)
    expect(resposta.body.error).to.match(/obrigatórios/i)
  })

  it('deve cadastrar usuário válido e recusar duplicidade por email/CPF', async () => {
    const ts = Date.now()
    const email = `user+${ts}@test.com`
    const cpf = String(ts).slice(-11).padStart(11, '0')

    const ok = await request(URL_BASE)
      .post('/api/register')
      .send({ name: 'Usuário Teste', email, password: '123456', cpf })
    expect(ok.status).to.equal(200)
    expect(ok.body).to.have.property('success', true)

    const dupEmail = await request(URL_BASE)
      .post('/api/register')
      .send({ name: 'Outro', email, password: '123456', cpf: '99988877766' })
    expect(dupEmail.status).to.equal(400)

    const dupCpf = await request(URL_BASE)
      .post('/api/register')
      .send({ name: 'Outro', email: `outro+${ts}@test.com`, password: '123456', cpf })
    expect(dupCpf.status).to.equal(400)
  })
})
