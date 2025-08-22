# Condições de Teste e Camadas
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3*


### Funcionalidade: Login (cobre US02 e US03)

| ID | Condição | Resultado Esperado | US Relacionada | Camada |
|----|----------|-------------------|----------------|---------|
| CT01 | Login com credenciais válidas | Login realizado com sucesso e redirecionamento para home page | US02 | UI + API |
| CT02 | Login com credenciais inválidas | Mensagem de erro "Credenciais inválidas" - Usuário não é autenticado | US02 | UI + API |
| CT03 | Login com campos obrigatórios vazios | Mensagem de erro "Todos os campos são obrigatórios" - Usuário não é autenticado | US02 | UI + API |
| CT04 | Logout do usuário | Usuário é desautenticado e redirecionado para a home | US03 | UI + API |
| CT05 | Tentar acessar funcionalidade sem login | Redirecionamento para tela de login | US02 | API |
