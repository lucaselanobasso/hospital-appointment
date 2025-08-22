# Condições de Teste e Camadas
**Sistema de Agendamento Hospitalar**
*Baseado na ISO-29119-3*

### Funcionalidade: Navegação (cobre US17, US18, US19, US20, US22)

| ID | Condição | Resultado Esperado | US Relacionada | Camada |
|----|----------|-------------------|----------------|---------|
| CT01 | Visualização da página de Doutores | A página de doutores é exibida com 15 médicos em 5 especialidades | US17 | UI + API |
| CT02 | Filtros da página de doutores por especialidade | É exibido somente o(s) doutor(es) da especialidade filtrada | US18 | UI + API |
| CT03 | Filtros da página de doutores por nome | É exibido somente o(s) doutor(es) que correspondem ao nome buscado | US18 | UI + API |
| CT04 | Visualização da página Sobre Nós | A página Sobre nós é exibida | US19 | UI + API |
| CT05 | Visualização da página Contato | A página Contato é exibida | US20 | UI + API |
| CT06 | Modal de detalhes do médico | Modal exibe informações completas: formação, certificações, contato | US22 | UI + API |
| CT07 | Agendamento direto via modal do médico | Botão "Agendar Consulta" redireciona para tela de agendamento | US22 | UI |