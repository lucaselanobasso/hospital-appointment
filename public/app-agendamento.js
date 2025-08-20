// Renderização completa da página de Agendar Consulta
function renderAgendar() {
  if (!currentUser) {
    location.hash = 'login';
    return;
  }
  
  const appDiv = document.getElementById('app');
  const especialidades = ['Cardiologia', 'Ortopedia', 'Dermatologia', 'Pediatria', 'Ginecologia'];
  
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

  appDiv.innerHTML = `
    <div class='card mx-auto' style='max-width:500px;'>
      <div class='card-body'>
        <h2 class='text-success text-center'>Agendar Consulta</h2>
        <form id='agendarForm'>
          <!-- Forma de Atendimento -->
          <div class='mb-3'>
            <label class='form-label'>Forma de Atendimento</label>
            <div id='formaAtendimento'>
              <div class='form-check'>
                <input class='form-check-input' type='radio' name='formaAtendimento' id='presencial' value='Presencial'>
                <label class='form-check-label' for='presencial'>Presencial</label>
              </div>
              <div class='form-check'>
                <input class='form-check-input' type='radio' name='formaAtendimento' id='online' value='Online'>
                <label class='form-check-label' for='online'>Online</label>
              </div>
            </div>
          </div>
          
          <!-- Tipo de Serviço -->
          <div class='mb-3 disabled-section' id='tipoServicoSection'>
            <label class='form-label'>Tipo de Serviço</label>
            <div id='tipoConsulta'></div>
          </div>
          
          <!-- Especialidade -->
          <div class='mb-3 disabled-section' id='especialidadeSection'>
            <label class='form-label'>Especialidade</label>
            <div id='especialidade'></div>
          </div>
          
          <!-- Médico -->
          <div class='mb-3 disabled-section' id='medicoSection'>
            <label class='form-label'>Médico</label>
            <select class='form-select' id='medico' disabled>
              <option value=''>Selecione um médico</option>
            </select>
          </div>
          
          <!-- Data -->
          <div class='mb-3 disabled-section' id='dataSection'>
            <label class='form-label'>Data</label>
            <input type='text' class='form-control' id='data' placeholder='DD/MM/AAAA' maxlength='10' disabled>
          </div>
          
          <!-- Horário -->
          <div class='mb-3 disabled-section' id='horarioSection'>
            <label class='form-label'>Horário</label>
            <div id='horario'></div>
          </div>
          
          <button type='button' class='btn btn-success w-100' id='btnResumoAgendamento'>Resumo</button>
        </form>
        <div id='agendar-message' class='mt-2 form-message'></div>
      </div>
    </div>
    
    <!-- Modal de Resumo -->
    <div class='modal fade' id='resumoModal' tabindex='-1' aria-hidden='true'>
      <div class='modal-dialog modal-dialog-centered'>
        <div class='modal-content'>
          <div class='modal-header bg-success text-white'>
            <h5 class='modal-title'>Confirmar Agendamento</h5>
            <button type='button' class='btn-close btn-close-white' data-bs-dismiss='modal'></button>
          </div>
          <div class='modal-body'>
            <div id='resumo-content'></div>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Voltar</button>
            <button type='button' class='btn btn-success' id='btnConfirmarAgendamento'>Confirmar Agendamento</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Elementos DOM
  const tipoConsultaDiv = document.getElementById('tipoConsulta');
  const especialidadeDiv = document.getElementById('especialidade');
  const medicoSelect = document.getElementById('medico');
  const horarioDiv = document.getElementById('horario');
  const dataInput = document.getElementById('data');

  // Função para obter valor selecionado dos radio buttons
  function getSelectedRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : '';
  }

  // Função para resetar campos subsequentes
  function resetarCamposSubsequentes(secoes) {
    secoes.forEach(secao => {
      document.getElementById(secao).className = 'mb-3 disabled-section';
    });
    // Limpar conteúdos
    tipoConsultaDiv.innerHTML = '';
    especialidadeDiv.innerHTML = '';
    medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';
    medicoSelect.disabled = true;
    horarioDiv.innerHTML = '';
    dataInput.value = '';
    dataInput.disabled = true;
    // Limpar mensagens de erro
    showMessage('agendar-message', '', true);
  }

  // Função para validar data com mensagens específicas de negócio
  function validarData(dataSelecionada, formaAtendimento) {
    // Validar formato DD/MM/AAAA
    const formatoData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!formatoData.test(dataSelecionada)) {
      return { valida: false, mensagem: 'Formato de data inválido. Use DD/MM/AAAA.' };
    }
    
    // Converter DD/MM/AAAA para Date
    const [dia, mes, ano] = dataSelecionada.split('/');
    const dataEscolhida = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Verificar se a data é válida (ex: 31/02/2024)
    if (dataEscolhida.getDate() != dia || dataEscolhida.getMonth() != (mes - 1) || dataEscolhida.getFullYear() != ano) {
      return { valida: false, mensagem: 'Data inválida. Verifique o dia, mês e ano informados.' };
    }
    
    // Verificar se é data passada
    if (dataEscolhida < hoje) {
      return { valida: false, mensagem: 'Data inválida, impossível agendar para uma data passada.' };
    }
    
    // Verificar antecedência mínima
    const agora = new Date();
    const antecedenciaMinima = formaAtendimento === 'Online' ? 2 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    
    if ((dataEscolhida.getTime() - agora.getTime()) < antecedenciaMinima) {
      const mensagem = formaAtendimento === 'Online' 
        ? 'Agendamento online deve ser feito com pelo menos 2 horas de antecedência.'
        : 'Agendamento presencial deve ser feito com pelo menos 24 horas de antecedência.';
      return { valida: false, mensagem };
    }
    
    return { valida: true, mensagem: '' };
  }

  // Formatação automática da data DD/MM/AAAA
  function formatarData(input) {
    let valor = input.value.replace(/\D/g, '');
    if (valor.length >= 2) valor = valor.substring(0,2) + '/' + valor.substring(2);
    if (valor.length >= 5) valor = valor.substring(0,5) + '/' + valor.substring(5,9);
    input.value = valor;
  }

  // Event listener para formatação da data
  dataInput.addEventListener('input', function() {
    formatarData(this);
  });

  // Prevenir submit do formulário ao pressionar Enter
  document.getElementById('agendarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simular clique no botão resumo se todos os campos estiverem preenchidos
    document.getElementById('btnResumoAgendamento').click();
  });

  // Carregar dados dos médicos
  fetch(`${API_BASE_URL}/doctors`)
    .then(res => res.json())
    .then(data => {
      window.doctors = data;
    });

  // Event listeners para cascata
  document.addEventListener('change', function(e) {
    if (e.target.name === 'formaAtendimento') {
      resetarCamposSubsequentes(['tipoServicoSection', 'especialidadeSection', 'medicoSection', 'dataSection', 'horarioSection']);
      
      const formaValue = e.target.value;
      if (formaValue) {
        // Preencher tipos de serviço disponíveis
        let tiposDisponiveis = [];
        especialidades.forEach(esp => {
          const servicos = servicosPorEspecialidade[esp][formaValue] || [];
          servicos.forEach(s => {
            if (!tiposDisponiveis.includes(s)) tiposDisponiveis.push(s);
          });
        });
        
        if (tiposDisponiveis.length > 0) {
          let tipoHtml = '';
          tiposDisponiveis.forEach((tipo, index) => {
            tipoHtml += `
              <div class='form-check'>
                <input class='form-check-input' type='radio' name='tipoConsulta' id='tipo${index}' value='${tipo}'>
                <label class='form-check-label' for='tipo${index}'>${tipo}</label>
              </div>
            `;
          });
          tipoConsultaDiv.innerHTML = tipoHtml;
          document.getElementById('tipoServicoSection').className = 'mb-3 enabled-section';
        } else {
          showMessage('agendar-message', 'Nenhum tipo de serviço disponível para a forma de atendimento selecionada.');
        }
      }
    }
    
    if (e.target.name === 'tipoConsulta') {
      resetarCamposSubsequentes(['especialidadeSection', 'medicoSection', 'dataSection', 'horarioSection']);
      
      const tipoValue = e.target.value;
      const formaValue = getSelectedRadioValue('formaAtendimento');
      
      if (tipoValue && formaValue) {
        // Preencher especialidades compatíveis
        const especialidadesCompativeis = especialidades.filter(esp => {
          const servicos = servicosPorEspecialidade[esp][formaValue] || [];
          return servicos.includes(tipoValue);
        });
        
        if (especialidadesCompativeis.length > 0) {
          let especialidadeHtml = '';
          especialidadesCompativeis.forEach((esp, index) => {
            especialidadeHtml += `
              <div class='form-check'>
                <input class='form-check-input' type='radio' name='especialidade' id='esp${index}' value='${esp}'>
                <label class='form-check-label' for='esp${index}'>${esp}</label>
              </div>
            `;
          });
          especialidadeDiv.innerHTML = especialidadeHtml;
          document.getElementById('especialidadeSection').className = 'mb-3 enabled-section';
        } else {
          showMessage('agendar-message', 'Nenhuma especialidade disponível para o tipo de serviço selecionado.');
        }
      }
    }
    
    if (e.target.name === 'especialidade') {
      resetarCamposSubsequentes(['medicoSection', 'dataSection', 'horarioSection']);
      
      const especialidadeValue = e.target.value;
      
      if (especialidadeValue && window.doctors) {
        // Filtrar médicos por especialidade
        const medicos = window.doctors.filter(d => d.specialty === especialidadeValue);
        if (medicos.length > 0) {
          medicoSelect.innerHTML = '<option value="">Selecione um médico</option>' + 
            medicos.map(m => `<option value='${m.id}'>${m.name}</option>`).join('');
          medicoSelect.disabled = false;
          
          // Mostrar seção de médico
          document.getElementById('medicoSection').className = 'mb-3 enabled-section';
        } else {
          showMessage('agendar-message', 'Nenhum médico disponível para a especialidade selecionada.');
        }
      }
    }
  });

  // Event listener para seleção de médico
  medicoSelect.addEventListener('change', function() {
    resetarCamposSubsequentes(['dataSection', 'horarioSection']);
    
    if (this.value) {
      dataInput.disabled = false;
      document.getElementById('dataSection').className = 'mb-3 enabled-section';
    }
  });

  // Event listener para mudança de data
  dataInput.addEventListener('change', function() {
    document.getElementById('horarioSection').className = 'mb-3 disabled-section';
    horarioDiv.innerHTML = '';
    
    const dataSelecionada = this.value;
    const medicoId = medicoSelect.value;
    
    if (!dataSelecionada || !medicoId) return;
    
    // Validar data com mensagens específicas
    const formaValue = getSelectedRadioValue('formaAtendimento');
    const validacao = validarData(dataSelecionada, formaValue);
    
    if (!validacao.valida) {
      showMessage('agendar-message', validacao.mensagem);
      return;
    }
    
    // Converter para formato ISO para API
    const [dia, mes, ano] = dataSelecionada.split('/');
    const dataISO = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    
    // Buscar horários disponíveis
    fetch(`${API_BASE_URL}/appointments`)
      .then(res => res.json())
      .then(agendamentos => {
        const horariosPadrao = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];
        const ocupados = agendamentos.filter(a => 
          String(a.doctorId) === String(medicoId) && a.date === dataISO
        ).map(a => a.time);
        
        // Verificar limite diário do usuário
        const meusAgendamentos = agendamentos.filter(a => 
          a.userEmail === currentUser.email && a.date === dataISO
        );
        
        if (meusAgendamentos.length > 0) {
          showMessage('agendar-message', 'Limite diário atingido. Você já possui um agendamento para esta data.');
          return;
        }
        
        const horariosDisponiveis = horariosPadrao.filter(h => {
          const hora = parseInt(h.split(':')[0], 10);
          if (hora < 8 || hora > 18) return false;
          if (ocupados.includes(h)) return false;
          
          // Verificar antecedência por horário
          const agendamentoDateTime = new Date(dataISO + 'T' + h);
          if ((agendamentoDateTime.getTime() - agora.getTime()) < antecedenciaMinima) return false;
          
          return true;
        });
        
        if (horariosDisponiveis.length > 0) {
          let horarioHtml = '';
          horariosDisponiveis.forEach((horario, index) => {
            horarioHtml += `
              <div class='form-check form-check-inline'>
                <input class='form-check-input' type='radio' name='horario' id='horario${index}' value='${horario}'>
                <label class='form-check-label' for='horario${index}'>${horario}</label>
              </div>
            `;
          });
          horarioDiv.innerHTML = horarioHtml;
          document.getElementById('horarioSection').className = 'mb-3 enabled-section';
          showMessage('agendar-message', '', true);
        } else {
          const mensagem = formaValue === 'Online'
            ? 'Nenhum horário disponível para agendamento online nesta data. Tente outra data ou verifique a antecedência mínima de 2 horas.'
            : 'Nenhum horário disponível para agendamento presencial nesta data. Tente outra data ou verifique a antecedência mínima de 24 horas.';
          showMessage('agendar-message', mensagem);
        }
      })
      .catch(() => {
        showMessage('agendar-message', 'Erro ao carregar horários disponíveis.');
      });
  });

  // Botão Resumo - Abrir Modal
  document.getElementById('btnResumoAgendamento').onclick = function() {
    const formaValue = getSelectedRadioValue('formaAtendimento');
    const tipo = getSelectedRadioValue('tipoConsulta');
    const especialidade = getSelectedRadioValue('especialidade');
    const medicoId = medicoSelect.value;
    const data = dataInput.value;
    const horario = getSelectedRadioValue('horario');
    
    // Validar campos obrigatórios com mensagens específicas
    if (!formaValue) {
      showMessage('agendar-message', 'Selecione a forma de atendimento para continuar.');
      return;
    }
    if (!tipo) {
      showMessage('agendar-message', 'Selecione o tipo de serviço para continuar.');
      return;
    }
    if (!especialidade) {
      showMessage('agendar-message', 'Selecione a especialidade médica para continuar.');
      return;
    }
    if (!medicoId) {
      showMessage('agendar-message', 'Selecione um médico para continuar.');
      return;
    }
    if (!data) {
      showMessage('agendar-message', 'Informe a data do agendamento para continuar.');
      return;
    }
    if (!horario) {
      showMessage('agendar-message', 'Selecione o horário desejado para continuar.');
      return;
    }
    
    // Buscar nome do médico
    const medicoObj = window.doctors.find(d => d.id == medicoId);
    const medicoNome = medicoObj ? medicoObj.name : '';
    
    // Preencher conteúdo do modal
    document.getElementById('resumo-content').innerHTML = `
      <div class='row'>
        <div class='col-12'>
          <h6 class='text-success mb-3'>Detalhes do Agendamento</h6>
          <table class='table table-borderless'>
            <tr><td><strong>Forma de Atendimento:</strong></td><td>${formaValue}</td></tr>
            <tr><td><strong>Tipo de Serviço:</strong></td><td>${tipo}</td></tr>
            <tr><td><strong>Especialidade:</strong></td><td>${especialidade}</td></tr>
            <tr><td><strong>Médico:</strong></td><td>${medicoNome}</td></tr>
            <tr><td><strong>Data:</strong></td><td>${data}</td></tr>
            <tr><td><strong>Horário:</strong></td><td>${horario}</td></tr>
          </table>
          <div class='alert alert-info mt-3'>
            <i class='fas fa-info-circle'></i> Verifique todos os dados antes de confirmar o agendamento.
          </div>
        </div>
      </div>
    `;
    
    // Mostrar modal com fade-in
    const modal = new bootstrap.Modal(document.getElementById('resumoModal'));
    modal.show();
  };

  // Confirmar agendamento via modal
  document.getElementById('btnConfirmarAgendamento').onclick = async function() {
    const formaValue = getSelectedRadioValue('formaAtendimento');
    const tipo = getSelectedRadioValue('tipoConsulta');
    const medicoId = medicoSelect.value;
    const data = dataInput.value;
    const horario = getSelectedRadioValue('horario');
    
    // Converter data DD/MM/AAAA para YYYY-MM-DD para API
    const [dia, mes, ano] = data.split('/');
    const dataISO = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userEmail: currentUser.email, 
          doctorId: medicoId, 
          date: dataISO, 
          time: horario, 
          type: tipo,
          appointmentType: formaValue
        })
      });
      
      const result = await res.json();
      
      // Fechar modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('resumoModal'));
      modal.hide();
      
      if (result.success) {
        // Mostrar mensagem de sucesso
        showMessage('agendar-message', result.message || 'Agendamento realizado com sucesso!', true);
        
        // Redirecionar após 2 segundos
        setTimeout(() => { 
          location.hash = 'meus-agendamentos'; 
        }, 2000);
      } else {
        showMessage('agendar-message', result.error || 'Erro ao realizar agendamento.');
      }
    } catch (error) {
      showMessage('agendar-message', 'Erro de conexão. Tente novamente.');
    }
  };
}
