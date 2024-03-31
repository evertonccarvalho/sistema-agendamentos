import { SchedulingStatus } from "@prisma/client";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface StatusUpdateEmailProps {
  name: string;
  date: string;
  eventType: string;
  newStatus: string;
}



const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

const StatusUpdateEmail = ({
  name,
  date,
  eventType,
  newStatus,
}: StatusUpdateEmailProps) => {

  let statusMessage: string
  switch (newStatus) {
    case SchedulingStatus.PENDING:
      statusMessage = "Seu agendamento está pendente de confirmação.";
      break;
    case SchedulingStatus.ACCEPTED:
      statusMessage = "Seu agendamento foi confirmado com sucesso!";
      break;
    case SchedulingStatus.REJECTED:
      statusMessage = "Infelizmente, seu agendamento foi rejeitado.";
      break;
    case SchedulingStatus.FINISHED:
      statusMessage = "Seu agendamento foi concluído com sucesso.";
      break;
    default:
      statusMessage = "Seu agendamento foi atualizado.";
      break;
  }

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo.png`}
                width="100"
                height="37"
                alt="AgendaÊ"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Atualização de Status do Agendamento
            </Heading>
            <Text className="text-black text-center text-[14px] leading-[24px]">
              Olá, {name},
            </Text>
            <Text className="text-black text-center text-[14px] leading-[24px]">
              <strong>{statusMessage}</strong>.
            </Text>
            <Text className="text-black text-center text-[14px] leading-[24px]">
              <strong>Data/Hora do evento:</strong>
              {format(new Date(date ?? ""), "dd/MM/yyyy HH:mm", { locale: ptBR })}

            </Text>
            <Text className="text-black text-center text-[14px] leading-[24px]">
              <strong>Tipo do Evento:</strong> {eventType}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

StatusUpdateEmail.PreviewProps = {
  name: "Maria José",
  date: "2024-03-29T13:00:00.000Z",
  eventType: "Evento TIPO",
  newStatus: "Aceito",
};

export default StatusUpdateEmail;
