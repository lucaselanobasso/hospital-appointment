const fs = require('fs');
const path = require('path');

class DataManager {
  constructor() {
    this.dataFile = path.join(__dirname, '../../data/hospital-data.json');
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const fileData = fs.readFileSync(this.dataFile, 'utf8');
        return JSON.parse(fileData);
      }
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    }

    // Dados iniciais padrão
    return {
      users: [
        {
          name: 'Joao Silva',
          email: 'joaosilva@gmail.com',
          password: '123456',
          cpf: '12345678911'
        },
        {
          name: 'Julio de Lima',
          email: 'juliodelima@gmail.com',
          password: '123456',
          cpf: '10020030040'
        }
      ],
      appointments: [],
      doctors: [
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
      ]
    };
  }

  saveData() {
    try {
      // Criar diretório se não existir
      const dir = path.dirname(this.dataFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(this.dataFile, JSON.stringify(this.data, null, 2));
      console.log('Dados salvos com sucesso');
      return true;
    } catch (error) {
      console.log('Erro ao salvar dados:', error);
      return false;
    }
  }

  // Métodos para usuários
  getUsers() {
    return this.data.users;
  }

  addUser(user) {
    this.data.users.push(user);
    this.saveData();
  }

  findUser(email, cpf) {
    return this.data.users.find(u => u.email === email && u.cpf === cpf);
  }

  userExists(email, cpf) {
    return this.data.users.some(u => u.email === email || u.cpf === cpf);
  }

  // Métodos para médicos
  getDoctors() {
    return this.data.doctors;
  }

  findDoctor(id) {
    return this.data.doctors.find(d => d.id == id);
  }

  // Métodos para agendamentos
  getAppointments() {
    return this.data.appointments;
  }

  addAppointment(appointment) {
    this.data.appointments.push(appointment);
    this.saveData();
  }

  getAppointmentsByUser(userEmail) {
    return this.data.appointments.filter(a => a.userEmail === userEmail);
  }

  removeAppointment(index) {
    if (index >= 0 && index < this.data.appointments.length) {
      this.data.appointments.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  hasConflict(doctorId, date, time) {
    return this.data.appointments.some(a => 
      a.doctorId == doctorId && a.date === date && a.time === time
    );
  }

  hasDailyLimit(userEmail, doctorId, date) {
    return this.data.appointments.some(a => 
      a.userEmail === userEmail && a.doctorId == doctorId && a.date === date
    );
  }
}

module.exports = new DataManager();
