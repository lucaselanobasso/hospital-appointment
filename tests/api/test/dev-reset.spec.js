const request = require('supertest')
const { expect } = require('chai')

const BASE = process.env.BASE_URL || 'http://localhost:3001'

describe('API - Dev tools', () => {
  it('POST /api/dev/reset-all deve retornar 200', async () => {
    const res = await request(BASE).post('/api/dev/reset-all')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
  })
  it('POST /api/dev/reset-appointments deve retornar 200', async () => {
    const res = await request(BASE).post('/api/dev/reset-appointments')
    expect(res.status).to.equal(200)
  })
  it('POST /api/dev/reset-users deve retornar 200', async () => {
    const res = await request(BASE).post('/api/dev/reset-users')
    expect(res.status).to.equal(200)
  })
})
