const request = require('supertest')
const { expect } = require('chai')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'

describe('API - Registro', function () {
  this.timeout(5000)

  it('deve recusar cadastro com campos obrigatórios faltando', async () => {
    const res = await request(BASE_URL)
      .post('/api/register')
      .send({ name: 'Teste', email: 't@t.com' })
      .set('Accept', 'application/json')
    expect(res.status).to.equal(400)
    expect(res.body.error).to.match(/obrigatórios/i)
  })
})
