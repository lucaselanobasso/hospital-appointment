const request = require('supertest')
const { expect } = require('chai')

const URL_BASE = process.env.BASE_URL || 'http://localhost:3001'

describe('API - Médicos', () => {
  it('GET /api/doctors deve retornar 200 e lista', async () => {
    const resposta = await request(URL_BASE).get('/api/doctors')
    expect(resposta.status).to.equal(200)
    expect(resposta.body).to.be.an('array')
    expect(resposta.body.length).to.be.greaterThan(0)
    expect(resposta.body[0]).to.have.property('name')
    expect(resposta.body[0]).to.have.property('specialty')
  })
})
