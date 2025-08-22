const request = require('supertest')
const { expect } = require('chai')

const URL_BASE = process.env.BASE_URL || 'http://localhost:3001'

describe('API - Ferramentas de Dev', () => {
  it('POST /api/dev/reset-all deve retornar 200', async () => {
    const resposta = await request(URL_BASE).post('/api/dev/reset-all')
    expect(resposta.status).to.equal(200)
    expect(resposta.body).to.have.property('success', true)
  })
  it('POST /api/dev/reset-appointments deve retornar 200', async () => {
    const resposta = await request(URL_BASE).post('/api/dev/reset-appointments')
    expect(resposta.status).to.equal(200)
  })
  it('POST /api/dev/reset-users deve retornar 200', async () => {
    const resposta = await request(URL_BASE).post('/api/dev/reset-users')
    expect(resposta.status).to.equal(200)
  })
})
