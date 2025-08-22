# Casos de Teste
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3 e no Plano de Estratégia de Testes*

---

## FUNCIONALIDADE: NAVEGAÇÃO

### Caso de Teste 030
**ID:** CT030  
**Título:** Visualização da página de Doutores  
**Prioridade:** Média  
**Rastreabilidade:** CT01 (Navegação) - US17

**Pré-Condições:**
- Sistema possui 15 médicos cadastrados em 5 especialidades
- Aplicação está em execução

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Clicar em "Nossos Doutores" | Página de médicos é exibida |
| 2 | Verificar carregamento da página | A página de doutores é exibida com 15 médicos em 5 especialidades |
| 3 | Verificar informações exibidas | Nome, especialidade e foto (se aplicável) são mostrados |
| 4 | Verificar distribuição por especialidades | Médicos estão distribuídos nas 5 especialidades |
| 5 | Verificar botões de ação | Botões "Ver Detalhes" e "Agendar Consulta" estão visíveis |

**Pós-Condições:**
- Página carrega todos os 15 médicos
- Informações são exibidas corretamente
- Interface permite interação com os médicos

---

### Caso de Teste 031
**ID:** CT031  
**Título:** Filtro de médicos por especialidade  
**Prioridade:** Média  
**Rastreabilidade:** CT02 (Navegação) - US18

**Pré-Condições:**
- Usuário está na página "Nossos Doutores"
- Médicos de diferentes especialidades estão carregados

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar filtros de especialidade | Filtros estão visíveis na página |
| 2 | Selecionar filtro "Cardiologia" | É exibido somente o(s) doutor(es) da especialidade filtrada |
| 3 | Verificar quantidade | 3 cardiologistas são exibidos |
| 4 | Selecionar filtro "Ortopedia" | É exibido somente o(s) doutor(es) de ortopedia |
| 5 | Selecionar "Todas as especialidades" | Todos os 15 médicos voltam a ser exibidos |

**Pós-Condições:**
- Filtro por especialidade funciona corretamente
- Apenas médicos da especialidade selecionada são mostrados
- Opção de "limpar filtro" retorna todos os médicos

---

### Caso de Teste 032
**ID:** CT032  
**Título:** Filtro de médicos por nome  
**Prioridade:** Média  
**Rastreabilidade:** CT03 (Navegação) - US18

**Pré-Condições:**
- Usuário está na página "Nossos Doutores"
- Campo de busca por nome está disponível

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar campo de busca por nome | Campo de busca está visível |
| 2 | Digitar "Silva" no campo de busca | É exibido somente o(s) doutor(es) que correspondem ao nome buscado |
| 3 | Verificar resultados da busca | Apenas médicos com "Silva" no nome são exibidos |
| 4 | Limpar campo de busca | Todos os médicos voltam a ser exibidos |
| 5 | Testar busca sem resultados | Digitar nome inexistente |
| 6 | Verificar comportamento | Mensagem "Nenhum médico encontrado" ou lista vazia |

**Pós-Condições:**
- Busca por nome funciona corretamente
- Sistema filtra médicos conforme texto digitado
- Limpeza do filtro restaura lista completa

---

### Caso de Teste 033
**ID:** CT033  
**Título:** Visualização da página Sobre Nós  
**Prioridade:** Baixa  
**Rastreabilidade:** CT04 (Navegação) - US19

**Pré-Condições:**
- Aplicação está em execução
- Menu de navegação está disponível

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar link "Sobre Nós" no menu | Link está visível no menu |
| 2 | Clicar em "Sobre Nós" | A página Sobre nós é exibida |
| 3 | Verificar conteúdo da página | Informações sobre o hospital são exibidas |
| 4 | Verificar navegação | Usuário pode navegar de volta para outras páginas |

**Pós-Condições:**
- Página "Sobre Nós" carrega corretamente
- Conteúdo informativo é exibido
- Navegação permanece funcional

---

### Caso de Teste 034
**ID:** CT034  
**Título:** Visualização da página Contato  
**Prioridade:** Baixa  
**Rastreabilidade:** CT05 (Navegação) - US20

**Pré-Condições:**
- Aplicação está em execução
- Menu de navegação está disponível

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar link "Contato" no menu | Link está visível no menu |
| 2 | Clicar em "Contato" | A página Contato é exibida |
| 3 | Verificar informações de contato | Telefone, email, endereço são exibidos |
| 4 | Verificar funcionalidade | Links de contato são clicáveis (se aplicável) |

**Pós-Condições:**
- Página "Contato" carrega corretamente
- Informações de contato são acessíveis
- Usuário pode entrar em contato com o hospital

---

### Caso de Teste 035
**ID:** CT035  
**Título:** Modal de detalhes do médico  
**Prioridade:** Média  
**Rastreabilidade:** CT06 (Navegação) - US22

**Pré-Condições:**
- Usuário está na página "Nossos Doutores"
- Médicos estão carregados na página

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar botão "Ver Detalhes" de um médico | Botão está visível no card do médico |
| 2 | Clicar em "Ver Detalhes" | Modal com informações completas é exibido |
| 3 | Verificar informações no modal | Formação, certificações, contato estão presentes |
| 4 | Verificar dados completos | Nome, especialidade, experiência, telefone |
| 5 | Verificar botão de fechar | Modal pode ser fechado |
| 6 | Fechar modal | Modal desaparece e página permanece funcional |

**Pós-Condições:**
- Modal exibe informações detalhadas do médico
- Todas as informações relevantes estão presentes
- Interface permite fechar modal normalmente

---

### Caso de Teste 036
**ID:** CT036  
**Título:** Agendamento direto via modal do médico  
**Prioridade:** Média  
**Rastreabilidade:** CT07 (Navegação) - US22

**Pré-Condições:**
- Usuário está visualizando modal de detalhes do médico
- Usuário está ou não logado no sistema

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Verificar botão "Agendar Consulta" no modal | Botão está presente no modal |
| 2 | Clicar em "Agendar Consulta" | Sistema verifica autenticação |
| 3a | Se usuário logado | Redireciona para tela de agendamento com médico pré-selecionado |
| 3b | Se usuário não logado | Redireciona para tela de login |
| 4 | Verificar pré-seleção (se logado) | Médico já está selecionado no formulário |

**Pós-Condições:**
- Botão redireciona corretamente conforme estado de autenticação
- Médico é pré-selecionado quando aplicável
- Fluxo de agendamento é otimizado