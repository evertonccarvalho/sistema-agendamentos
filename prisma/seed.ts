const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Criando alguns exemplos de eventos
  await prisma.eventType.createMany({
    data: [
      {
        name: 'Evento 1',
        description: 'Descrição do Evento 1',
        creatorId: 'cltzqc41t0000myakgbk3r8r7',
      },
      {
        name: 'Evento 2',
        description: 'Descrição do Evento 2',
        creatorId: 'cltzqc41t0000myakgbk3r8r7',
      },
    ],
  });

  // Criando alguns exemplos de disponibilidade
  await prisma.availability.createMany({
    data: [
      {
        weekDay: 1,
        startTime: 9,
        endTime: 17,
        userId: 'cltzqc41t0000myakgbk3r8r7',
      },
      {
        weekDay: 2,
        startTime: 10,
        endTime: 18,
        userId: 'cltzqc41t0000myakgbk3r8r7',
      },
    ],
  });

  // Criando alguns exemplos de agendamentos
  await prisma.scheduling.createMany({
    data: [
      {
        email: 'email1@example.com',
        phone: '123456789',
        message: 'Mensagem do Agendamento 1',
        status: 'PENDING',
        userId: 'cltzqc41t0000myakgbk3r8r7',
        eventId: '1fc2c1c4-45f0-4469-9b7e-665255eeb1eb',
      },
      {
        email: 'email2@example.com',
        phone: '987654321',
        message: 'Mensagem do Agendamento 2',
        status: 'PENDING',
        userId: 'cltzqc41t0000myakgbk3r8r7',
        eventId: '1fc2c1c4-45f0-4469-9b7e-665255eeb1eb',
      },
    ],
  });
}

// Chamando a função principal e tratando erros
main()
  .catch((e) => {
    throw e;
  })
  // Finalizando a conexão com o banco de dados após a execução
  .finally(async () => {
    await prisma.$disconnect();
  });
