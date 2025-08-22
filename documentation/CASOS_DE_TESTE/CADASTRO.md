# Casos de Teste
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3 e no Plano de Estratégia de Testes*

---

## FUNCIONALIDADE: CADASTRO

### Caso de Teste 001
**ID:** CT001  
**Título:** Ao tentar cadastrar novo usuário válido com credenciais válidas, deve exibir mensagem de sucesso e redirecionar para a página de login  
**Prioridade:** Alta  
**Rastreabilidade:** CT01 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução (http://localhost:3001)
- Usuário não possui conta cadastrada
- CPF e email não existem no sistema

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar a aplicação e clicar em "Login" | Página de login é exibida |
| 2 | Clicar em "Criar conta" | Formulário de cadastro é exibido |
| 3 | Preencher Nome: "João Silva" | Campo nome aceita a entrada |
| 4 | Preencher CPF: "12345678901" | Campo CPF aceita 11 dígitos numéricos |
| 5 | Preencher Email: "joao.silva@email.com" | Campo email aceita formato válido |
| 6 | Preencher Senha: "minhasenha123" | Campo senha aceita a entrada |
| 7 | Clicar em "Cadastrar" | Exibe "Cadastro realizado com sucesso!" |
| 8 | Verificar redirecionamento | Usuário visualiza a página de Login |

**Pós-Condições:**
- Usuário está cadastrado no sistema
- Usuário pode fazer login com as credenciais cadastradas

---

### Caso de Teste 002
**ID:** CT002  
**Título:** Ao tentar cadastrar usuário com um CPF já cadastrado, deve retornar o erro "Usuário já cadastrado com este e-mail ou CPF."  
**Prioridade:** Alta  
**Rastreabilidade:** CT02 (Cadastro) - US01

**Pré-Condições:**
- Usuário com CPF "10020030040" já existe no sistema
- Aplicação está em execução

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar formulário de cadastro | Formulário de cadastro é exibido |
| 2 | Preencher Nome: "Maria Santos" | Campo nome aceita a entrada |
| 3 | Preencher CPF: "10020030040" (já existente) | Campo CPF aceita a entrada |
| 4 | Preencher Email: "maria.nova@email.com" | Campo email aceita a entrada |
| 5 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 6 | Clicar em "Cadastrar" | Sistema exibe mensagem de erro |
| 7 | Verificar mensagem | "Usuário já cadastrado com este e-mail ou CPF." |
| 8 | Verificar não cadastramento | Usuário não é cadastrado e cadastro não realizado |

**Pós-Condições:**
- Novo usuário não é criado
- Sistema mantém integridade dos dados
- Usuário permanece na tela de cadastro

---

### Caso de Teste 003
**ID:** CT003  
**Título:** Ao tentar cadastrar usuário com um e-mail já cadastrado, deve retornar o erro "Usuário já cadastrado com este e-mail ou CPF."  
**Prioridade:** Alta  
**Rastreabilidade:** CT03 (Cadastro) - US01

**Pré-Condições:**
- Usuário com email "joaopedro@gmail.com" já existe no sistema
- Aplicação está em execução

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Acessar formulário de cadastro | Formulário de cadastro é exibido |
| 2 | Preencher Nome: "Pedro João" | Campo nome aceita a entrada |
| 3 | Preencher CPF: "98765432101" | Campo CPF aceita a entrada |
| 4 | Preencher Email: "joaopedro@gmail.com" (já existente) | Campo email aceita a entrada |
| 5 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 6 | Clicar em "Cadastrar" | Sistema exibe mensagem de erro |
| 7 | Verificar mensagem | "Usuário já cadastrado com este e-mail ou CPF." |
| 8 | Verificar não cadastramento | Usuário não é cadastrado e cadastro não realizado |

**Pós-Condições:**
- Novo usuário não é criado
- Sistema mantém integridade dos dados
- Usuário permanece na tela de cadastro

---

### Caso de Teste 004
**ID:** CT004  
**Título:** Ao tentar cadastrar usuário com CPF inválido, deve retornar o erro "CPF deve conter 11 dígitos numéricos."  
**Prioridade:** Alta  
**Rastreabilidade:** CT04 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na tela de cadastro

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Preencher Nome: "Ana Costa" | Campo nome aceita a entrada |
| 2 | Preencher CPF: "123456789" (9 dígitos) | Campo CPF aceita a entrada |
| 3 | Preencher Email: "ana@email.com" | Campo email aceita a entrada |
| 4 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 5 | Clicar em "Cadastrar" | Sistema valida CPF |
| 6 | Verificar mensagem de erro | "CPF deve conter 11 dígitos numéricos." |
| 7 | Verificar não cadastramento | Cadastro não realizado |

**Pós-Condições:**
- Usuário não é cadastrado
- Sistema valida formato de CPF
- Usuário pode corrigir os dados

---

### Caso de Teste 005
**ID:** CT005  
**Título:** Ao tentar cadastrar com e-mail inválido, deve retornar o erro "Email inválido."  
**Prioridade:** Alta  
**Rastreabilidade:** CT05 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na tela de cadastro

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Preencher Nome: "Carlos Souza" | Campo nome aceita a entrada |
| 2 | Preencher CPF: "11122233344" | Campo CPF aceita a entrada |
| 3 | Preencher Email: "email-invalido" | Campo email aceita a entrada |
| 4 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 5 | Clicar em "Cadastrar" | Sistema valida formato do email |
| 6 | Verificar mensagem de erro | "Email inválido." |
| 7 | Verificar não cadastramento | Cadastro não realizado |

**Pós-Condições:**
- Usuário não é cadastrado
- Sistema valida formato de email
- Usuário pode corrigir os dados

---

### Caso de Teste 006
**ID:** CT006  
**Título:** Ao tentar cadastrar usuário sem informar todos os campos, deve retornar o erro "Todos os campos são obrigatórios"  
**Prioridade:** Alta  
**Rastreabilidade:** CT06 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na tela de cadastro

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Deixar campo Nome em branco | Campo permanece vazio |
| 2 | Preencher CPF: "12345678901" | Campo aceita entrada |
| 3 | Preencher Email: "teste@email.com" | Campo aceita entrada |
| 4 | Preencher Senha: "senha123" | Campo aceita entrada |
| 5 | Clicar em "Cadastrar" | Sistema valida campos obrigatórios |
| 6 | Verificar mensagem de erro | "Todos os campos são obrigatórios" |
| 7 | Verificar não cadastramento | Cadastro não realizado |

**Pós-Condições:**
- Usuário não é cadastrado
- Sistema valida campos obrigatórios
- Usuário pode preencher campos faltantes

---

### Caso de Teste 007
**ID:** CT007  
**Título:** Ao tentar cadastrar com o nome com caracteres inválidos, deve retornar erro "Nome inválido."  
**Prioridade:** Alta  
**Rastreabilidade:** CT07 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na tela de cadastro

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Preencher Nome: "Usuário5&%#¨$¨ Da Silva" | Campo aceita a entrada |
| 2 | Preencher CPF: "12345678901" | Campo aceita entrada |
| 3 | Preencher Email: "usuario@email.com" | Campo aceita entrada |
| 4 | Preencher Senha: "senha123" | Campo aceita entrada |
| 5 | Clicar em "Cadastrar" | Sistema valida caracteres |
| 6 | Verificar resultado | "Nome inválido." |

**Pós-Condições:**
- Novo usuário não é criado
- Sistema valida caracteres
- Usuário pode corrigir campos

---

### Caso de Teste 008
**ID:** CT008  
**Título:** Ao cadastrar dois usuários com o mesmo nome, porém com e-mail/CPF distintos, ambos os cadastros devem ser bem-sucedidos  
**Prioridade:** Média  
**Rastreabilidade:** CT08 (Cadastro) - US01

**Pré-Condições:**
- Aplicação está em execução
- Usuário está na tela de cadastro

| Passo | Ação | Resultado Esperado |
|-------|------|-------------------|
| 1 | Preencher Nome: "Joao Reutilizado" | Campo nome aceita a entrada |
| 2 | Preencher CPF: "CPF Único 1" | Campo CPF aceita a entrada |
| 3 | Preencher Email: "email_único_1@teste.com" | Campo email aceita a entrada |
| 4 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 5 | Clicar em "Cadastrar" | Cadastro realizado com sucesso |
| 6 | Clicar em "Criar conta" novamente | Formulário é exibido para novo cadastro |
| 7 | Preencher Nome: "Joao Reutilizado" (mesmo nome) | Campo nome aceita a entrada |
| 8 | Preencher CPF: "CPF Único 2" | Campo CPF aceita a entrada |
| 9 | Preencher Email: "email_único_2@teste.com" | Campo email aceita a entrada |
| 10 | Preencher Senha: "senha123" | Campo senha aceita a entrada |
| 11 | Clicar em "Cadastrar" | Cadastro realizado com sucesso |

**Pós-Condições:**
- Dois usuários cadastrados com o mesmo nome mas CPF/E-mail distintos