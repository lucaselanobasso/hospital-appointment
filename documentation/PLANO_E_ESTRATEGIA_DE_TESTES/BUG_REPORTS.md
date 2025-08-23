# Bug Reports
Sistema de Agendamento Hospitalar — Registro consolidado de defeitos identificados nos Casos de Teste

Origem: Consolidado a partir de `documentation/CASOS_DE_TESTE/*.md`.
Observação: Os bugs foram removidos dos itens de rastreabilidade nos CTs e centralizados neste arquivo.

---

## Template Padrão para Novos Bugs
- ID: BUGXX
- Título: Resumo curto e claro
- Severidade: Baixa | Média | Alta | Crítica
- Prioridade: Baixa | Média | Alta
- Status: Aberto | Em análise | Em correção | Corrigido | Validado | Rejeitado
- Ambiente:
  - App: Hospital Verde
  - Backend: Node.js/Express
  - Persistência: JSON (`data/hospital-data.json`)
  - Browser: Chrome/Edge (versões)
  - SO: Windows 10/11
- Versões/Builds:
  - Node: 16+
  - App: 1.0.0 (main)
  - Cypress: conforme `package.json`
- Pré-condições: Estado ou dados necessários antes de reproduzir
- Passos para reproduzir: Passos numerados e determinísticos
- Resultado esperado: Comportamento correto
- Resultado atual: O que ocorre
- Logs/Evidências: Prints, logs do console/rede, referência de linhas/CTs
- Impacto: Usuários/fluxos afetados
- Causa suspeita: Hipótese inicial
- Workaround: Se existir
- Anexos: Links/arquivos

---

## BUG02 — Mensagem de sucesso não exibida após agendamento
- Fonte: `documentation/CASOS_DE_TESTE/AGENDAMENTO.md` → CT020
- Severidade: Média
- Prioridade: Média
- Status: Aberto
- Ambiente:
  - Browser: Chrome (última estável)
  - SO: Windows 11
  - Backend: `npm run start:backend`
  - Dados: Usuário logado, agenda disponível
- Pré-condições:
  - Usuário autenticado
  - Forma de atendimento, tipo, especialidade, médico e horário válidos
- Passos para reproduzir:
  1. Concluir um agendamento válido.
  2. Clicar em "Confirmar Agendamento".
- Resultado esperado: Exibir mensagem "Agendamento realizado com sucesso" antes de redirecionar.
- Resultado atual: Redireciona direto para "Meus Agendamentos" sem exibir a mensagem (ou exibe muito rapidamente).
- Evidências: CT020 (linhas ~210–218). Elemento `#agendar-message` não persistente.
- Impacto: Perda de feedback ao usuário e flakiness em validação de UI.
- Causa suspeita: Redirecionamento imediato após sucesso, sem timeout/await para leitura da mensagem.
- Workaround: Ajustar teste para validar por URL; ainda assim falta feedback ao usuário.

---

## BUG03 — Pressionar Enter no campo data causa logout
- Fonte: `documentation/CASOS_DE_TESTE/AGENDAMENTO.md` → CT027
- Severidade: Alta
- Prioridade: Alta
- Status: Aberto
- Ambiente:
  - Browser: Chrome (última estável)
  - SO: Windows 11
- Pré-condições: Usuário autenticado na tela de agendamento com campo `#data` habilitado
- Passos para reproduzir:
  1. Clicar no campo `#data`.
  2. Digitar caracteres inválidos (ex.: "abc123").
  3. Pressionar Enter.
- Resultado esperado: Validação do formato de data e mensagem "Formato de data inválido"; foco permanece no fluxo.
- Resultado atual: Usuário é deslogado e redirecionado para a tela de login.
- Evidências: CT027 (linhas ~395–403).
- Impacto: Perda de sessão e interrupção do fluxo de agendamento.
- Causa suspeita: Evento keypress/submit propagando para um handler global que dispara logout/limpeza de sessão.
- Workaround: Evitar Enter; usar seleção pelo datepicker.

---

## BUG01 — Validação de nome permite caracteres inválidos no cadastro
- Fonte: `documentation/CASOS_DE_TESTE/CADASTRO.md` → CT007
- Severidade: Média
- Prioridade: Média
- Status: A confirmar (reprodução pendente)
- Ambiente:
  - Browser: Chrome (última estável)
  - SO: Windows 11
- Pré-condições: Tela de cadastro acessível
- Passos para reproduzir:
  1. Acessar formulário de cadastro.
  2. Preencher Nome com "Usuário5&%#¨$¨ Da Silva".
  3. Preencher demais campos válidos.
  4. Clicar em "Cadastrar".
- Resultado esperado: Sistema deve invalidar o nome e exibir "Nome inválido".
- Resultado atual: Indício de aceitação do nome com caracteres inválidos (sinalizado no CT). Requer confirmação prática.
- Evidências: Marca "BUG01" no caso de teste. Necessário reproduzir e capturar prints/logs.
- Impacto: Dados inconsistentes e risco de falhas em integrações futuras.
- Causa suspeita: Regex de validação permissiva no front/back.
- Workaround: Nenhum.
