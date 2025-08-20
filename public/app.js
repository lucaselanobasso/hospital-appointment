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
        <div class='card mx-auto' style='max-width:600px;'>
          <div class='card-body'>
            <h2 class='text-success text-center'>Agendar Consulta</h2>
            <form id='agendarForm'>
              <!-- Forma de Atendimento - RADIO -->
              <div class='mb-3'>
                <label class='form-label'>1. Forma de Atendimento</label>
                <div id='formaAtendimentoGroup' data-testid='grupo-forma-atendimento'>
                  <div class='form-check'>
                    <input class='form-check-input' type='radio' name='formaAtendimento' id='formaPresencial' value='Presencial' data-testid='forma-presencial'>
                    <label class='form-check-label' for='formaPresencial'>Presencial</label>
                  </div>
                  <div class='form-check'>
                    <input class='form-check-input' type='radio' name='formaAtendimento' id='formaOnline' value='Online' data-testid='forma-online'>
                    <label class='form-check-label' for='formaOnline'>Online (Telemedicina)</label>
                  </div>
                </div>
              </div>
              
              <!-- Tipo de Serviço - RADIO -->
              <div class='mb-3'>
                <label class='form-label'>2. Tipo de Serviço</label>
                <div id='tipoServicoGroup' class='disabled-fieldset' data-testid='grupo-tipo-servico'>
                  <!-- Será preenchido dinamicamente -->
                </div>
              </div>
              
              <!-- Especialidade - RADIO -->
              <div class='mb-3'>
                <label class='form-label'>3. Especialidade</label>
                <div id='especialidadeGroup' class='disabled-fieldset' data-testid='grupo-especialidade'>
                  <!-- Será preenchido dinamicamente -->
                </div>
              </div>
              
              <!-- Médico - DROPDOWN -->
              <div class='mb-3'>
                <label class='form-label'>4. Médico</label>
                <select class='form-select' id='medico' disabled data-testid='select-medico'>
                  <option value=''>Selecione uma especialidade primeiro</option>
                </select>
              </div>
              
              <!-- Data - DD/MM/AAAA -->
              <div class='mb-3'>
                <label class='form-label'>5. Data (DD/MM/AAAA)</label>
                <input type='text' class='form-control' id='data' placeholder='DD/MM/AAAA' maxlength='10' disabled data-testid='input-data'>
              </div>
              
              <!-- Horário - RADIO -->
              <div class='mb-3'>
                <label class='form-label'>6. Horário</label>
                <div id='horarioGroup' class='disabled-fieldset' data-testid='grupo-horario'>
                  <!-- Será preenchido dinamicamente -->
                </div>
              </div>
              
              <button type='button' class='btn btn-success w-100' id='btnResumoAgendamento' disabled data-testid='btn-resumo-agendamento'>Ver Resumo</button>
            </form>
            <div id='agendar-message' class='mt-2 form-message'></div>
          </div>
        </div>
        
        <!-- Modal de Resumo -->
        <div class='modal fade' id='resumoModal' tabindex='-1' aria-labelledby='resumoModalLabel' aria-hidden='true'>
          <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
              <div class='modal-header bg-success text-white'>
                <h5 class='modal-title' id='resumoModalLabel'>Resumo do Agendamento</h5>
                <button type='button' class='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Fechar'></button>
              </div>
              <div class='modal-body' id='resumoContent'>
                <!-- Conteúdo do resumo será inserido aqui -->
              </div>
              <div class='modal-footer'>
                <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Voltar para Editar</button>
                <button type='button' class='btn btn-success' id='btnConfirmarAgendamento' data-testid='btn-confirmar-agendamento'>Confirmar Agendamento</button>
              </div>
            </div>
          </div>
        </div>
      `;
      // Elementos do formulário
      const medicoSelect = document.getElementById('medico');
      const dataInput = document.getElementById('data');
      const btnResumo = document.getElementById('btnResumoAgendamento');

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

      // Variáveis para armazenar seleções
      let selectedFormaAtendimento = '';
      let selectedTipoServico = '';
      let selectedEspecialidade = '';
      let selectedMedico = '';
      let selectedData = '';
      let selectedHorario = '';

      // Função para limpar mensagens de erro
      function clearMessage() {
        const msgDiv = document.getElementById('agendar-message');
        msgDiv.textContent = '';
        msgDiv.className = 'mt-2 form-message';
      }

      // Função para mostrar erro
      function showError(message) {
        const msgDiv = document.getElementById('agendar-message');
        msgDiv.textContent = message;
        msgDiv.className = 'mt-2 form-message';
      }

      // Função para habilitar/desabilitar grupos de campos
      function enableFieldset(groupId, enable = true) {
        const group = document.getElementById(groupId);
        if (enable) {
          group.classList.remove('disabled-fieldset');
        } else {
          group.classList.add('disabled-fieldset');
        }
      }

      // Função para formatar data DD/MM/AAAA
      function formatDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
          value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (value.length >= 5) {
          value = value.substring(0, 5) + '/' + value.substring(5, 9);
        }
        input.value = value;
      }

      // Função para validar data
      function isValidDate(dateString) {
        const parts = dateString.split('/');
        if (parts.length !== 3) return false;
        
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        
        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2024) return false;
        
        const date = new Date(year, month - 1, day);
        return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
      }

      // 1. Forma de Atendimento - RADIO
      document.querySelectorAll('input[name="formaAtendimento"]').forEach(radio => {
        radio.addEventListener('change', function() {
          if (this.checked) {
            clearMessage();
            selectedFormaAtendimento = this.value;
            
            // Resetar campos seguintes
            selectedTipoServico = '';
            selectedEspecialidade = '';
            selectedMedico = '';
            selectedData = '';
            selectedHorario = '';
            
            // Habilitar próximo campo
            enableFieldset('tipoServicoGroup', true);
            
            // Desabilitar campos seguintes
            enableFieldset('especialidadeGroup', false);
            medicoSelect.disabled = true;
            medicoSelect.innerHTML = '<option value="">Selecione uma especialidade primeiro</option>';
            dataInput.disabled = true;
            dataInput.value = '';
            enableFieldset('horarioGroup', false);
            btnResumo.disabled = true;
            
            // Preencher tipos de serviço disponíveis
            let tiposDisponiveis = [];
            especialidades.forEach(e => {
              const servicos = servicosPorEspecialidade[e][this.value] || [];
              servicos.forEach(s => {
                if (!tiposDisponiveis.includes(s)) tiposDisponiveis.push(s);
              });
            });
            
            const tipoGroup = document.getElementById('tipoServicoGroup');
            tipoGroup.innerHTML = tiposDisponiveis.map(tipo => {
              const slug = tipo.replace(/\s+/g, '');
              return `
              <div class='form-check'>
                <input class='form-check-input' type='radio' name='tipoServico' id='tipo${slug}' value='${tipo}' data-testid='tipoServico-${slug}'>
                <label class='form-check-label' for='tipo${slug}'>${tipo}</label>
              </div>`;
            }).join('');
            
            // Adicionar listeners aos novos radio buttons
            document.querySelectorAll('input[name="tipoServico"]').forEach(radio => {
              radio.addEventListener('change', handleTipoServicoChange);
            });
          }
        });
      });

      // 2. Tipo de Serviço - RADIO
      function handleTipoServicoChange() {
        if (this.checked) {
          clearMessage();
          selectedTipoServico = this.value;
          
          // Resetar campos seguintes
          selectedEspecialidade = '';
          selectedMedico = '';
          selectedData = '';
          selectedHorario = '';
          
          // Habilitar próximo campo
          enableFieldset('especialidadeGroup', true);
          
          // Desabilitar campos seguintes
          medicoSelect.disabled = true;
          medicoSelect.innerHTML = '<option value="">Selecione uma especialidade primeiro</option>';
          dataInput.disabled = true;
          dataInput.value = '';
          enableFieldset('horarioGroup', false);
          btnResumo.disabled = true;
          
          // Preencher especialidades compatíveis
          const especialidadesCompativeis = especialidades.filter(e => {
            const servicos = servicosPorEspecialidade[e][selectedFormaAtendimento] || [];
            return servicos.includes(selectedTipoServico);
          });
          
          const especialidadeGroup = document.getElementById('especialidadeGroup');
          especialidadeGroup.innerHTML = especialidadesCompativeis.map(esp => {
            const slug = esp.replace(/\s+/g, '');
            return `
            <div class='form-check'>
              <input class='form-check-input' type='radio' name='especialidade' id='esp${slug}' value='${esp}' data-testid='especialidade-${slug}'>
              <label class='form-check-label' for='esp${slug}'>${esp}</label>
            </div>`;
          }).join('');
          
          // Adicionar listeners aos novos radio buttons
          document.querySelectorAll('input[name="especialidade"]').forEach(radio => {
            radio.addEventListener('change', handleEspecialidadeChange);
          });
        }
      }

      // 3. Especialidade - RADIO
      function handleEspecialidadeChange() {
        if (this.checked) {
          clearMessage();
          selectedEspecialidade = this.value;
          
          // Resetar campos seguintes
          selectedMedico = '';
          selectedData = '';
          selectedHorario = '';
          
          // Habilitar próximo campo
          medicoSelect.disabled = false;
          
          // Desabilitar campos seguintes
          dataInput.disabled = true;
          dataInput.value = '';
          enableFieldset('horarioGroup', false);
          btnResumo.disabled = true;
          
          // Preencher médicos da especialidade
          const medicos = doctors.filter(d => d.specialty === selectedEspecialidade);
          medicoSelect.innerHTML = '<option value="">Selecione um médico</option>' + 
            medicos.map(m => `<option value='${m.id}'>${m.name}</option>`).join('');
          
          // Check if there's a pre-selected doctor from "Nossos Doutores" page
          const selectedDoctorId = sessionStorage.getItem('selectedDoctorId');
          if (selectedDoctorId && medicos.find(m => m.id == selectedDoctorId)) {
            medicoSelect.value = selectedDoctorId;
            selectedMedico = selectedDoctorId;
            sessionStorage.removeItem('selectedDoctorId');
            // Trigger next step
            handleMedicoChange();
          }
        }
      }

      // 4. Médico - DROPDOWN
      medicoSelect.addEventListener('change', handleMedicoChange);
      
      function handleMedicoChange() {
        if (medicoSelect.value) {
          clearMessage();
          selectedMedico = medicoSelect.value;
          
          // Resetar campos seguintes
          selectedData = '';
          selectedHorario = '';
          
          // Habilitar próximo campo
          dataInput.disabled = false;
          
          // Desabilitar campos seguintes
          enableFieldset('horarioGroup', false);
          btnResumo.disabled = true;
        }
      }

      // 5. Data - DD/MM/AAAA com formatação automática
      dataInput.addEventListener('input', function() {
        formatDate(this);
      });

      dataInput.addEventListener('blur', function() {
        if (this.value.length === 10) {
          if (isValidDate(this.value)) {
            clearMessage();
            selectedData = this.value;
            
            // Converter para formato ISO para validação
            const parts = this.value.split('/');
            const isoDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            
            // Validar antecedência
            const hoje = new Date();
            const dataEscolhida = new Date(isoDate + 'T00:00');
            
            if (dataEscolhida < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) {
              showError('Não é permitido agendar para datas anteriores ao dia de hoje.');
              return;
            }
            
            // Resetar horário
            selectedHorario = '';
            btnResumo.disabled = true;
            
            // Carregar horários disponíveis
            loadAvailableHours(isoDate);
          } else {
            showError('Data inválida. Use o formato DD/MM/AAAA.');
          }
        }
      });

      // Função para carregar horários disponíveis
      function loadAvailableHours(isoDate) {
        const horariosPadrao = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];
        
        fetch(`${API_BASE_URL}/appointments`)
          .then(res => res.json())
          .then(agendamentos => {
            const ocupados = agendamentos.filter(a => a.doctorId == selectedMedico && a.date === isoDate).map(a => a.time);
            const meusAgendamentos = agendamentos.filter(a => a.userEmail === currentUser.email && a.date === isoDate);
            const now = new Date();
            
            let antecedenciaHorarioMs = 24 * 60 * 60 * 1000; // 24 horas para presencial
            if (selectedFormaAtendimento === 'Online') {
              antecedenciaHorarioMs = 2 * 60 * 60 * 1000; // 2 horas para online
            }
            
            const horariosDisponiveis = horariosPadrao.filter(h => {
              const hora = parseInt(h.split(':')[0], 10);
              if (hora < 7 || hora > 18) return false;
              
              const agendamentoDate = new Date(isoDate + 'T' + h);
              if (agendamentoDate < now) return false;
              if (ocupados.includes(h)) return false;
              if (meusAgendamentos.find(a => a.time === h)) return false;
              
              // Verificar antecedência mínima
              if ((agendamentoDate.getTime() - now.getTime()) < antecedenciaHorarioMs) return false;
              return true;
            });
            
            if (horariosDisponiveis.length === 0) {
              showError(selectedFormaAtendimento === 'Online'
                ? 'Não há horários disponíveis para agendamento online com a antecedência mínima de 2 horas.'
                : 'Não há horários disponíveis para agendamento presencial com a antecedência mínima de 24 horas.');
              return;
            }
            
            // Habilitar campo de horário
            enableFieldset('horarioGroup', true);
            
            const horarioGroup = document.getElementById('horarioGroup');
            horarioGroup.innerHTML = horariosDisponiveis.map(horario => {
              const slug = horario.replace(':', '');
              return `
              <div class='form-check'>
                <input class='form-check-input' type='radio' name='horario' id='hora${slug}' value='${horario}' data-testid='horario-${slug}'>
                <label class='form-check-label' for='hora${slug}'>${horario}</label>
              </div>`;
            }).join('');
            
            // Adicionar listeners aos novos radio buttons
            document.querySelectorAll('input[name="horario"]').forEach(radio => {
              radio.addEventListener('change', function() {
                if (this.checked) {
                  clearMessage();
                  selectedHorario = this.value;
                  btnResumo.disabled = false;
                }
              });
            });
          })
          .catch(() => {
            showError('Erro ao carregar horários disponíveis.');
          });
      }

      // Resumo e confirmação
      btnResumo.addEventListener('click', function() {
        if (!selectedFormaAtendimento || !selectedTipoServico || !selectedEspecialidade || !selectedMedico || !selectedData || !selectedHorario) {
          showError('Todos os campos são obrigatórios para visualizar o resumo.');
          return;
        }
        
        // Buscar nome do médico
        const medicoObj = doctors.find(d => d.id == selectedMedico);
        const medicoNome = medicoObj ? medicoObj.name : '';
        
        // Preencher conteúdo do modal
        document.getElementById('resumoContent').innerHTML = `
          <div class='row'>
            <div class='col-md-6'>
              <p><strong>Forma de Atendimento:</strong><br>${selectedFormaAtendimento}</p>
              <p><strong>Tipo de Serviço:</strong><br>${selectedTipoServico}</p>
              <p><strong>Especialidade:</strong><br>${selectedEspecialidade}</p>
            </div>
            <div class='col-md-6'>
              <p><strong>Médico:</strong><br>${medicoNome}</p>
              <p><strong>Data:</strong><br>${selectedData}</p>
              <p><strong>Horário:</strong><br>${selectedHorario}</p>
            </div>
          </div>
          <div class='alert alert-info mt-3'>
            <strong>Importante:</strong> Após confirmar, você será redirecionado para "Meus Agendamentos" onde poderá visualizar e gerenciar suas consultas.
          </div>
        `;
        
        // Mostrar modal com animação
        const modal = new bootstrap.Modal(document.getElementById('resumoModal'));
        modal.show();
      });
      
      // Confirmação do agendamento
      document.getElementById('btnConfirmarAgendamento').addEventListener('click', async function() {
        try {
          // Converter data para formato ISO
          const parts = selectedData.split('/');
          const isoDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          
          const res = await fetch(`${API_BASE_URL}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              userEmail: currentUser.email, 
              doctorId: selectedMedico, 
              date: isoDate, 
              time: selectedHorario, 
              type: selectedTipoServico,
              attendance: selectedFormaAtendimento
            })
          });
          
          const result = await res.json();
          
          if (result.success) {
            // Fechar modal
            bootstrap.Modal.getInstance(document.getElementById('resumoModal')).hide();
            
            // Mostrar mensagem de sucesso
            const msgDiv = document.getElementById('agendar-message');
            msgDiv.textContent = result.message || 'Agendamento realizado com sucesso!';
            msgDiv.className = 'mt-2 form-message form-message-success';
            
            // Redirecionar após 2 segundos
            setTimeout(() => { 
              location.hash = 'meus-agendamentos'; 
            }, 2000);
          } else {
            // Fechar modal e mostrar erro
            bootstrap.Modal.getInstance(document.getElementById('resumoModal')).hide();
            showError(result.error || 'Erro ao agendar consulta.');
          }
        } catch (error) {
          bootstrap.Modal.getInstance(document.getElementById('resumoModal')).hide();
          showError('Erro de conexão ao confirmar agendamento.');
        }
      });
    });

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
