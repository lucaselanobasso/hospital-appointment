// JS principal para SPA do hospital
// Controla navegação e renderização das páginas

const appDiv = document.getElementById('app');
const API_BASE_URL = 'http://localhost:3001/api';
let currentUser = null;

// Utility functions
function showMessage(elementId, message, isSuccess = false) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.textContent = message;
  element.className = `mt-2 form-message${isSuccess ? ' form-message-success' : ''}`;
}

function showSpinner() {
  appDiv.innerHTML = `<div class='text-center'><div class='spinner-border text-success'></div></div>`;
}

async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    return await response.json();
  } catch (error) {
    throw new Error('Erro de conexão');
  }
}

function renderPage(page) {
  updateMenu();
  switch(page) {
    case 'home':
  appDiv.innerHTML = `<div class='text-center'><h1 class='text-success'>Bem-vindo ao Hospital Verde</h1><p>Agende sua consulta de forma rápida e segura.</p><div class='d-flex flex-column flex-md-row gap-3 justify-content-center'><a href='#agendar' class='btn btn-success btn-lg' id='btnAgendarHome'>Agendar Horário</a><a href='#nossos-doutores' class='btn btn-outline-success btn-lg' id='btnNossosDoutoresHome'>Nossos Doutores</a></div></div>`;
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
    case 'nossos-doutores':
      renderNossosDoutores();
      break;
    default:
      renderPage('home');
  }

}

function updateMenu() {
  const nav = document.querySelector('.navbar-nav');
  if (!nav) return;
  let menuHtml = `
    <li class="nav-item"><a class="nav-link text-white" href="#home" id="menuHome">Home</a></li>
    <li class="nav-item"><a class="nav-link text-white" href="#agendar" id="menuAgendar">Agendar</a></li>
    <li class="nav-item"><a class="nav-link text-white" href="#nossos-doutores" id="menuNossosDoutores">Nossos Doutores</a></li>`;
  
  // Only show "Meus Agendamentos" if user is logged in
  if (currentUser) {
    menuHtml += `<li class="nav-item"><a class="nav-link text-white" href="#meus-agendamentos" id="menuMeusAgendamentos">Meus Agendamentos</a></li>`;
  }
  
  menuHtml += `
    <li class="nav-item"><a class="nav-link text-white" href="#sobre" id="menuSobre">Sobre Nós</a></li>
    <li class="nav-item"><a class="nav-link text-white" href="#contato" id="menuContato">Contato</a></li>
  `;
  
  if (currentUser) {
    menuHtml += `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${currentUser.name}
        </a>
        <ul class="dropdown-menu" aria-labelledby="userDropdown">
          <li><a class="dropdown-item" href="#" id="logoutBtn">Sair</a></li>
        </ul>
      </li>`;
  } else {
    menuHtml += `<li class="nav-item"><a class="nav-link text-white" href="#login" id="menuLogin">Login</a></li>`;
  }
  
  nav.innerHTML = menuHtml;
  
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.onclick = function(e) {
      e.preventDefault();
      currentUser = null;
      location.hash = 'home';
      updateMenu();
    };
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
            <input type='text' class='form-control' id='email'>
          </div>
          <div class='mb-3'>
            <label for='cpf' class='form-label'>CPF</label>
            <input type='text' class='form-control' id='cpf' maxlength='11' placeholder='Somente números, 11 dígitos'>
          </div>
          <div class='mb-3'>
            <label for='password' class='form-label'>Senha</label>
            <input type='password' class='form-control' id='password'>
          </div>
          <button type='submit' class='btn btn-success w-100' id='btnEntrar'>Entrar</button>
        </form>
        <div class='mt-3 text-center'>
          <a href='#cadastro' class='text-success' id='linkCriarConta'>Criar conta</a>
        </div>
  <div id='login-message' class='mt-2 form-message'></div>
      </div>
    </div>
  `;
  document.getElementById('loginForm').onsubmit = async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const cpfInput = document.getElementById('cpf').value.trim();
    const password = document.getElementById('password').value.trim();
    showMessage('login-message', '');
    let cpf = cpfInput.replace(/\D/g, '');
    if (!email || !cpfInput || !password) {
      showMessage('login-message', 'Todos os campos são obrigatórios');
      return;
    }
    // Validação de email simples
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showMessage('login-message', 'Email inválido.');
      return;
    }
    if (cpf.length !== 11) {
      showMessage('login-message', 'CPF deve conter 11 dígitos numéricos.');
      return;
    }
    try {
      const data = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, cpf })
      });
      if (data.success) {
        currentUser = data.user;
        showMessage('login-message', data.message || 'Login realizado com sucesso!', true);
        setTimeout(() => { location.hash = 'home'; }, 1000);
      } else {
        showMessage('login-message', data.error || 'Erro ao logar.');
      }
    } catch (error) {
      showMessage('login-message', error.message);
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
            <input type='text' class='form-control' id='name'>
          </div>
          <div class='mb-3'>
            <label for='cpf' class='form-label'>CPF</label>
            <input type='text' class='form-control' id='cpf' maxlength='11' placeholder='Somente números, 11 dígitos'>
          </div>
          <div class='mb-3'>
            <label for='email' class='form-label'>Email</label>
            <input type='text' class='form-control' id='email'>
          </div>
          <div class='mb-3'>
            <label for='password' class='form-label'>Senha</label>
            <input type='password' class='form-control' id='password'>
          </div>
          <button type='submit' class='btn btn-success w-100' id='btnCadastrar'>Cadastrar</button>
        </form>
        <div class='mt-3 text-center'>
          <a href='#login' class='text-success' id='linkJaTenhoConta'>Já tenho conta</a>
        </div>
  <div id='cadastro-message' class='mt-2 form-message'></div>
      </div>
    </div>
  `;
  document.getElementById('cadastroForm').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const cpfInput = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    showMessage('cadastro-message', '');
    let cpf = cpfInput.replace(/\D/g, '');
    if (!name || !cpfInput || !email || !password) {
      showMessage('cadastro-message', 'Todos os campos são obrigatórios');
      return;
    }
    // Validação de email simples
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showMessage('cadastro-message', 'Email inválido.');
      return;
    }
    if (cpf.length !== 11) {
      showMessage('cadastro-message', 'CPF deve conter 11 dígitos numéricos.');
      return;
    }
    try {
      const data = await apiRequest('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, cpf })
      });
      if (data.success) {
        showMessage('cadastro-message', data.message || 'Cadastro realizado com sucesso! Redirecionando para a página de login...', true);
        setTimeout(() => { location.hash = 'login'; }, 1000);
      } else {
        showMessage('cadastro-message', data.error || 'Erro ao cadastrar.');
      }
    } catch (error) {
      showMessage('cadastro-message', error.message);
    }
  };
}

// Renderização da página de Agendar Consulta
function renderAgendar() {
  if (!currentUser) {
    location.hash = 'login';
    return;
  }
  showSpinner();
  fetch(`${API_BASE_URL}/doctors`)
    .then(res => res.json())
    .then(doctors => {
      const especialidades = [...new Set(doctors.map(d => d.specialty))];
      // Tipos de serviço dinâmicos
      const tiposServico = [
        'Presencial',
        'Online (Telemedicina)',
        'Retorno',
        'Exame',
        'Consulta de rotina',
        'Avaliação inicial',
        'Acompanhamento',
        'Urgência',
        'Orientação',
        'Vacinação'
      ];
      appDiv.innerHTML = `
        <div class='card mx-auto' style='max-width:500px;'>
          <div class='card-body'>
            <h2 class='text-success text-center'>Agendar Consulta</h2>
            <form id='agendarForm'>
              <div class='mb-3'>
                <label class='form-label'>Forma de Atendimento</label>
                <select class='form-select' id='formaAtendimento'>
                  <option value=''>Selecione</option>
                  <option value='Presencial'>Presencial</option>
                  <option value='Online'>Online</option>
                </select>
              </div>
              <div class='mb-3'>
                <label class='form-label'>Tipo de Serviço</label>
                <select class='form-select' id='tipoConsulta' disabled></select>
              </div>
              <div class='mb-3'>
                <label class='form-label'>Especialidade</label>
                <select class='form-select' id='especialidade' disabled></select>
              </div>
              <div class='mb-3'>
                <label class='form-label'>Médico</label>
                <select class='form-select' id='medico' disabled></select>
              </div>
              <div class='mb-3'>
                <label class='form-label'>Data</label>
                <input type='date' class='form-control' id='data' disabled>
              </div>
              <div class='mb-3'>
                <label class='form-label'>Horário</label>
                <select class='form-select' id='horario' disabled></select>
              </div>
              <button type='button' class='btn btn-success w-100' id='btnResumoAgendamento'>Resumo</button>
              <button type='submit' class='btn btn-primary w-100 mt-2' id='btnConfirmarAgendamento' style='display:none;'>Confirmar</button>
            </form>
            <div id='agendar-message' class='mt-2 form-message'></div>
            <div id='agendar-resumo' class='mt-3'></div>
          </div>
        </div>
      `;
      // Especialidade -> Médico
      const especialidadeSelect = document.getElementById('especialidade');
      const medicoSelect = document.getElementById('medico');
      const horarioSelect = document.getElementById('horario');

      // Serviços compatíveis por especialidade e forma de atendimento
      const servicosPorEspecialidade = {
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

      // Cascata de liberação de campos
      const formaAtendimento = document.getElementById('formaAtendimento');
      formaAtendimento.onchange = function() {
        tipoConsulta.innerHTML = '<option value="">Selecione</option>';
        tipoConsulta.disabled = true;
        especialidadeSelect.innerHTML = '<option value="">Selecione</option>';
        especialidadeSelect.disabled = true;
        medicoSelect.innerHTML = '';
        medicoSelect.disabled = true;
        horarioSelect.innerHTML = '';
        horarioSelect.disabled = true;
  const dataInput = document.getElementById('data');
  dataInput.value = '';
  dataInput.disabled = false;
  // Definir mínimo para hoje
  const hoje = new Date();
  const yyyy = hoje.getFullYear();
  const mm = String(hoje.getMonth() + 1).padStart(2, '0');
  const dd = String(hoje.getDate()).padStart(2, '0');
  dataInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
        if (formaAtendimento.value) {
          // Preencher tipos de serviço disponíveis para a forma selecionada
          let tiposDisponiveis = [];
          especialidades.forEach(e => {
            const servicos = servicosPorEspecialidade[e][formaAtendimento.value] || [];
            servicos.forEach(s => {
              if (!tiposDisponiveis.includes(s)) tiposDisponiveis.push(s);
            });
          });
          tipoConsulta.innerHTML = '<option value="">Selecione</option>' + tiposDisponiveis.map(t => `<option value='${t}'>${t}</option>`).join('');
          tipoConsulta.disabled = false;
        }
      };

      tipoConsulta.onchange = function() {
        especialidadeSelect.innerHTML = '<option value="">Selecione</option>';
        especialidadeSelect.disabled = true;
        medicoSelect.innerHTML = '';
        medicoSelect.disabled = true;
        horarioSelect.innerHTML = '';
        horarioSelect.disabled = true;
        document.getElementById('data').value = '';
        document.getElementById('data').disabled = false;
        if (tipoConsulta.value && formaAtendimento.value) {
          // Preencher especialidades compatíveis com o tipo de serviço e forma de atendimento
          const especialidadesCompativeis = especialidades.filter(e => {
            const servicos = servicosPorEspecialidade[e][formaAtendimento.value] || [];
            return servicos.includes(tipoConsulta.value);
          });
          especialidadeSelect.innerHTML = '<option value="">Selecione</option>' + especialidadesCompativeis.map(e => `<option value='${e}'>${e}</option>`).join('');
          especialidadeSelect.disabled = false;
        }
      };

      especialidadeSelect.onchange = function() {
        medicoSelect.innerHTML = '';
        medicoSelect.disabled = true;
        horarioSelect.innerHTML = '';
        horarioSelect.disabled = true;
        document.getElementById('data').value = '';
        document.getElementById('data').disabled = false;
        if (especialidadeSelect.value && tipoConsulta.value && formaAtendimento.value) {
          // Filtrar médicos por especialidade
          const medicos = doctors.filter(d => d.specialty === especialidadeSelect.value);
          if (medicos.length > 0) {
            medicoSelect.innerHTML = `<option value=''>Selecione</option>` + medicos.map(m => `<option value='${m.id}'>${m.name}</option>`).join('');
            medicoSelect.disabled = false;
            
            // Check if there's a pre-selected doctor from "Nossos Doutores" page
            const selectedDoctorId = sessionStorage.getItem('selectedDoctorId');
            if (selectedDoctorId && medicos.find(m => m.id == selectedDoctorId)) {
              medicoSelect.value = selectedDoctorId;
              sessionStorage.removeItem('selectedDoctorId'); // Clear after use
            }
          }
        }
      };

      medicoSelect.onchange = function() {
        horarioSelect.innerHTML = '';
        horarioSelect.disabled = true;
        document.getElementById('data').value = '';
        document.getElementById('data').disabled = false;
        // Definir mínimo para hoje
        const dataInput = document.getElementById('data');
        const hoje = new Date();
        const yyyy = hoje.getFullYear();
        const mm = String(hoje.getMonth() + 1).padStart(2, '0');
        const dd = String(hoje.getDate()).padStart(2, '0');
        dataInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
      };

      document.getElementById('data').onchange = function() {
        horarioSelect.innerHTML = '';
        horarioSelect.disabled = true;
        const dataSelecionada = this.value;
        if (!dataSelecionada) return;
        const hoje = new Date();
        const dataEscolhida = new Date(dataSelecionada + 'T00:00');
        const agora = new Date();
        if (dataEscolhida < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) {
          const msgDiv = document.getElementById('agendar-message');
          msgDiv.textContent = 'Não é permitido agendar para datas anteriores ao dia de hoje.';
          msgDiv.className = 'mt-2 form-message';
          return;
        }
        // Antecedência mínima depende da forma de atendimento
        let antecedenciaMinimaMs = 24 * 60 * 60 * 1000;
        if (formaAtendimento.value === 'Online') {
          antecedenciaMinimaMs = 2 * 60 * 60 * 1000;
        }
  // Não bloquear a data, pois a antecedência será validada por horário
  const msgDiv = document.getElementById('agendar-message');
  msgDiv.textContent = '';
        // Horários disponíveis do médico
        const horariosPadrao = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];
        fetch(`${API_BASE_URL}/appointments`)
          .then(res => res.json())
          .then(agendamentos => {
            const ocupados = agendamentos.filter(a => a.doctorId == medicoSelect.value && a.date === dataSelecionada).map(a => a.time);
            // Bloquear agendamento duplicado para o mesmo usuário
            const meusAgendamentos = agendamentos.filter(a => a.userEmail === currentUser.email && a.date === dataSelecionada);
            const now = new Date();
            let antecedenciaHorarioMs = 24 * 60 * 60 * 1000;
            if (formaAtendimento.value === 'Online') {
              antecedenciaHorarioMs = 2 * 60 * 60 * 1000;
            }
            const horariosDisponiveis = horariosPadrao.filter(h => {
              const hora = parseInt(h.split(':')[0], 10);
              if (hora < 7 || hora > 18) return false;
              const agendamentoDate = new Date(dataSelecionada + 'T' + h);
              if (agendamentoDate < now) return false;
              if (ocupados.includes(h)) return false;
              if (meusAgendamentos.find(a => a.time === h)) return false;
              // Antecedência mínima por tipo: considerar data e hora do agendamento
              // Permitir horários do dia seguinte se respeitar antecedência mínima
              if ((agendamentoDate.getTime() - now.getTime()) < antecedenciaHorarioMs) return false;
              return true;
            });
            horarioSelect.innerHTML = `<option value=''>Selecione</option>` + horariosDisponiveis.map(h => `<option value='${h}'>${h}</option>`).join('');
            horarioSelect.disabled = false;
            if (horariosDisponiveis.length === 0) {
              const msgDiv = document.getElementById('agendar-message');
              msgDiv.textContent = formaAtendimento.value === 'Online'
                ? 'Não há horários disponíveis para agendamento online com a antecedência mínima de 2 horas.'
                : 'Não há horários disponíveis para agendamento presencial com a antecedência mínima de 24 horas.';
              msgDiv.className = 'mt-2 form-message';
            }
          });
      };
      // Resumo antes da confirmação
      document.getElementById('btnResumoAgendamento').onclick = function() {
        const tipo = document.getElementById('tipoConsulta').value;
        const especialidade = document.getElementById('especialidade').value;
        const medicoId = document.getElementById('medico').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        const msgDiv = document.getElementById('agendar-message');
        msgDiv.textContent = '';
        msgDiv.className = 'mt-2 form-message';
        if (!tipo || !especialidade || !medicoId || !data || !horario) {
          msgDiv.textContent = 'Todos os campos são obrigatórios para visualizar o resumo.';
          return;
        }
        // Buscar nome do médico
        const medicoObj = doctors.find(d => d.id == medicoId);
        const medicoNome = medicoObj ? medicoObj.name : '';
        // Montar resumo
        const resumoDiv = document.getElementById('agendar-resumo');
        resumoDiv.innerHTML = `
          <div class='alert alert-info'>
            <strong>Resumo do Agendamento:</strong><br>
            <strong>Forma de Atendimento:</strong> ${formaAtendimento.value}<br>
            <strong>Tipo de Serviço:</strong> ${tipo}<br>
            <strong>Especialidade:</strong> ${especialidade}<br>
            <strong>Médico:</strong> ${medicoNome}<br>
            <strong>Data:</strong> ${data}<br>
            <strong>Horário:</strong> ${horario}<br>
          </div>
        `;
        document.getElementById('btnConfirmarAgendamento').style.display = '';
      };

      document.getElementById('agendarForm').onsubmit = async function(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipoConsulta').value;
        const especialidade = document.getElementById('especialidade').value;
        const medicoId = document.getElementById('medico').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        const msgDiv = document.getElementById('agendar-message');
        msgDiv.textContent = '';
        msgDiv.className = 'mt-2 form-message';
        if (!tipo || !especialidade || !medicoId || !data || !horario) {
          msgDiv.textContent = 'Todos os campos são obrigatórios';
          return;
        }
        try {
          const res = await fetch(`${API_BASE_URL}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: currentUser.email, doctorId: medicoId, date: data, time: horario, type: tipo })
          });
          const result = await res.json();
          if (result.success) {
            msgDiv.textContent = result.message || 'Agendamento realizado com sucesso!';
            msgDiv.className = 'mt-2 form-message form-message-success';
            document.getElementById('agendar-resumo').innerHTML = '';
            setTimeout(() => { location.hash = 'meus-agendamentos'; }, 1000);
          } else {
            msgDiv.textContent = result.error || 'Erro ao agendar.';
          }
        } catch {
          msgDiv.textContent = 'Erro de conexão.';
        }
      };
    });

// Função para exibir mensagens estilizadas
function showMessage(elementId, msg, success = true) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = msg;
  el.className = 'mt-2 form-message';
}
}

// Renderização da página Meus Agendamentos
function renderMeusAgendamentos() {
  if (!currentUser) {
    location.hash = 'login';
    return;
  }
  showSpinner();
  fetch(`${API_BASE_URL}/appointments/${currentUser.email}`)
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
              <strong>Médico:</strong> ${a.doctorName || ''}<br>
              <strong>Tipo:</strong> ${a.type}<br>
              <strong>Data:</strong> ${a.date}<br>
              <strong>Horário:</strong> ${a.time}<br>
              <button class='btn btn-outline-danger btn-sm mt-2' onclick='cancelAgendamento(${idx})' id='btnCancelarAgendamento${idx}'>Cancelar</button>
            </div>
          </div>
        `;
      });
      appDiv.innerHTML = html;
    });
}


window.cancelAgendamento = async function(idx) {
  if (!confirm('Deseja cancelar este agendamento?')) return;
  try {
    const res = await fetch(`${API_BASE_URL}/appointments/${idx}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      alert(result.message || 'Agendamento cancelado com sucesso!');
      renderMeusAgendamentos();
    } else {
      alert(result.error || 'Erro ao cancelar agendamento.');
    }
  } catch {}
};

// Renderização da página Nossos Doutores
function renderNossosDoutores() {
  showSpinner();
  
  fetch(`${API_BASE_URL}/doctors`)
    .then(res => res.json())
    .then(doctors => {
      const especialidades = [...new Set(doctors.map(d => d.specialty))].sort();
      
      appDiv.innerHTML = `
        <div class='container-fluid'>
          <h2 class='text-success text-center mb-4'>Nossos Doutores</h2>
          
          <div class='row mb-4'>
            <div class='col-md-6'>
              <label class='form-label'>Filtrar por Especialidade:</label>
              <select class='form-select' id='filtroEspecialidade'>
                <option value=''>Todas as Especialidades</option>
                ${especialidades.map(e => `<option value='${e}'>${e}</option>`).join('')}
              </select>
            </div>
            <div class='col-md-6'>
              <label class='form-label'>Buscar por Nome:</label>
              <input type='text' class='form-control' id='buscaNome' placeholder='Digite o nome do médico'>
            </div>
          </div>
          
          <div id='doctorsList' class='row'>
            <!-- Médicos serão listados aqui -->
          </div>
        </div>
      `;
      
      function renderDoctors(filteredDoctors = doctors) {
        const doctorsListDiv = document.getElementById('doctorsList');
        
        if (filteredDoctors.length === 0) {
          doctorsListDiv.innerHTML = `
            <div class='col-12'>
              <div class='alert alert-info text-center'>
                Nenhum médico encontrado com os filtros aplicados.
              </div>
            </div>
          `;
          return;
        }
        
        // Group doctors by specialty
        const doctorsBySpecialty = {};
        filteredDoctors.forEach(doctor => {
          if (!doctorsBySpecialty[doctor.specialty]) {
            doctorsBySpecialty[doctor.specialty] = [];
          }
          doctorsBySpecialty[doctor.specialty].push(doctor);
        });
        
        let html = '';
        Object.keys(doctorsBySpecialty).sort().forEach(specialty => {
          html += `
            <div class='col-12 mb-4'>
              <h4 class='text-success border-bottom pb-2'>${specialty}</h4>
              <div class='row'>
          `;
          
          doctorsBySpecialty[specialty].forEach(doctor => {
            html += `
              <div class='col-lg-6 col-xl-4 mb-3'>
                <div class='card h-100 shadow-sm'>
                  <div class='card-body'>
                    <h5 class='card-title text-success'>${doctor.name}</h5>
                    <p class='card-text'>
                      <strong>Especialidade:</strong> ${doctor.specialty}<br>
                      <strong>CRM:</strong> ${doctor.crm}<br>
                      <strong>Experiência:</strong> ${doctor.experience}<br>
                      <small class='text-muted'>${doctor.description}</small>
                    </p>
                    <button class='btn btn-outline-success btn-sm' onclick='showDoctorDetails(${doctor.id})'>
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            `;
          });
          
          html += `
              </div>
            </div>
          `;
        });
        
        doctorsListDiv.innerHTML = html;
      }
      
      // Initial render
      renderDoctors();
      
      // Filter by specialty
      document.getElementById('filtroEspecialidade').onchange = function() {
        const selectedSpecialty = this.value;
        const searchName = document.getElementById('buscaNome').value.toLowerCase();
        
        let filtered = doctors;
        if (selectedSpecialty) {
          filtered = filtered.filter(d => d.specialty === selectedSpecialty);
        }
        if (searchName) {
          filtered = filtered.filter(d => d.name.toLowerCase().includes(searchName));
        }
        
        renderDoctors(filtered);
      };
      
      // Search by name
      document.getElementById('buscaNome').oninput = function() {
        const searchName = this.value.toLowerCase();
        const selectedSpecialty = document.getElementById('filtroEspecialidade').value;
        
        let filtered = doctors;
        if (selectedSpecialty) {
          filtered = filtered.filter(d => d.specialty === selectedSpecialty);
        }
        if (searchName) {
          filtered = filtered.filter(d => d.name.toLowerCase().includes(searchName));
        }
        
        renderDoctors(filtered);
      };
      
      // Store doctors globally for detail modal
      window.allDoctors = doctors;
    })
    .catch(error => {
      appDiv.innerHTML = `
        <div class='alert alert-danger text-center'>
          Erro ao carregar informações dos médicos. Tente novamente mais tarde.
        </div>
      `;
    });
}

// Function to show doctor details in modal
window.showDoctorDetails = function(doctorId) {
  const doctor = window.allDoctors.find(d => d.id === doctorId);
  if (!doctor) return;
  
  // Create modal HTML
  const modalHtml = `
    <div class='modal fade' id='doctorModal' tabindex='-1' aria-labelledby='doctorModalLabel' aria-hidden='true'>
      <div class='modal-dialog modal-lg'>
        <div class='modal-content'>
          <div class='modal-header bg-success text-white'>
            <h5 class='modal-title' id='doctorModalLabel'>${doctor.name}</h5>
            <button type='button' class='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div class='modal-body'>
            <div class='row'>
              <div class='col-md-6'>
                <h6 class='text-success'>Informações Profissionais</h6>
                <p><strong>Especialidade:</strong> ${doctor.specialty}</p>
                <p><strong>CRM:</strong> ${doctor.crm}</p>
                <p><strong>Experiência:</strong> ${doctor.experience}</p>
                <p><strong>Descrição:</strong> ${doctor.description}</p>
              </div>
              <div class='col-md-6'>
                <h6 class='text-success'>Contato</h6>
                <p><strong>Telefone:</strong> ${doctor.phone}</p>
                <p><strong>Email:</strong> ${doctor.email}</p>
                
                <h6 class='text-success mt-3'>Certificação</h6>
                <p class='text-muted'>${doctor.certificate}</p>
              </div>
            </div>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Fechar</button>
            <button type='button' class='btn btn-success' onclick='agendarComMedico(${doctor.id})'>Agendar Consulta</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Remove existing modal if any
  const existingModal = document.getElementById('doctorModal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('doctorModal'));
  modal.show();
};

// Function to redirect to appointment page with pre-selected doctor
window.agendarComMedico = function(doctorId) {
  // Close modal first
  const modal = bootstrap.Modal.getInstance(document.getElementById('doctorModal'));
  if (modal) {
    modal.hide();
  }
  
  // Store selected doctor ID for pre-selection
  sessionStorage.setItem('selectedDoctorId', doctorId);
  
  // Redirect to appointment page
  location.hash = 'agendar';
};
