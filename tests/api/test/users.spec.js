const request = require('supertest')
const { expect } = require('chai')

const URL_BASE = process.env.BASE_URL || 'http://localhost:3001'

async function resetarTudo() {
  await request(URL_BASE).post('/api/dev/reset-all')
}

describe('API - Usuários (dev)', () => {
  beforeEach(async () => {
    await resetarTudo()
  })

  it('GET /api/users deve retornar 200 e lista de usuários', async () => {
    const resposta = await request(URL_BASE).get('/api/users')
    expect(resposta.status).to.equal(200)
    expect(resposta.body).to.be.an('array')
    expect(resposta.body.length).to.be.greaterThan(0)
    const usuario = resposta.body[0]
    expect(usuario).to.have.property('name')
    expect(usuario).to.have.property('email')
    expect(usuario).to.have.property('cpf')
  })
})
