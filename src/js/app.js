// JS principal para SPA do hospital
// Controla navegação e renderização das páginas

const appDiv = document.getElementById('app');
let currentUser = null;

function renderPage(page) {
  switch(page) {
    case 'home':
      appDiv.innerHTML = `<div class='text-center'><h1 class='text-success'>Bem-vindo ao Hospital Verde</h1><p>Agende sua consulta de forma rápida e segura.</p><a href='#agendar' class='btn btn-success btn-lg'>Agendar Horário</a></div>`;
      break;
    case 'login':
      renderLogin();
      break;
    case 'cadastro':
      renderCadastro();
      break;
    case 'agendar':
      renderAgendar();
      break;
    case 'meus-agendamentos':
      renderMeusAgendamentos();
      break;
    case 'sobre':
      appDiv.innerHTML = `<div class='card'><div class='card-body'><h2 class='text-success'>Sobre Nós</h2><p>Hospital fictício dedicado ao seu bem-estar.</p></div></div>`;
      break;
    case 'contato':
      appDiv.innerHTML = `<div class='card'><div class='card-body'><h2 class='text-success'>Contato</h2><p>Telefone: (00) 1234-5678<br>Email: contato@hospitalverde.com</p></div></div>`;
      break;
    default:
      renderPage('home');
  }
}

window.addEventListener('hashchange', () => {
  const page = location.hash.replace('#', '') || 'home';
  renderPage(page);
});

renderPage(location.hash.replace('#', '') || 'home');

// Funções de renderização das páginas (login, cadastro, agendar, meus agendamentos)
// Renderização da página de Login
function renderLogin() {
  appDiv.innerHTML = `
    <div class='card mx-auto' style='max-width:400px;'>
      <div class='card-body'>
        <h2 class='text-success text-center'>Login</h2>
        <form id='loginForm'>
          <div class='mb-3'>
            <label for='email' class='form-label'>Email</label>
            <input type='email' class='form-control' id='email' required>
          </div>
          <div class='mb-3'>
            <label for='password' class='form-label'>Senha</label>
            <input type='password' class='form-control' id='password' required>
          </div>
          <button type='submit' class='btn btn-success w-100'>Entrar</button>
        </form>
        <div class='mt-3 text-center'>
          <a href='#cadastro' class='text-success'>Criar conta</a>
        </div>
        <div id='loginMsg' class='mt-2 text-danger text-center'></div>
      </div>
    </div>
  `;
  document.getElementById('loginForm').onsubmit = async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        currentUser = data.user;
        location.hash = 'home';
      } else {
        document.getElementById('loginMsg').textContent = data.error || 'Erro ao logar.';
      }
    } catch {
      document.getElementById('loginMsg').textContent = 'Erro de conexão.';
    }
  };
}

// Renderização da página de Cadastro
function renderCadastro() {
  appDiv.innerHTML = `
    <div class='card mx-auto' style='max-width:400px;'>
      <div class='card-body'>
        <h2 class='text-success text-center'>Cadastro</h2>
        <form id='cadastroForm'>
          <div class='mb-3'>
            <label for='name' class='form-label'>Nome</label>
            <input type='text' class='form-control' id='name' required>
          </div>
          <div class='mb-3'>
            <label for='email' class='form-label'>Email</label>
            <input type='email' class='form-control' id='email' required>
          </div>
          <div class='mb-3'>
            <label for='password' class='form-label'>Senha</label>
            <input type='password' class='form-control' id='password' required>
          </div>
          <button type='submit' class='btn btn-success w-100'>Cadastrar</button>
        </form>
        <div class='mt-3 text-center'>
          <a href='#login' class='text-success'>Já tenho conta</a>
        </div>
        <div id='cadastroMsg' class='mt-2 text-danger text-center'></div>
      </div>
    </div>
  `;
  document.getElementById('cadastroForm').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success) {
        location.hash = 'login';
      } else {
        document.getElementById('cadastroMsg').textContent = data.error || 'Erro ao cadastrar.';
      }
    } catch {
      document.getElementById('cadastroMsg').textContent = 'Erro de conexão.';
    }
  };
}

// Renderização da página de Agendar Consulta
function renderAgendar() {
  if (!currentUser) {
    location.hash = 'login';
    return;
  }
  appDiv.innerHTML = `<div class='text-center'><div class='spinner-border text-success'></div></div>`;
  fetch('http://localhost:3001/api/doctors')
    .then(res => res.json())
    .then(doctors => {
      const especialidades = [...new Set(doctors.map(d => d.specialty))];
      appDiv.innerHTML = `
        <div class='card mx-auto' style='max-width:500px;'>
          <div class='card-body'>
            <h2 class='text-success text-center'>Agendar Consulta</h2>
            <form id='agendarForm'>
              <div class='mb-3'>
                <label class='form-label'>Tipo de Consulta</label>
                <select class='form-select' id='tipoConsulta' required>
                  <option value='presencial'>Presencial</option>
                  <option value='online'>Online (Telemedicina)</option>
                </select>
              </div>
              <div class='mb-3'>
                <label class='form-label'>Especialidade</label>
                <select class='form-select' id='especialidade' required>
                  <option value=''>Selecione</option>
                  ${especialidades.map(e => `<option value='${e}'>${e}</option>`).join('')}
                </select>
              </div>
              <div class='mb-3'>
                <label class='form-label'>Médico</label>
                <select class='form-select' id='medico' required disabled></select>
              </div>
              <div class='mb-3'>
                <label class='form-label'>Data</label>
                <input type='date' class='form-control' id='data' required>
              </div>
              <div class='mb-3'>
                <label class='form-label'>Horário</label>
                <select class='form-select' id='horario' required disabled></select>
              </div>
              <button type='submit' class='btn btn-success w-100'>Confirmar</button>
            </form>
            <div id='agendarMsg' class='mt-2 text-danger text-center'></div>
          </div>
        </div>
      `;
      // Especialidade -> Médico
      document.getElementById('especialidade').onchange = function() {
        const esp = this.value;
        const medicos = doctors.filter(d => d.specialty === esp);
        const medicoSelect = document.getElementById('medico');
        medicoSelect.innerHTML = medicos.map(m => `<option value='${m.id}'>${m.name}</option>`).join('');
        medicoSelect.disabled = medicos.length === 0;
      };
      // Médico -> Horários disponíveis (simulação)
      document.getElementById('medico').onchange = function() {
        const horarios = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];
        const horarioSelect = document.getElementById('horario');
        horarioSelect.innerHTML = horarios.map(h => `<option value='${h}'>${h}</option>`).join('');
        horarioSelect.disabled = false;
      };
      document.getElementById('agendarForm').onsubmit = async function(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipoConsulta').value;
        const especialidade = document.getElementById('especialidade').value;
        const medicoId = document.getElementById('medico').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        if (!tipo || !especialidade || !medicoId || !data || !horario) return;
        try {
          const res = await fetch('http://localhost:3001/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: currentUser.email, doctorId: medicoId, date: data, time: horario, type: tipo })
          });
          const result = await res.json();
          if (result.success) {
            appDiv.innerHTML = `<div class='alert alert-success text-center'>Agendamento realizado com sucesso!<br>Você receberá uma confirmação fictícia.</div><a href='#meus-agendamentos' class='btn btn-success w-100'>Ver meus agendamentos</a>`;
          } else {
            document.getElementById('agendarMsg').textContent = 'Erro ao agendar.';
          }
        } catch {
          document.getElementById('agendarMsg').textContent = 'Erro de conexão.';
        }
      };
    });
}

// Renderização da página Meus Agendamentos
function renderMeusAgendamentos() {
  if (!currentUser) {
    location.hash = 'login';
    return;
  }
  appDiv.innerHTML = `<div class='text-center'><div class='spinner-border text-success'></div></div>`;
  fetch(`http://localhost:3001/api/appointments/${currentUser.email}`)
    .then(res => res.json())
    .then(agendamentos => {
      if (agendamentos.length === 0) {
        appDiv.innerHTML = `<div class='alert alert-info text-center'>Nenhum agendamento encontrado.</div>`;
        return;
      }
      let html = `<h2 class='text-success text-center mb-3'>Meus Agendamentos</h2>`;
      agendamentos.forEach((a, idx) => {
        html += `
          <div class='card mb-2'>
            <div class='card-body'>
              <strong>Especialidade:</strong> ${a.specialty || ''}<br>
              <strong>Médico:</strong> ${getDoctorName(a.doctorId)}<br>
              <strong>Tipo:</strong> ${a.type}<br>
              <strong>Data:</strong> ${a.date}<br>
              <strong>Horário:</strong> ${a.time}<br>
              <button class='btn btn-outline-danger btn-sm mt-2' onclick='cancelAgendamento(${idx})'>Cancelar</button>
            </div>
          </div>
        `;
      });
      appDiv.innerHTML = html;
    });
}

function getDoctorName(id) {
  // Simulação: nomes fixos
  if (id == 1) return 'Dr. João Silva';
  if (id == 2) return 'Dra. Maria Oliveira';
  if (id == 3) return 'Dr. Pedro Santos';
  return '';
}

window.cancelAgendamento = async function(idx) {
  if (!confirm('Deseja cancelar este agendamento?')) return;
  try {
    const res = await fetch(`http://localhost:3001/api/appointments/${idx}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      renderMeusAgendamentos();
    }
  } catch {}
};
