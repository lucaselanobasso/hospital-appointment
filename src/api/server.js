// Backend API para agendamento de consultas

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Dados em memória
let users = [
  {
    name: 'Lucas Basso',
    email: 'lucasbasso@gmail.com',
    password: '123456',
    cpf: '00100200304'
  },
  {
    name: 'Julio de Lima',
    email: 'juliodelima@gmail.com',
    password: '123456',
    cpf: '10020030040'
  },
  {
    name: 'Carlos Andrada',
    email: 'carlosandrada@gmail.com',
    password: '123456',
    cpf: '11122233344'
  }
];
let appointments = [];
let doctors = [
  { id: 1, name: 'Dr. João Silva', specialty: 'Cardiologia' },
  { id: 2, name: 'Dra. Maria Oliveira', specialty: 'Ortopedia' },
  { id: 3, name: 'Dr. Pedro Santos', specialty: 'Dermatologia' },
  { id: 4, name: 'Dr. Ana Costa', specialty: 'Cardiologia' },
  { id: 5, name: 'Dr. Lucas Lima', specialty: 'Ortopedia' },
  { id: 6, name: 'Dra. Fernanda Souza', specialty: 'Dermatologia' },
  { id: 7, name: 'Dr. Rafael Mendes', specialty: 'Pediatria' },
  { id: 8, name: 'Dra. Paula Borges', specialty: 'Pediatria' },
  { id: 9, name: 'Dr. Bruno Tavares', specialty: 'Ginecologia' },
  { id: 10, name: 'Dra. Carla Farias', specialty: 'Ginecologia' },
  { id: 11, name: 'Dr. Gustavo Nunes', specialty: 'Cardiologia' },
  { id: 12, name: 'Dra. Juliana Prado', specialty: 'Ortopedia' },
  { id: 13, name: 'Dr. Eduardo Ramos', specialty: 'Dermatologia' },
  { id: 14, name: 'Dra. Beatriz Martins', specialty: 'Pediatria' },
  { id: 15, name: 'Dr. Felipe Alves', specialty: 'Ginecologia' }
];

// Rotas de exemplo
// Rota para listar todos os usuários cadastrados (apenas para testes/desenvolvimento)

app.post('/api/register', (req, res) => {
  const { name, email, password, cpf } = req.body;
  if (!name || !email || !password || !cpf) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  // CPF: remover pontos e traço, validar 11 dígitos
  const cleanCpf = (cpf || '').replace(/\D/g, '');
  if (!cleanCpf || cleanCpf.length !== 11) {
    return res.status(400).json({ error: 'CPF deve conter 11 dígitos numéricos.' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Usuário já cadastrado com este e-mail.' });
  }
  if (users.find(u => u.cpf === cleanCpf)) {
    return res.status(400).json({ error: 'Usuário já cadastrado com este CPF.' });
  }
  users.push({ name, email, password, cpf: cleanCpf });
  res.json({ success: true, message: 'Cadastro realizado com sucesso!' });
});


app.post('/api/login', (req, res) => {
  const { email, password, cpf } = req.body;
  const cleanCpf = (cpf || '').replace(/\D/g, '');
  if (!cleanCpf || cleanCpf.length !== 11) {
    return res.status(401).json({ error: 'CPF deve conter 11 dígitos numéricos.' });
  }
  const user = users.find(u => u.email === email && u.password === password && u.cpf === cleanCpf);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas. Verifique e-mail, senha e CPF.' });
  }
  res.json({ success: true, user, message: 'Login realizado com sucesso!' });
});

app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});


app.post('/api/appointments', (req, res) => {
  const { userEmail, doctorId, date, time, type } = req.body;
  if (!userEmail || !doctorId || !date || !time || !type) {
    return res.status(400).json({ error: 'Todos os campos do agendamento são obrigatórios.' });
  }
  // Buscar dados do médico
  const doctor = doctors.find(d => d.id == doctorId);
  if (!doctor) {
    return res.status(400).json({ error: 'Médico não encontrado.' });
  }
  appointments.push({
    userEmail,
    doctorId,
    doctorName: doctor.name,
    specialty: doctor.specialty,
    date,
    time,
    type
  });
  res.json({ success: true, message: 'Agendamento realizado com sucesso!' });
});

app.get('/api/appointments/:userEmail', (req, res) => {
  const userAppointments = appointments.filter(a => a.userEmail === req.params.userEmail);
  res.json(userAppointments);
});


app.delete('/api/appointments/:index', (req, res) => {
  const idx = parseInt(req.params.index);
  if (appointments[idx]) {
    appointments.splice(idx, 1);
    res.json({ success: true, message: 'Agendamento cancelado com sucesso!' });
  } else {
    res.status(404).json({ error: 'Agendamento não encontrado.' });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
