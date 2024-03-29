// import { db } from "@/lib/prisma";

// const { PrismaClient } = require('@prisma/client');


// async function main() {
//   // Criando alguns exemplos de eventos


//   const workingHours = [
//     { weekDay: 'Segunda-feira', startTime: '9:00', endTime: '21:00', userId: 'user1_id' },
//     { weekDay: 'Terça-feira', startTime: '9:00', endTime: '21:00', userId: 'user2_id' },
//     { weekDay: 'Quarta-feira', startTime: '9:00', endTime: '21:00', userId: 'user3_id' },
//     { weekDay: 'Quinta-feira', startTime: '9:00', endTime: '21:00', userId: 'user4_id' },
//     { weekDay: 'Sexta-feira', startTime: '8:00', endTime: '17:00', userId: 'user5_id' },
//     { weekDay: 'Sábado', startTime: 'Fechado', endTime: 'Fechado', userId: 'user6_id' },
//     { weekDay: 'Domingo', startTime: 'Fechado', endTime: 'Fechado', userId: 'user7_id' },
//   ];



//   for (const hours of workingHours) {
//     await db.availability.create({
//       data: {
//         weekDay: hours.weekDay,
//         startTime: hours.startTime,
//         endTime: hours.endTime,
//         userId: hours.userId,
//       },
//     });
//   }

// }

// // Chamando a função principal e tratando erros
// main()
//   .catch((e) => {
//     throw e;
//   })
//   // Finalizando a conexão com o banco de dados após a execução
//   .finally(async () => {
//     await db.$disconnect();
//   });
