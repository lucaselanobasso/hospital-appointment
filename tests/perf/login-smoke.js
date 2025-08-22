import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = { vus: 1, duration: '10s' }

export default function () {
  const url = `${__ENV.BASE_URL || 'http://localhost:3001'}/api/login`
  const payload = JSON.stringify({ email: 'joaopedro@gmail.com', password: 'joao12131senha', cpf: '10020030040' })
  const headers = { 'Content-Type': 'application/json' }
  const res = http.post(url, payload, { headers })
  check(res, { 'status is 200/401': r => [200,401].includes(r.status) })
  sleep(1)
}
