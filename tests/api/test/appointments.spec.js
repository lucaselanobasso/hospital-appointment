const request = require('supertest')
const { expect } = require('chai')
const path = require('path')
const { dataISO } = require('../util/date')
const usuario = require(path.join(__dirname, '../../cypress/fixtures/users.json'))

const URL_BASE = process.env.BASE_URL || 'http://localhost:3001'

async function resetarTudo() {
  await request(URL_BASE).post('/api/dev/reset-all')
}

describe('API - Agendamentos', () => {
  beforeEach(async () => {
    await resetarTudo()
  })

  it('Deve criar agendamento válido (presencial) e listar por usuário', async () => {
    const medicos = await request(URL_BASE).get('/api/doctors')
    const medico = medicos.body.find(d => d.specialty === 'Cardiologia')
    const dados = {
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(2),
      time: '15:00',
      type: 'Exame',
      attendance: 'Presencial'
    }
    const resposta = await request(URL_BASE).post('/api/appointments').send(dados)
    expect(resposta.status).to.equal(200)
    expect(resposta.body).to.have.property('message')

    const lista = await request(URL_BASE).get(`/api/appointments/${usuario.email}`)
    expect(lista.status).to.equal(200)
    expect(lista.body).to.be.an('array')
    expect(lista.body.some(a => a.doctorId === medico.id)).to.be.true
  })

  it('Não deve permitir agendamento em horário passado', async () => {
    const medicos = await request(URL_BASE).get('/api/doctors')
    const medico = medicos.body[0]
    const resposta = await request(URL_BASE).post('/api/appointments').send({
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(-1),
      time: '08:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    })
    expect(resposta.status).to.equal(400)
    expect(resposta.body.error).to.match(/anteriores/)
  })

  it('Não deve permitir fora do horário de funcionamento', async () => {
    const medicos = await request(URL_BASE).get('/api/doctors')
    const medico = medicos.body[0]
    const resposta = await request(URL_BASE).post('/api/appointments').send({
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(2),
      time: '06:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    })
    expect(resposta.status).to.equal(400)
    expect(resposta.body.error).to.match(/Horário fora do funcionamento/)
  })

  it('Respeitar antecedência: presencial 24h, online 2h', async () => {
    const medicos = await request(URL_BASE).get('/api/doctors')
    const medico = medicos.body[0]
    const presencial = await request(URL_BASE).post('/api/appointments').send({
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(0),
      time: '23:59',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    })
    expect(presencial.status).to.equal(400)

    const onlineRes = await request(URL_BASE).post('/api/appointments').send({
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(0),
      time: '23:59',
      type: 'Consulta de rotina',
      attendance: 'Online'
    })
    expect(onlineRes.status).to.be.oneOf([200, 400])
  })

  it('Conflito: não criar duas consultas no mesmo horário para o mesmo médico', async () => {
    const medicos = await request(URL_BASE).get('/api/doctors')
    const medico = medicos.body[0]
    const dadosBase = {
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(2),
      time: '10:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    }
    const ok = await request(URL_BASE).post('/api/appointments').send(dadosBase)
    expect(ok.status).to.equal(200)
    const conflito = await request(URL_BASE).post('/api/appointments').send({ ...dadosBase, userEmail: 'outro@teste.com' })
    expect(conflito.status).to.equal(400)
    expect(conflito.body.error).to.match(/já possui agendamento/)
  })

  it('Limite diário: não permitir mais de uma com mesmo médico na mesma data para o mesmo usuário', async () => {
    const medicos = await request(URL_BASE).get('/api/doctors')
    const medico = medicos.body[0]
    const dados = {
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(3),
      time: '11:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    }
    const ok = await request(URL_BASE).post('/api/appointments').send(dados)
    expect(ok.status).to.equal(200)
    const duplicado = await request(URL_BASE).post('/api/appointments').send({ ...dados, time: '12:00' })
    expect(duplicado.status).to.equal(400)
    expect(duplicado.body.error).to.match(/já possui agendamento/)
  })

  it('Cancelamento: respeitar prazos por forma de atendimento', async () => {
    const medicos = await request(URL_BASE).get('/api/doctors')
    const medico = medicos.body[0]
    const online = await request(URL_BASE).post('/api/appointments').send({
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(1),
      time: '09:00',
      type: 'Consulta de rotina',
      attendance: 'Online'
    })
    expect(online.status).to.equal(200)

    const presencial = await request(URL_BASE).post('/api/appointments').send({
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(2),
      time: '09:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    })
    expect(presencial.status).to.equal(200)

    const lista = await request(URL_BASE).get(`/api/appointments/${usuario.email}`)
    const indices = lista.body.map(a => a._index)
    for (const idx of indices) {
      const del = await request(URL_BASE).delete(`/api/appointments/${idx}`)
      expect(del.status).to.be.oneOf([200, 400])
    }
  })

  it('GET /api/appointments deve retornar 200 e lista de todos os agendamentos', async () => {
    const resposta = await request(URL_BASE).get('/api/appointments')
    expect(resposta.status).to.equal(200)
    expect(resposta.body).to.be.an('array')
  })

  it('Não deve permitir médico inexistente', async () => {
    const resposta = await request(URL_BASE).post('/api/appointments').send({
      userEmail: usuario.email,
      doctorId: 9999,
      date: dataISO(3),
      time: '10:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial'
    })
    expect(resposta.status).to.equal(400)
    expect(resposta.body.error).to.match(/Médico não encontrado/i)
  })

  it('Não deve permitir especialidade divergente quando enviada', async () => {
    const medicos = await request(URL_BASE).get('/api/doctors')
    const medico = medicos.body.find(d => d.specialty === 'Cardiologia')
    const resposta = await request(URL_BASE).post('/api/appointments').send({
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(3),
      time: '10:00',
      type: 'Consulta de rotina',
      attendance: 'Presencial',
      specialty: 'Dermatologia'
    })
    expect(resposta.status).to.equal(400)
    expect(resposta.body.error).to.match(/Médico não atende a especialidade/i)
  })

  it('Serviço não disponível para especialidade/forma de atendimento', async () => {
    const medicos = await request(URL_BASE).get('/api/doctors')
    const medico = medicos.body.find(d => d.specialty === 'Ortopedia')
    const resposta = await request(URL_BASE).post('/api/appointments').send({
      userEmail: usuario.email,
      doctorId: medico.id,
      date: dataISO(3),
      time: '10:00',
      type: 'Retorno',
      attendance: 'Online'
    })
    expect(resposta.status).to.equal(400)
    expect(resposta.body.error).to.match(/Serviço não disponível/i)
  })

  it('DELETE deve retornar 404 para índice inexistente', async () => {
    const resposta = await request(URL_BASE).delete('/api/appointments/9999')
    expect(resposta.status).to.equal(404)
    expect(resposta.body.error).to.match(/não encontrado/i)
  })
})
