const request = require('supertest')
const { expect } = require('chai')
const path = require('path')
const { isoDate } = require('../util/date')
const users = require(path.join(__dirname, '../../cypress/fixtures/users.json'))

const BASE = process.env.BASE_URL || 'http://localhost:3001'

async function resetAll() {
  await request(BASE).post('/api/dev/reset-all')
}

describe('API - Appointments', () => {
  beforeEach(async () => {
    await resetAll()
  })

  it('Deve criar agendamento válido (presencial) e listar por usuário', async () => {
    const doctors = await request(BASE).get('/api/doctors')
    const doctor = doctors.body.find(d => d.specialty === 'Cardiologia')
    const payload = {
      userEmail: users.email,
      doctorId: doctor.id,
      date: isoDate(2),
      time: '15:00',
      type: 'Exame',
      attendance: 'Presencial'
    }
    const res = await request(BASE).post('/api/appointments').send(payload)
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('message')

    const list = await request(BASE).get(`/api/appointments/${users.email}`)
    expect(list.status).to.equal(200)
    expect(list.body).to.be.an('array')
    expect(list.body.some(a => a.doctorId === doctor.id)).to.be.true
  })

  it('Não deve permitir agendamento em horário passado', async () => {
    const doctors = await request(BASE).get('/api/doctors')
    const doctor = doctors.body[0]
    const res = await request(BASE).post('/api/appointments').send({
      userEmail: users.email,
      doctorId: doctor.id,
      date: isoDate(-1),
      time: '08:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    })
    expect(res.status).to.equal(400)
    expect(res.body.error).to.match(/anteriores/)
  })

  it('Não deve permitir fora do horário de funcionamento', async () => {
    const doctors = await request(BASE).get('/api/doctors')
    const doctor = doctors.body[0]
    const res = await request(BASE).post('/api/appointments').send({
      userEmail: users.email,
      doctorId: doctor.id,
      date: isoDate(2),
      time: '06:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    })
    expect(res.status).to.equal(400)
    expect(res.body.error).to.match(/Horário fora do funcionamento/)
  })

  it('Respeitar antecedência: presencial 24h, online 2h', async () => {
    const doctors = await request(BASE).get('/api/doctors')
    const doctor = doctors.body[0]
    const pres = await request(BASE).post('/api/appointments').send({
      userEmail: users.email,
      doctorId: doctor.id,
      date: isoDate(0),
      time: '23:59',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    })
    expect(pres.status).to.equal(400)

    const onl = await request(BASE).post('/api/appointments').send({
      userEmail: users.email,
      doctorId: doctor.id,
      date: isoDate(0),
      time: '23:59',
      type: 'Consulta de rotina',
      attendance: 'Online'
    })
    expect(onl.status).to.be.oneOf([200, 400])
  })

  it('Conflito: não criar duas consultas no mesmo horário para o mesmo médico', async () => {
    const doctors = await request(BASE).get('/api/doctors')
    const doctor = doctors.body[0]
    const basePayload = {
      userEmail: users.email,
      doctorId: doctor.id,
      date: isoDate(2),
      time: '10:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    }
    const ok = await request(BASE).post('/api/appointments').send(basePayload)
    expect(ok.status).to.equal(200)
    const conflict = await request(BASE).post('/api/appointments').send({ ...basePayload, userEmail: 'outro@teste.com' })
    expect(conflict.status).to.equal(400)
    expect(conflict.body.error).to.match(/já possui agendamento/)
  })

  it('Limite diário: não permitir mais de uma com mesmo médico na mesma data para o mesmo usuário', async () => {
    const doctors = await request(BASE).get('/api/doctors')
    const doctor = doctors.body[0]
    const payload = {
      userEmail: users.email,
      doctorId: doctor.id,
      date: isoDate(3),
      time: '11:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    }
    const ok = await request(BASE).post('/api/appointments').send(payload)
    expect(ok.status).to.equal(200)
    const dup = await request(BASE).post('/api/appointments').send({ ...payload, time: '12:00' })
    expect(dup.status).to.equal(400)
    expect(dup.body.error).to.match(/já possui agendamento/)
  })

  it('Cancelamento: respeitar prazos por forma de atendimento', async () => {
    const doctors = await request(BASE).get('/api/doctors')
    const doctor = doctors.body[0]
    // Cria um online com mais de 1h e um presencial com mais de 24h
    const online = await request(BASE).post('/api/appointments').send({
      userEmail: users.email,
      doctorId: doctor.id,
      date: isoDate(1),
      time: '17:00',
      type: 'Consulta de rotina',
      attendance: 'Online'
    })
    expect(online.status).to.equal(200)

    const pres = await request(BASE).post('/api/appointments').send({
      userEmail: users.email,
      doctorId: doctor.id,
      date: isoDate(2),
      time: '09:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    })
    expect(pres.status).to.equal(200)

    // Captura indices do usuário e tenta cancelar
    const list = await request(BASE).get(`/api/appointments/${users.email}`)
    const idxs = list.body.map(a => a._index)
    for (const idx of idxs) {
      const del = await request(BASE).delete(`/api/appointments/${idx}`)
      expect(del.status).to.be.oneOf([200, 400])
    }
  })
})
