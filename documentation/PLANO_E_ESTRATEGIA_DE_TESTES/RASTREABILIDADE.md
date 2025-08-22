# Matriz de Rastreabilidade (US ↔ CT)
Sistema de Agendamento Hospitalar — baseado na ISO-29119-3

Escopo: Este documento consolida a rastreabilidade entre as User Stories (US) de `documentation/PLANO_E_ESTRATEGIA_DE_TESTES/USER_STORIES.md` e os Casos de Teste (CT) em `documentation/CASOS_DE_TESTE/`. Bugs foram removidos dos casos de teste e tratados separadamente em `BUG_REPORTS.md`.

---

## Visão Geral
- Fonte de US: `documentation/PLANO_E_ESTRATEGIA_DE_TESTES/USER_STORIES.md`
- Fontes de CT: 
  - `documentation/CASOS_DE_TESTE/CADASTRO.md`
  - `documentation/CASOS_DE_TESTE/LOGIN.md`
  - `documentation/CASOS_DE_TESTE/AGENDAMENTO.md`
  - `documentation/CASOS_DE_TESTE/NAVEGACAO.md`

---

## Cobertura: US → CT
- US01 (Cadastro de conta): CT001, CT002, CT003, CT004, CT005, CT006, CT007
- US02 (Login): CT008, CT009, CT010, CT012
- US03 (Logout): CT011
- US04 (Agendar consulta): CT013, CT014, CT015
- US05 (Mensagem de sucesso): CT020
- US06 (Forma de atendimento): CT029
- US07 (Tipo de serviço): CT029
- US08 (Especialidade): CT029
- US09 (Escolha do médico): CT029
- US10 (Data/horário convenientes): CT015, CT021, CT022, CT027
- US11 (Resumo antes de confirmar): CT013, CT018
- US12 (Bloqueios de datas/horários inválidos): CT015, CT021, CT022, CT028
- US13 (Dupla marcação com mesmo médico/dia): CT016
- US14 (Atendimento individual / conflito de horário): CT017
- US15 (Cancelar agendamento): CT019, CT024, CT025, CT026
- US17 (Lista de médicos): CT030
- US18 (Filtros de médicos): CT031, CT032
- US19 (Sobre nós): CT033
- US20 (Contato): CT034
- US21 (Meus agendamentos): CT023
- US22 (Detalhes do médico): CT035, CT036

---

## Mapeamento detalhado: CT → US

### Cadastro
- CT001 → US01
- CT002 → US01
- CT003 → US01
- CT004 → US01
- CT005 → US01
- CT006 → US01
- CT007 → US01

### Login
- CT008 → US02
- CT009 → US02
- CT010 → US02
- CT011 → US03
- CT012 → US02

### Agendamento
- CT013 → US04, US11
- CT014 → US04
- CT015 → US04, US10, US12
- CT016 → US13
- CT017 → US14
- CT018 → US11
- CT019 → US15
- CT020 → US05
- CT021 → US10, US12
- CT022 → US10, US12
- CT023 → US21
- CT024 → US15
- CT025 → US15
- CT026 → US15
- CT027 → US10
- CT028 → US12
- CT029 → US06, US07, US08, US09

### Navegação
- CT030 → US17
- CT031 → US18
- CT032 → US18
- CT033 → US19
- CT034 → US20
- CT035 → US22
- CT036 → US22

---

## Observações
- Todos os CTs possuem referência a pelo menos uma US e todas as US listadas estão cobertas.
- Informações sobre defeitos/bugs estão documentadas em `BUG_REPORTS.md`.
