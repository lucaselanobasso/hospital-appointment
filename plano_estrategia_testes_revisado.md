# Plano e Estratégia de Testes
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3*

## 1. Épico e Estimativa Geral de Esforço em Testes
**Sistema de agendamento hospitalar online com 15 médicos, 5 especialidades e funcionalidades completas**
- **Duração:** 8 dias úteis
- **QAs envolvidos:** 1 QA
- **Complexidade:** Média-Alta (múltiplas regras de negócio e validações)

## 2. User Stories e Estimativa de Esforço em Testes

| Código | Descrição | Esforço |
|--------|-----------|---------|
| US01 | Como paciente do hospital, quero criar uma conta para poder utilizar o sistema de agendamento online. | 2 |
| US02 | Como paciente do hospital, quero acessar minha conta para utilizar o sistema de agendamento online. | 1 |
| US03 | Como paciente do hospital, quero sair da minha conta para garantir a segurança das minhas informações | 1 |
| US04 | Como paciente do hospital, quero realizar o agendamento na aplicação para marcar consultas de forma rápida e fácil | 3 |
| US05 | Como paciente do hospital, quero receber uma mensagem de sucesso ao agendar na tela para ter certeza que minha consulta foi agendada com êxito. | 1 |
| US06 | Como paciente do hospital, quero escolher a forma de atendimento (ex: Presencial ou online) para ter flexibilidade conforme minha necessidade. | 1 |
| US07 | Como paciente do hospital, quero escolher o tipo de serviço (ex: Exame, consulta de rotina e retorno), para ser adequado a minha necessidade | 1 |
| US08 | Como paciente do hospital, quero selecionar a especialidade médica (Ex: Cardiologia, Ortopedia, Dermatologia, Pediatria, Ginecologia) para ser atendido pelo profissional qualificado | 1 |
| US09 | Como paciente do hospital, quero escolher o médico que irá me atender para ter autonomia na escolha do profissional | 1 |
| US10 | Como paciente do hospital, quero escolher a data e horário do meu agendamento para marcar consulta no momento mais conveniente | 2 |
| US11 | Como paciente do hospital, quero visualizar um resumo da minha consulta (Forma de atendimento, Tipo de serviço, especialidade, médico, data, horário) antes de confirmar, para ter certeza das informações. | 1 |
| US12 | Como paciente do hospital, quero ser impedido de agendar consultas em datas ou horários inválidos (passados ou fora do horário de funcionamento do hospital), para evitar erros no agendamento. | 2 |
| US13 | Como paciente do hospital, quero ser alertado se tentar marcar duas consultas com o mesmo médico no mesmo dia, para respeitar as regras do hospital. | 1 |
| US14 | Como paciente do hospital, quero ser atendido sozinho, para evitar confusão e conflito com outros pacientes | 1 |
| US15 | Como paciente do hospital, quero cancelar o meu agendamento para ter flexibilidade em imprevistos | 2 |
| US17 | Como paciente do hospital, quero visualizar uma página que lista todos os médicos disponíveis e suas especialidades para escolher com qual desejo agendar. | 1 |
| US18 | Como paciente do hospital, quero poder filtrar os médicos para facilitar minha busca. | 2 |
| US19 | Como paciente do hospital, quero visualizar uma página 'Sobre nós' para saber mais informações sobre o hospital | 1 |
| US20 | Como paciente do hospital, quero visualizar uma página 'Contato' para entrar em contato com o hospital caso necessite. | 1 |
| US21 | Como paciente do hospital, quero visualizar uma página com as minhas consultas confirmadas para controle de meus compromissos | 1 |
| **US22** | **Como paciente do hospital, quero ver detalhes completos de cada médico (formação, certificações, contato) para fazer uma escolha informada** | **1** |
| **US23** | **Como paciente do hospital, quero que o sistema persista meus dados para que não sejam perdidos ao reiniciar a aplicação** | **2** |

**Legenda de Esforço:**
- 1 ponto = 1 hora
- 2 pontos = 2 a 3 horas  
- 3 pontos = 4 a 6 horas
- 5 pontos = 1 dia

## 3. Condições de Teste e Camadas

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

### Funcionalidade: Login (cobre US02 e US03)

| ID | Condição | Resultado Esperado | US Relacionada | Camada |
|----|----------|-------------------|----------------|---------|
| CT01 | Login com credenciais válidas | Login realizado com sucesso e redirecionamento para home page | US02 | UI + API |
| CT02 | Login com credenciais inválidas | Mensagem de erro "Credenciais inválidas" - Usuário não é autenticado | US02 | UI + API |
| CT03 | Login com campos obrigatórios vazios | Mensagem de erro "Todos os campos são obrigatórios" - Usuário não é autenticado | US02 | UI + API |
| CT04 | Logout do usuário | Usuário é desautenticado e redirecionado para a home | US03 | UI + API |
| CT05 | Tentar acessar funcionalidade sem login | Redirecionamento para tela de login | US02 | API |

### Funcionalidade: Agendamento (cobre US04, US05, US06, US07, US08, US09, US10, US11, US12, US13, US14, US15)

| ID | Condição | Resultado Esperado | US Relacionada | Camada |
|----|----------|-------------------|----------------|---------|
| CT01 | Agendamentos com informações válidas | Resumo do agendamento aparece e ao confirmar o agendamento é realizado | US04 + US11 | UI + API |
| CT02 | Agendamento com campos obrigatórios não preenchidos | Todos os campos são obrigatórios e mensagem de erro é exibida | US04 | UI + API |
| CT03 | Agendamento com data inválida (passada ou fora do expediente) | Mensagem de horários não disponíveis e agendamento não permitido | US04 + US10 + US12 | UI + API |
| CT04 | Agendamento de um paciente com o mesmo médico no mesmo dia mais de uma vez | Mensagem de erro exibida e agendamento não realizado | US13 | UI + API |
| CT05 | Agendamento de mais de um paciente no mesmo horário com o mesmo médico | Horário não é exibido/bloqueado e agendamento não realizado | US14 | UI |
| CT06 | Exibição do resumo antes da confirmação | Resumo exibido contendo médico, data, horário, tipo de consulta e especialidade | US11 | UI |
| CT07 | Cancelar agendamento existente | Mensagem de confirmação exibida e, ao confirmar, o agendamento é cancelado | US15 | UI + API |
| CT08 | Mensagem de sucesso após agendamento válido | Mensagem de sucesso exibida na tela | US05 | UI |
| CT09 | Agendamento presencial sem antecedência mínima (24 horas) | Mensagem de erro é exibida e agendamento não é efetuado | US10 + US12 | UI + API |
| CT10 | Agendamento online sem antecedência mínima (2 horas) | Mensagem de erro é exibida e agendamento não é efetuado | US10 + US12 | UI + API |
| CT11 | Visualização de agendamentos do usuário | Lista personalizada de consultas do paciente | US21 | UI + API |
| CT12 | Cancelamento de agendamento presencial dentro do prazo (24h) | Cancelamento realizado com sucesso | US15 | UI + API |
| CT13 | Cancelamento de agendamento online dentro do prazo (1h) | Cancelamento realizado com sucesso | US15 | UI + API |
| CT14 | Tentativa de cancelamento fora do prazo | Cancelamento não permitido | US15 | UI + API |
| CT15 | Data preenchida com caracteres inválidos | Mensagem de erro "Formato de data inválido" | US10 | UI + API |
| **CT16** | **Agendamento fora do horário de funcionamento (07:00-18:00)** | **Horário não disponível para seleção** | **US12** | **UI + API** |
| **CT17** | **Seleção em cascata: Forma → Tipo → Especialidade → Médico** | **Campos são habilitados progressivamente conforme seleção anterior** | **US06 + US07 + US08 + US09** | **UI + API** |

### Funcionalidade: Navegação (cobre US17, US18, US19, US20, US22)

| ID | Condição | Resultado Esperado | US Relacionada | Camada |
|----|----------|-------------------|----------------|---------|
| CT01 | Visualização da página de Doutores | A página de doutores é exibida com 15 médicos em 5 especialidades | US17 | UI + API |
| CT02 | Filtros da página de doutores por especialidade | É exibido somente o(s) doutor(es) da especialidade filtrada | US18 | UI + API |
| CT03 | Filtros da página de doutores por nome | É exibido somente o(s) doutor(es) que correspondem ao nome buscado | US18 | UI + API |
| CT04 | Visualização da página Sobre Nós | A página Sobre nós é exibida | US19 | UI + API |
| CT05 | Visualização da página Contato | A página Contato é exibida | US20 | UI + API |
| **CT06** | **Modal de detalhes do médico** | **Modal exibe informações completas: formação, certificações, contato** | **US22** | **UI + API** |
| **CT07** | **Agendamento direto via modal do médico** | **Botão "Agendar Consulta" redireciona para tela de agendamento** | **US22** | **UI** |

### Funcionalidade: Persistência de Dados (cobre US23)

| ID | Condição | Resultado Esperado | US Relacionada | Camada |
|----|----------|-------------------|----------------|---------|
| **CT01** | **Reinicialização da aplicação após cadastro** | **Dados do usuário permanecem salvos** | **US23** | **API** |
| **CT02** | **Reinicialização da aplicação após agendamento** | **Agendamentos permanecem salvos** | **US23** | **API** |
| **CT03** | **Modificação de dados** | **Arquivo hospital-data.json é atualizado automaticamente** | **US23** | **API** |

## 4. Missões de Teste Exploratório

- Explorar o formulário de agendamento buscando falhas de validação e UX (campos, mensagens, botão desabilitado, etc.)
- Explorar disponibilidade de horário de médicos buscando falhas na API
- **Explorar a navegação SPA (Single Page Application) buscando inconsistências de estado**
- **Explorar filtros combinados na página de médicos**
- **Explorar persistência de dados após operações de CRUD**
- **Explorar responsividade em diferentes dispositivos e resoluções**
- **Explorar a documentação Swagger/OpenAPI interativa**

## 5. Testes Não-Funcionais

| Tipo | Teste | Resultado Esperado |
|------|-------|-------------------|
| Desempenho | Tempo de resposta ao realizar login | < 2 segundos |
| Desempenho | Tempo de carregamento da página de médicos (15 médicos) | < 3 segundos |
| Usabilidade | Teste com usuário leigo sobre clareza das mensagens | Usuário entende o fluxo sem ajuda externa |
| **Responsividade** | **Teste em dispositivos móveis** | **Interface funcional em smartphones** |
| **Compatibilidade** | **Teste em navegadores principais** | **Funciona em Chrome, Firefox, Safari, Edge** |
| **Acessibilidade** | **Teste com leitores de tela** | **Interface navegável por ferramentas assistivas** |

## 6. Automação de Testes

**Framework:** Cypress  
**Relatórios:** Mochawesome

| ID | Condição | Resultado Esperado | Camada |
|----|----------|-------------------|---------|
| AT01 | Login com credenciais válidas | Login realizado com sucesso | E2E |
| AT02 | Cadastro de usuário válido | Cadastro realizado com sucesso | E2E |
| AT03 | Fluxo completo de agendamento | Agendamento criado e exibido em "Meus Agendamentos" | E2E |
| AT04 | Cancelamento de agendamento | Agendamento removido da lista | E2E |
| AT05 | Filtros na página de médicos | Filtros funcionam corretamente | E2E |
| **AT06** | **Validação de regras de antecedência** | **Sistema impede agendamentos fora do prazo** | **E2E** |
| **AT07** | **Teste da API via endpoints Swagger** | **Todos endpoints retornam respostas corretas** | **API** |

## 7. Mapeamento dos Dados de Teste

| Dado | Tipo | Responsável | Status |
|------|------|-------------|--------|
| Usuário com email válido | Massa válida | QA (Lucas) | Criado |
| Usuário com email inválido | Massa inválida | QA (Lucas) | Criado |
| Usuário com CPF inválido | Massa inválida | QA (Lucas) | Criado |
| **Usuário padrão (João Pedro)** | **Massa válida** | **Dev** | **Disponível** |
| **15 médicos em 5 especialidades** | **Massa válida** | **Dev** | **Disponível** |
| Senhas fracas | Entrada inválida | QA (Lucas) | Criado |
| **Datas passadas** | **Entrada inválida** | **QA (Lucas)** | **Criado** |
| **Horários fora do funcionamento** | **Entrada inválida** | **QA (Lucas)** | **Criado** |

**Usuário Padrão Disponível:**
- Nome: Joao Pedro  
- Email: joaopedro@gmail.com
- CPF: 10020030040
- Senha: joao12131senha

## 8. Defeitos Conhecidos

| ID | Defeito | Camada |
|----|---------|---------|
| BUG01 | Sistema permite cadastro e login com o nome com caracteres inválidos (ex: Usuário5&%#¨$¨ Da Silva) | API |
| BUG02 | Sistema não exibe a mensagem de sucesso após o agendamento, o usuário é encaminhado direto para a tela de 'Meus Agendamentos' | UI |
| BUG03 | Ao clicar enter no campo 'Data' o usuário é deslogado redirecionado para a tela de login | API |
| BUG04 | Após digitar a data, só exibido o campo de horários disponíveis se eu clicar na tela | UI |

## 9. Ambiente de Teste

**Frontend:** http://localhost:3001  
**Backend API:** http://localhost:3001/api  
**Documentação:** http://localhost:3001/api-docs  
**Dados:** Arquivo JSON persistente em `data/hospital-data.json`

**Tecnologias:**
- Frontend: Vanilla JavaScript + Bootstrap 5
- Backend: Node.js + Express.js  
- Documentação: Swagger/OpenAPI 3.0
- Testes: Cypress + Mochawesome

## 10. Critérios de Aceite

- ✅ Todos os testes de regressão passando
- ✅ Cobertura de testes > 80%
- ✅ Todas as regras de negócio validadas
- ✅ Performance dentro dos limites estabelecidos
- ✅ Interface responsiva funcionando
- ✅ Documentação da API atualizada
- ✅ Defeitos críticos corrigidos

**Riscos Identificados:**
- Persistência de dados em JSON pode gerar problemas de concorrência
- SPA sem SSR pode apresentar problemas de SEO
- Ausência de banco de dados limita escalabilidade