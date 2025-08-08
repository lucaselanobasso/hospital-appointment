
# Hospital Verde - Sistema de Agendamento de Consultas

## Descrição
Aplicação web fictícia para agendamento de consultas médicas, com interface intuitiva, responsiva e visual moderno nas cores verde e branco. Não utiliza banco de dados, apenas variáveis em memória.

## Funcionalidades
- Cadastro/Login de clientes
- Agendamento de consultas (presencial ou telemedicina)
- Seleção de especialidade e médico
- Escolha de data e horário
- Confirmação e resumo do agendamento
- Cancelamento/Reagendamento
- Páginas: Home, Login, Cadastro, Agendar, Meus Agendamentos, Sobre Nós, Contato

## Requisitos Funcionais
1. **Acessar a funcionalidade**
   - O cliente deve conseguir acessar a tela de agendamento a partir do site do hospital.
2. **Cadastro/Login**
   - O cliente deve poder fazer login com seus dados já cadastrados.
   - Caso não tenha cadastro, o cliente deve poder criar uma conta antes de agendar.
3. **Escolha do tipo de consulta**
   - O sistema deve permitir que o cliente selecione se a consulta será **presencial** ou **online (telemedicina)**.
4. **Seleção de especialidade médica**
   - O cliente deve poder escolher a especialidade desejada (ex.: cardiologia, ortopedia, dermatologia).
5. **Escolha do médico**
   - O cliente deve poder selecionar o médico desejado, caso haja mais de um disponível para a especialidade.
6. **Escolha de data e horário**
   - O sistema deve exibir um calendário com as datas e horários disponíveis para a especialidade e médico escolhidos.
   - O cliente deve poder selecionar um horário disponível.
7. **Confirmação de dados**
   - Antes de finalizar, o sistema deve exibir um resumo da consulta (médico, data, horário, especialidade, valor se houver).
8. **Confirmação do agendamento**
   - O cliente deve confirmar o agendamento e receber uma mensagem de sucesso na tela.
9. **Envio de confirmação**
   - O sistema deve enviar um e-mail e/ou mensagem no celular com os detalhes da consulta. (essa parte será fictícia, não precisará de nenhuma integração com mensagem enviada para o e-mail).
10. **Cancelamento ou reagendamento**
   - O cliente deve poder cancelar ou reagendar a consulta, seguindo as regras do hospital (ex.: até 24h antes).



## Pré-requisitos
- Node.js instalado ([Download](https://nodejs.org/en/download/))

## Variáveis de Ambiente
O backend e o frontend suportam configuração via arquivo `.env` na raiz do projeto. Exemplo:

```
# Porta do backend
PORT=3001
# Porta do frontend
FRONTEND_PORT=5000
```

Se o arquivo `.env` não existir, serão usadas as portas padrão 3001 (backend) e 5000 (frontend).

Para usar variáveis de ambiente, instale o pacote dotenv:
```powershell
npm install dotenv
```


## Instalação
1. Clone o repositório ou baixe os arquivos
2. Instale as dependências do backend:
   ```powershell
   npm install express cors
   ```

## Como rodar o projeto


### Backend (API)
Execute o comando abaixo na raiz do projeto:
```powershell
npm run start:backend
```
O backend ficará disponível em http://localhost:3001

### Frontend (site)
Execute o comando abaixo na raiz do projeto:
```powershell
npm run start:frontend
```
O frontend ficará disponível em http://localhost:5000

---
Desenvolvido para fins didáticos.
