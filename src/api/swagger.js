const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital Verde - API de Agendamento',
      version: '1.0.0',
      description: 'API RESTful para sistema de agendamento de consultas médicas do Hospital Verde',
      contact: {
        name: 'Hospital Verde',
        email: 'contato@hospitalverde.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password', 'cpf'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome completo do usuário',
              example: 'João Silva'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'joao@email.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Senha do usuário',
              example: '123456'
            },
            cpf: {
              type: 'string',
              pattern: '^[0-9]{11}$',
              description: 'CPF do usuário (11 dígitos)',
              example: '12345678901'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password', 'cpf'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'joao@email.com'
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
              example: '123456'
            },
            cpf: {
              type: 'string',
              pattern: '^[0-9]{11}$',
              description: 'CPF do usuário (11 dígitos)',
              example: '12345678901'
            }
          }
        },
        Doctor: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do médico',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nome do médico',
              example: 'Dr. João Silva'
            },
            specialty: {
              type: 'string',
              description: 'Especialidade médica',
              example: 'Cardiologia'
            },
            phone: {
              type: 'string',
              description: 'Telefone de contato',
              example: '(11) 98765-4321'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email profissional',
              example: 'joao.silva@hospitalverde.com'
            },
            crm: {
              type: 'string',
              description: 'Número do CRM',
              example: 'CRM/SP 123456'
            },
            certificate: {
              type: 'string',
              description: 'Certificação profissional',
              example: 'Especialista em Cardiologia - Sociedade Brasileira de Cardiologia'
            },
            experience: {
              type: 'string',
              description: 'Anos de experiência',
              example: '15 anos de experiência'
            },
            description: {
              type: 'string',
              description: 'Descrição da especialização',
              example: 'Especialista em cardiologia clínica e intervencionista'
            }
          }
        },
        Appointment: {
          type: 'object',
          required: ['userEmail', 'doctorId', 'date', 'time', 'type'],
          properties: {
            userEmail: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário que está agendando',
              example: 'joao@email.com'
            },
            doctorId: {
              type: 'integer',
              description: 'ID do médico selecionado',
              example: 1
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Data da consulta (YYYY-MM-DD)',
              example: '2024-12-25'
            },
            time: {
              type: 'string',
              pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
              description: 'Horário da consulta (HH:MM)',
              example: '14:00'
            },
            type: {
              type: 'string',
              description: 'Tipo de consulta',
              example: 'Consulta de rotina'
            },
            attendance: {
              type: 'string',
              description: 'Forma de atendimento',
              example: 'Online'
            }
          }
        },
        AppointmentResponse: {
          type: 'object',
          properties: {
            userEmail: {
              type: 'string',
              format: 'email',
              example: 'joao@email.com'
            },
            doctorId: {
              type: 'integer',
              example: 1
            },
            doctorName: {
              type: 'string',
              example: 'Dr. João Silva'
            },
            specialty: {
              type: 'string',
              example: 'Cardiologia'
            },
            date: {
              type: 'string',
              format: 'date',
              example: '2024-12-25'
            },
            time: {
              type: 'string',
              example: '14:00'
            },
            type: {
              type: 'string',
              example: 'Consulta de rotina'
            },
            attendance: {
              type: 'string',
              example: 'Online'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operação realizada com sucesso'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Mensagem de erro'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            user: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'João Silva'
                },
                email: {
                  type: 'string',
                  example: 'joao@email.com'
                },
                cpf: {
                  type: 'string',
                  example: '12345678901'
                }
              }
            },
            message: {
              type: 'string',
              example: 'Login realizado com sucesso!'
            }
          }
        }
      }
    }
  },
  apis: ['./src/api/server.js'], // Caminho para os arquivos com anotações Swagger
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
