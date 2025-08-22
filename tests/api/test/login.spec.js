const request = require('supertest')
const { expect } = require('chai')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'

describe('API - Login', function () {
  this.timeout(5000)

  it('deve recusar login com CPF inválido', async () => {
    const res = await request(BASE_URL)
      .post('/api/login')
      .send({ email: 'x@x.com', password: '123', cpf: '123' })
      .set('Accept', 'application/json')
    expect(res.status).to.be.oneOf([400, 401])
  })
})
