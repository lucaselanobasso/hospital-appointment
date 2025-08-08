// Backend API para agendamento de consultas

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Dados em memória
let users = [];
let appointments = [];
let doctors = [
  { id: 1, name: 'Dr. João Silva', specialty: 'Cardiologia' },
  { id: 2, name: 'Dra. Maria Oliveira', specialty: 'Ortopedia' },
  { id: 3, name: 'Dr. Pedro Santos', specialty: 'Dermatologia' }
];

// Rotas de exemplo
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Usuário já cadastrado.' });
  }
  users.push({ name, email, password });
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }
  res.json({ success: true, user });
});

app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

app.post('/api/appointments', (req, res) => {
  const { userEmail, doctorId, date, time, type } = req.body;
  appointments.push({ userEmail, doctorId, date, time, type });
  res.json({ success: true });
});

app.get('/api/appointments/:userEmail', (req, res) => {
  const userAppointments = appointments.filter(a => a.userEmail === req.params.userEmail);
  res.json(userAppointments);
});

app.delete('/api/appointments/:index', (req, res) => {
  const idx = parseInt(req.params.index);
  if (appointments[idx]) {
    appointments.splice(idx, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Agendamento não encontrado.' });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
