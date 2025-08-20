// Backend API para agendamento de consultas

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { swaggerUi, specs } = require('./swagger');
const dataManager = require('./dataManager');

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

// Dados persistidos via DataManager
// Removidos arrays em memória - agora usando dataManager

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
  if (dataManager.userExists(email, cleanCpf)) {
    return res.status(400).json({ error: 'Usuário já cadastrado com este e-mail ou CPF.' });
  }
  dataManager.addUser({ name, email, password, cpf: cleanCpf });
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
  const user = dataManager.findUser(email, cleanCpf);
  if (user && user.password !== password) {
    return res.status(401).json({ error: 'Credenciais inválidas. Verifique e-mail, senha e CPF.' });
  }
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
  res.json(dataManager.getDoctors());
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
  res.json(dataManager.getUsers());
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
  res.json(dataManager.getAppointments());
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
  const { userEmail, doctorId, date, time, type, attendance } = req.body;
  // 4. Validação de campos obrigatórios
  if (!userEmail || !doctorId || !date || !time || !type) {
    return res.status(400).json({ error: 'Todos os campos do agendamento são obrigatórios.' });
  }
  // Buscar dados do médico
  const doctor = dataManager.findDoctor(doctorId);
  if (!doctor) {
    return res.status(400).json({ error: 'Médico não encontrado.' });
  }
  // 5. Especialidade associada ao médico
  if (doctor.specialty !== req.body.specialty && req.body.specialty) {
    return res.status(400).json({ error: 'Médico não atende a especialidade selecionada.' });
  }
  // 6. Serviços compatíveis com a especialidade e forma de atendimento (compatível com o frontend)
  // Mantém retrocompatibilidade: se attendance não vier, validação é permissiva.
  const servicosFE = {
    'Cardiologia': {
      'Presencial': ['Exame', 'Consulta de rotina', 'Retorno'],
      'Online': ['Consulta de rotina', 'Retorno']
    },
    'Ortopedia': {
      'Presencial': ['Consulta de rotina', 'Retorno'],
      'Online': ['Consulta de rotina']
    },
    'Dermatologia': {
      'Presencial': ['Consulta de rotina', 'Retorno'],
      'Online': ['Consulta de rotina']
    },
    'Pediatria': {
      'Presencial': ['Consulta de rotina', 'Retorno'],
      'Online': ['Consulta de rotina']
    },
    'Ginecologia': {
      'Presencial': ['Exame', 'Consulta de rotina', 'Retorno'],
      'Online': ['Consulta de rotina']
    }
  };
  if (attendance && servicosFE[doctor.specialty]) {
    const disponiveis = servicosFE[doctor.specialty][attendance] || [];
    if (!disponiveis.includes(type)) {
      return res.status(400).json({ error: 'Serviço não disponível para esta especialidade/forma de atendimento.' });
    }
  }
  // 2. Datas e horários passados
  const now = new Date();
  const agendamentoDate = new Date(date + 'T' + time);
  if (agendamentoDate < now) {
    return res.status(400).json({ error: 'Não é permitido agendar para datas/horários anteriores ao momento atual.' });
  }
  // 8. Antecedência mínima de agendamento (24 horas presencial, 2 horas online)
  const diffMs = agendamentoDate - now;
  let antecedenciaMinimaMs = 24 * 60 * 60 * 1000; // 24 horas para presencial
  let mensagemAntecedencia = 'O agendamento presencial deve ser feito com pelo menos 24 horas de antecedência.';
  // Preferir attendance explícito; fallback para inferência antiga pelo type
  const isOnline = attendance ? attendance.toLowerCase() === 'online' : (type && type.toLowerCase().includes('online'));
  if (isOnline) {
    antecedenciaMinimaMs = 2 * 60 * 60 * 1000; // 2 horas para online
    mensagemAntecedencia = 'O agendamento online deve ser feito com pelo menos 2 horas de antecedência.';
  }
  
  if (diffMs < antecedenciaMinimaMs) {
    return res.status(400).json({ error: mensagemAntecedencia });
  }
  // 7. Horário de funcionamento do hospital (07:00 às 18:00)
  const hora = parseInt(time.split(':')[0], 10);
  if (hora < 7 || hora > 18) {
    return res.status(400).json({ error: 'Horário fora do funcionamento do hospital (07:00 às 18:00).' });
  }
  // 1. Conflito de horário: médico não pode ter dois agendamentos no mesmo horário
  if (dataManager.hasConflict(doctorId, date, time)) {
    return res.status(400).json({ error: 'Este médico já possui agendamento neste horário.' });
  }
  // 9. Limite diário por paciente: não pode agendar mais de uma consulta com o mesmo médico na mesma data
  if (dataManager.hasDailyLimit(userEmail, doctorId, date)) {
    return res.status(400).json({ error: 'Você já possui agendamento com este médico nesta data.' });
  }
  dataManager.addAppointment({
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
  const userAppointments = dataManager.getAppointmentsByUser(req.params.userEmail);
  res.json(userAppointments);
});

// Endpoint de reset para testes (disponível apenas fora de produção)
if (process.env.NODE_ENV !== 'production') {
  /**
   * @swagger
   * /api/dev/reset-appointments:
   *   post:
   *     summary: Resetar agendamentos (apenas dev/test)
   *     description: Remove todos os agendamentos. Disponível somente quando NODE_ENV !== 'production'.
   *     tags: [Desenvolvimento]
   *     responses:
   *       200:
   *         description: Agendamentos resetados
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   */
  app.post('/api/dev/reset-appointments', (req, res) => {
    dataManager.clearAppointments();
    res.json({ success: true, message: 'Agendamentos resetados.' });
  });
}

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
  const appointments = dataManager.getAppointments();
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
  dataManager.removeAppointment(idx);
  res.json({ success: true, message: 'Agendamento cancelado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
