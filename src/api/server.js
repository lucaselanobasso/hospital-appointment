// Backend API para agendamento de consultas

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { swaggerUi, specs } = require('./swagger');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, '../../public')));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Hospital Verde API'
}));

// Rota para servir index.html na raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

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
  { 
    id: 1, 
    name: 'Dr. João Silva', 
    specialty: 'Cardiologia',
    phone: '(11) 98765-4321',
    email: 'joao.silva@hospitalverde.com',
    crm: 'CRM/SP 123456',
    certificate: 'Especialista em Cardiologia - Sociedade Brasileira de Cardiologia',
    experience: '15 anos de experiência',
    description: 'Especialista em cardiologia clínica e intervencionista'
  },
  { 
    id: 2, 
    name: 'Dra. Maria Oliveira', 
    specialty: 'Ortopedia',
    phone: '(11) 98765-4322',
    email: 'maria.oliveira@hospitalverde.com',
    crm: 'CRM/SP 234567',
    certificate: 'Especialista em Ortopedia e Traumatologia - SBOT',
    experience: '12 anos de experiência',
    description: 'Especialista em cirurgia ortopédica e traumatologia'
  },
  { 
    id: 3, 
    name: 'Dr. Pedro Santos', 
    specialty: 'Dermatologia',
    phone: '(11) 98765-4323',
    email: 'pedro.santos@hospitalverde.com',
    crm: 'CRM/SP 345678',
    certificate: 'Especialista em Dermatologia - Sociedade Brasileira de Dermatologia',
    experience: '10 anos de experiência',
    description: 'Especialista em dermatologia clínica e cirúrgica'
  },
  { 
    id: 4, 
    name: 'Dr. Ana Costa', 
    specialty: 'Cardiologia',
    phone: '(11) 98765-4324',
    email: 'ana.costa@hospitalverde.com',
    crm: 'CRM/SP 456789',
    certificate: 'Especialista em Cardiologia - Sociedade Brasileira de Cardiologia',
    experience: '18 anos de experiência',
    description: 'Especialista em ecocardiografia e cardiologia preventiva'
  },
  { 
    id: 5, 
    name: 'Dr. Lucas Lima', 
    specialty: 'Ortopedia',
    phone: '(11) 98765-4325',
    email: 'lucas.lima@hospitalverde.com',
    crm: 'CRM/SP 567890',
    certificate: 'Especialista em Ortopedia e Traumatologia - SBOT',
    experience: '8 anos de experiência',
    description: 'Especialista em cirurgia do joelho e medicina esportiva'
  },
  { 
    id: 6, 
    name: 'Dra. Fernanda Souza', 
    specialty: 'Dermatologia',
    phone: '(11) 98765-4326',
    email: 'fernanda.souza@hospitalverde.com',
    crm: 'CRM/SP 678901',
    certificate: 'Especialista em Dermatologia - Sociedade Brasileira de Dermatologia',
    experience: '14 anos de experiência',
    description: 'Especialista em dermatologia estética e oncológica'
  },
  { 
    id: 7, 
    name: 'Dr. Rafael Mendes', 
    specialty: 'Pediatria',
    phone: '(11) 98765-4327',
    email: 'rafael.mendes@hospitalverde.com',
    crm: 'CRM/SP 789012',
    certificate: 'Especialista em Pediatria - Sociedade Brasileira de Pediatria',
    experience: '11 anos de experiência',
    description: 'Especialista em pediatria geral e neonatologia'
  },
  { 
    id: 8, 
    name: 'Dra. Paula Borges', 
    specialty: 'Pediatria',
    phone: '(11) 98765-4328',
    email: 'paula.borges@hospitalverde.com',
    crm: 'CRM/SP 890123',
    certificate: 'Especialista em Pediatria - Sociedade Brasileira de Pediatria',
    experience: '16 anos de experiência',
    description: 'Especialista em pediatria e adolescência'
  },
  { 
    id: 9, 
    name: 'Dr. Bruno Tavares', 
    specialty: 'Ginecologia',
    phone: '(11) 98765-4329',
    email: 'bruno.tavares@hospitalverde.com',
    crm: 'CRM/SP 901234',
    certificate: 'Especialista em Ginecologia e Obstetrícia - FEBRASGO',
    experience: '13 anos de experiência',
    description: 'Especialista em ginecologia e obstetrícia'
  },
  { 
    id: 10, 
    name: 'Dra. Carla Farias', 
    specialty: 'Ginecologia',
    phone: '(11) 98765-4330',
    email: 'carla.farias@hospitalverde.com',
    crm: 'CRM/SP 012345',
    certificate: 'Especialista em Ginecologia e Obstetrícia - FEBRASGO',
    experience: '20 anos de experiência',
    description: 'Especialista em ginecologia oncológica'
  },
  { 
    id: 11, 
    name: 'Dr. Gustavo Nunes', 
    specialty: 'Cardiologia',
    phone: '(11) 98765-4331',
    email: 'gustavo.nunes@hospitalverde.com',
    crm: 'CRM/SP 123457',
    certificate: 'Especialista em Cardiologia - Sociedade Brasileira de Cardiologia',
    experience: '9 anos de experiência',
    description: 'Especialista em arritmias cardíacas'
  },
  { 
    id: 12, 
    name: 'Dra. Juliana Prado', 
    specialty: 'Ortopedia',
    phone: '(11) 98765-4332',
    email: 'juliana.prado@hospitalverde.com',
    crm: 'CRM/SP 234568',
    certificate: 'Especialista em Ortopedia e Traumatologia - SBOT',
    experience: '7 anos de experiência',
    description: 'Especialista em cirurgia da coluna vertebral'
  },
  { 
    id: 13, 
    name: 'Dr. Eduardo Ramos', 
    specialty: 'Dermatologia',
    phone: '(11) 98765-4333',
    email: 'eduardo.ramos@hospitalverde.com',
    crm: 'CRM/SP 345679',
    certificate: 'Especialista em Dermatologia - Sociedade Brasileira de Dermatologia',
    experience: '22 anos de experiência',
    description: 'Especialista em dermatologia pediátrica'
  },
  { 
    id: 14, 
    name: 'Dra. Beatriz Martins', 
    specialty: 'Pediatria',
    phone: '(11) 98765-4334',
    email: 'beatriz.martins@hospitalverde.com',
    crm: 'CRM/SP 456780',
    certificate: 'Especialista em Pediatria - Sociedade Brasileira de Pediatria',
    experience: '6 anos de experiência',
    description: 'Especialista em pediatria e puericultura'
  },
  { 
    id: 15, 
    name: 'Dr. Felipe Alves', 
    specialty: 'Ginecologia',
    phone: '(11) 98765-4335',
    email: 'felipe.alves@hospitalverde.com',
    crm: 'CRM/SP 567891',
    certificate: 'Especialista em Ginecologia e Obstetrícia - FEBRASGO',
    experience: '17 anos de experiência',
    description: 'Especialista em reprodução humana'
  }
];

// Rotas da API

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Cadastrar novo usuário
 *     description: Registra um novo usuário no sistema
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Erro de validação ou usuário já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Fazer login
 *     description: Autentica um usuário no sistema
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Listar médicos
 *     description: Retorna a lista de todos os médicos disponíveis
 *     tags: [Médicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 */
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar usuários (desenvolvimento)
 *     description: Retorna lista de usuários cadastrados - apenas para desenvolvimento
 *     tags: [Desenvolvimento]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   cpf:
 *                     type: string
 */
app.get('/api/users', (req, res) => {
  res.json(users);
});

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Listar todos os agendamentos
 *     description: Retorna todos os agendamentos do sistema
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentResponse'
 */
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Criar agendamento
 *     description: Cria um novo agendamento de consulta
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Erro de validação ou conflito de horário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.post('/api/appointments', (req, res) => {
  const { userEmail, doctorId, date, time, type } = req.body;
  // 4. Validação de campos obrigatórios
  if (!userEmail || !doctorId || !date || !time || !type) {
    return res.status(400).json({ error: 'Todos os campos do agendamento são obrigatórios.' });
  }
  // Buscar dados do médico
  const doctor = doctors.find(d => d.id == doctorId);
  if (!doctor) {
    return res.status(400).json({ error: 'Médico não encontrado.' });
  }
  // 5. Especialidade associada ao médico
  if (doctor.specialty !== req.body.specialty && req.body.specialty) {
    return res.status(400).json({ error: 'Médico não atende a especialidade selecionada.' });
  }
  // 6. Serviços compatíveis com a especialidade (exemplo: só Cardiologia faz "Exame")
  const servicosPorEspecialidade = {
    'Cardiologia': ['Presencial', 'Exame', 'Consulta de rotina', 'Retorno'],
    'Ortopedia': ['Presencial', 'Consulta de rotina', 'Retorno'],
    'Dermatologia': ['Presencial', 'Consulta de rotina', 'Retorno'],
    'Pediatria': ['Presencial', 'Consulta de rotina', 'Retorno'],
    'Ginecologia': ['Presencial', 'Consulta de rotina', 'Retorno', 'Exame']
  };
  if (servicosPorEspecialidade[doctor.specialty] && !servicosPorEspecialidade[doctor.specialty].includes(type)) {
    return res.status(400).json({ error: 'Serviço não disponível para esta especialidade.' });
  }
  // 2. Datas e horários passados
  const now = new Date();
  const agendamentoDate = new Date(date + 'T' + time);
  if (agendamentoDate < now) {
    return res.status(400).json({ error: 'Não é permitido agendar para datas/horários anteriores ao momento atual.' });
  }
  // 8. Antecedência mínima de agendamento (24 horas)
  const diffMs = agendamentoDate - now;
  if (diffMs < 24 * 60 * 60 * 1000) {
    return res.status(400).json({ error: 'O agendamento deve ser feito com pelo menos 24 horas de antecedência.' });
  }
  // 7. Horário de funcionamento do hospital (07:00 às 18:00)
  const hora = parseInt(time.split(':')[0], 10);
  if (hora < 7 || hora > 18) {
    return res.status(400).json({ error: 'Horário fora do funcionamento do hospital (07:00 às 18:00).' });
  }
  // 1. Conflito de horário: médico não pode ter dois agendamentos no mesmo horário
  if (appointments.find(a => a.doctorId == doctorId && a.date === date && a.time === time)) {
    return res.status(400).json({ error: 'Este médico já possui agendamento neste horário.' });
  }
  // 9. Limite diário por paciente: não pode agendar mais de uma consulta com o mesmo médico na mesma data
  if (appointments.find(a => a.userEmail === userEmail && a.doctorId == doctorId && a.date === date)) {
    return res.status(400).json({ error: 'Você já possui agendamento com este médico nesta data.' });
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

/**
 * @swagger
 * /api/appointments/{userEmail}:
 *   get:
 *     summary: Listar agendamentos do usuário
 *     description: Retorna todos os agendamentos de um usuário específico
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: userEmail
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email do usuário
 *     responses:
 *       200:
 *         description: Lista de agendamentos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentResponse'
 */
app.get('/api/appointments/:userEmail', (req, res) => {
  const userAppointments = appointments.filter(a => a.userEmail === req.params.userEmail);
  res.json(userAppointments);
});


/**
 * @swagger
 * /api/appointments/{index}:
 *   delete:
 *     summary: Cancelar agendamento
 *     description: Cancela um agendamento específico
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice do agendamento na lista
 *     responses:
 *       200:
 *         description: Agendamento cancelado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Erro de validação ou prazo de cancelamento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.delete('/api/appointments/:index', (req, res) => {
  const idx = parseInt(req.params.index);
  const agendamento = appointments[idx];
  if (!agendamento) {
    return res.status(404).json({ error: 'Agendamento não encontrado.' });
  }
  // 10. Cancelamento: presencial até 24h antes, online até 1h antes
  const now = new Date();
  const agendamentoDate = new Date(agendamento.date + 'T' + agendamento.time);
  let antecedenciaCancelamentoMs = 24 * 60 * 60 * 1000;
  if (agendamento.type && agendamento.type.toLowerCase().includes('online')) {
    antecedenciaCancelamentoMs = 1 * 60 * 60 * 1000;
  }
  if (agendamentoDate - now < antecedenciaCancelamentoMs) {
    return res.status(400).json({ error: agendamento.type && agendamento.type.toLowerCase().includes('online')
      ? 'Cancelamento de consulta online só permitido até 1 hora antes.'
      : 'Cancelamento de consulta presencial só permitido até 24 horas antes.' });
  }
  appointments.splice(idx, 1);
  res.json({ success: true, message: 'Agendamento cancelado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
