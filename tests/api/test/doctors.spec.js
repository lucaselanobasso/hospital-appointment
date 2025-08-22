const request = require('supertest')
const { expect } = require('chai')

const BASE = process.env.BASE_URL || 'http://localhost:3001'

describe('API - Doctors', () => {
  it('GET /api/doctors deve retornar 200 e lista', async () => {
    const res = await request(BASE).get('/api/doctors')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body.length).to.be.greaterThan(0)
    expect(res.body[0]).to.have.property('name')
    expect(res.body[0]).to.have.property('specialty')
  })
})
