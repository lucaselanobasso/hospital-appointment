# Condições de Teste e Camadas
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3*


### Funcionalidade: Cadastro (cobre US01)

| ID | Condição | Resultado Esperado | US Relacionada | Camada |
|----|----------|-------------------|----------------|---------|
| CT01 | Cadastro de novo usuário com credenciais válidas | Cadastro realizado com sucesso e redirecionamento para a página de login | US01 | UI + API |
| CT02 | Cadastro de mais de um usuário com o mesmo CPF | Usuário já cadastrado com este CPF e cadastro não realizado | US01 | UI + API |
| CT03 | Cadastro de mais de um usuário com o mesmo e-mail | Usuário já cadastrado com este e-mail e cadastro não realizado | US01 | UI + API |
| CT04 | Cadastro com um CPF inválido | CPF deve conter 11 dígitos numéricos e cadastro não realizado | US01 | UI + API |
| CT05 | Cadastro com e-mail inválido | E-mail inválido e cadastro não realizado | US01 | UI + API |
| CT06 | Cadastro sem informar todos os campos | Todos os campos são obrigatórios e cadastro não realizado | US01 | UI + API |
| CT07 | Cadastro com nome preenchido com caracteres inválidos | Nome inválido e cadastro não realizado | US01 | UI + API |