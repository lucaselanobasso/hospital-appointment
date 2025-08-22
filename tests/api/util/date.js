function isoDate(days = 0) {
  const d = new Date()
  d.setDate(d.getDate() + Number(days))
  return d.toISOString().split('T')[0]
}

function hhmm(hours = 0) {
  const d = new Date()
  d.setHours(d.getHours() + Number(hours))
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

const dataISO = isoDate
const horaMM = hhmm

module.exports = { isoDate, hhmm, dataISO, horaMM }
