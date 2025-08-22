# Bug Reports
Sistema de Agendamento Hospitalar — Registro consolidado de defeitos identificados nos Casos de Teste

Origem: Consolidado a partir de `documentation/CASOS_DE_TESTE/*.md`.
Observação: Os bugs foram removidos dos itens de rastreabilidade nos CTs e centralizados neste arquivo.

---

## BUG02 — Mensagem de sucesso não exibida após agendamento
- Fonte: `documentation/CASOS_DE_TESTE/AGENDAMENTO.md` → CT020
- Severidade: Média
- Prioridade: Média
- Status: Aberto
- Contexto: Após confirmar um agendamento válido, o sistema deve exibir mensagem de sucesso.
- Passos para reproduzir:
  1. Concluir um agendamento válido.
  2. Clicar em "Confirmar Agendamento".
- Resultado esperado: Exibir mensagem "Agendamento realizado com sucesso".
- Resultado atual: Usuário é redirecionado diretamente para "Meus Agendamentos" e a mensagem não é exibida.
- Evidência: CT020, linhas 210–218.

---

## BUG03 — Pressionar Enter no campo data causa logout
- Fonte: `documentation/CASOS_DE_TESTE/AGENDAMENTO.md` → CT027
- Severidade: Alta
- Prioridade: Alta
- Status: Aberto
- Contexto: Validação do campo de data durante o agendamento.
- Passos para reproduzir:
  1. Acessar a tela de agendamento com o campo data habilitado.
  2. Clicar no campo data.
  3. Digitar caracteres inválidos (ex.: "abc123").
  4. Pressionar Enter.
- Resultado esperado: Validação do formato de data e mensagem "Formato de data inválido".
- Resultado atual: Usuário é deslogado e redirecionado para a tela de login.
- Evidência: CT027, linhas 395–403.

---

## BUG01 — Validação de nome permite caracteres inválidos no cadastro
- Fonte: `documentation/CASOS_DE_TESTE/CADASTRO.md` → CT007
- Severidade: Média
- Prioridade: Média
- Status: A confirmar (comportamento atual não explicitado no CT)
- Contexto: Regras de validação do campo Nome no cadastro de usuário.
- Passos para reproduzir (conforme CT007):
  1. Acessar formulário de cadastro.
  2. Preencher Nome com "Usuário5&%#¨$¨ Da Silva".
  3. Preencher demais campos válidos.
  4. Clicar em "Cadastrar".
- Resultado esperado: Sistema deve invalidar o nome e exibir "Nome inválido".
- Resultado atual: Não explicitado no CT. Indício de defeito pela marcação "BUG01" no caso de teste. Requer verificação.
- Observação: Recomenda-se executar o CT em ambiente para confirmar o comportamento e coletar evidências (logs/prints).
