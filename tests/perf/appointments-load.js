import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
}

export default function () {
  const base = __ENV.BASE_URL || 'http://localhost:3001'
  const res = http.get(`${base}/api/doctors`)
  check(res, { 'status is 200': r => r.status === 200 })
  sleep(1)
}
