# Casos de Teste
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3 e no Plano de Estratégia de Testes*

---

## FUNCIONALIDADE: LOGIN

### Caso de Teste 008
**ID:** CT008  
**Título:** Login com credenciais válidas  
**Prioridade:** Alta  
**Rastreabilidade:** CT01 (Login) - US02

**Pré-Condições:**
- Usuário cadastrado no sistema
- Email: "joaopedro@gmail.com", Senha: "joao12131senha"

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar a aplicação e clicar em "Login" | Página de login é exibida |
| 2 | Preencher Email: "joaopedro@gmail.com" | Campo email aceita a entrada |
| 3 | Preencher Senha: "joao12131senha" | Campo senha aceita a entrada |
| 4 | Clicar em "Entrar" | Login realizado com sucesso |
| 5 | Verificar redirecionamento | Sistema redireciona para home page |
| 6 | Verificar estado autenticado | Usuário aparece como logado |

**Pós-Condições:**
- Usuário está autenticado no sistema
- Funcionalidades restritas ficam disponíveis
- Botão de logout aparece na interface

---

### Caso de Teste 009
**ID:** CT009  
**Título:** Login com credenciais inválidas  
**Prioridade:** Alta  
**Rastreabilidade:** CT02 (Login) - US02

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na página de login

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Preencher Email: "usuario@inexistente.com" | Campo aceita a entrada |
| 2 | Preencher Senha: "senhaerrada" | Campo aceita a entrada |
| 3 | Clicar em "Entrar" | Sistema processa tentativa |
| 4 | Verificar mensagem de erro | "Credenciais inválidas" |
| 5 | Verificar não autenticação | Usuário não é autenticado |
| 6 | Verificar permanência na tela | Usuário permanece na tela de login |

**Pós-Condições:**
- Usuário não é autenticado
- Sistema mantém segurança
- Tentativa de login é rejeitada

---

### Caso de Teste 010
**ID:** CT010  
**Título:** Login com campos obrigatórios vazios  
**Prioridade:** Alta  
**Rastreabilidade:** CT03 (Login) - US02

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na página de login

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Deixar campo Email vazio | Campo permanece vazio |
| 2 | Preencher Senha: "qualquersenha" | Campo senha aceita entrada |
| 3 | Clicar em "Entrar" | Sistema valida campos |
| 4 | Verificar mensagem de erro | "Todos os campos são obrigatórios" |
| 5 | Verificar não autenticação | Usuário não é autenticado |

**Pós-Condições:**
- Usuário não é autenticado
- Sistema valida campos obrigatórios
- Usuário pode preencher campos faltantes

---

### Caso de Teste 011
**ID:** CT011  
**Título:** Logout do usuário  
**Prioridade:** Média  
**Rastreabilidade:** CT04 (Login) - US03

**Pré-Condições:**
- Usuário está logado no sistema
- Funcionalidades autenticadas estão disponíveis

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Localizar botão/opção de logout | Botão de logout está visível |
| 2 | Clicar em "Sair" ou "Logout" | Sistema processa logout |
| 3 | Verificar redirecionamento | Usuário é desautenticado e redirecionado para a home |
| 4 | Verificar estado da sessão | Usuário não está mais autenticado |
| 5 | Tentar acessar funcionalidade restrita | Sistema redireciona para login |

**Pós-Condições:**
- Usuário é desautenticado
- Funcionalidades restritas ficam inacessíveis
- Segurança da sessão é mantida

---

### Caso de Teste 012
**ID:** CT012  
**Título:** Tentar acessar funcionalidade sem login  
**Prioridade:** Alta  
**Rastreabilidade:** CT05 (Login) - US02

**Pré-Condições:**
- Usuário não está logado no sistema
- Aplicação está em execução

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Tentar acessar "Meus Agendamentos" diretamente | Sistema detecta falta de autenticação |
| 2 | Verificar redirecionamento | Redirecionamento para tela de login |
| 3 | Tentar acessar "Agendar Horário" | Sistema detecta falta de autenticação |
| 4 | Verificar redirecionamento | Redirecionamento para tela de login |

**Pós-Condições:**
- Usuário é redirecionado para login
- Funcionalidades restritas permanecem protegidas
- Sistema mantém controle de acesso
