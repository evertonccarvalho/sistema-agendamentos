import { absoluteUrl } from "@/lib/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

interface EmailToClientProps {
  name?: string;
  creatorName?: string;
  email?: string;
  creatorEmail?: string;
  eventType: string;
  date: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const EmailToClient = ({
  name,
  creatorName,
  eventType,
  email,
  date,
  creatorEmail,
}: EmailToClientProps) => {
  const USER_URL_NAME = creatorEmail?.substring(0, creatorEmail.indexOf("@"));
  const CREATO_URL = absoluteUrl(`/${USER_URL_NAME}`);
  const DATE_EVENT = dayjs(date).locale("pt-br").format("dddd, D [de] MMMM - HH:mm");

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/public/logo.png`}
                width="100"
                height="37"
                alt="AgendaÊ"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Novo Contato de {name}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Olá, {creatorName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Seu agendamento foi realizado com sucesso.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Tipo do Evento:</strong> {eventType}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Anfitrião:</strong> {creatorName}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Data/Hora do evento:</strong> {DATE_EVENT}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>E-mail:</strong>{" "}
              <Link
                href={`mailto:${email}`}
                className="text-blue-600 no-underline"
              >
                {email}
              </Link>
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={CREATO_URL}
              >
                Ver Eventos no AgendaÊ
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Ou copie e cole este URL em seu navegador:{" "}
              <Link
                href={CREATO_URL}
                className="text-blue-600 no-underline"
              >
                {CREATO_URL}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailToClient.PreviewProps = {
  name: "Maria José",
  creatorName: "Éverton Carvalho",
  email: "mariajoség@example.com",
  creatorEmail: "evertonsnkaeg@example.com",
  date: "2024-03-29T13:00:00.000Z",
  eventType: "Evento TIPO"
} as EmailToClientProps;

export default EmailToClient;
