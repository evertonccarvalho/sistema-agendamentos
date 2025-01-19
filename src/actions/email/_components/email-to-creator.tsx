import { absoluteUrl } from "@/lib/utils";
import {
  Body,
  Button,
  Container,
  Head,
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
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface EmailToCreatorProps {
  name?: string;
  creatorName?: string;
  email?: string;
  creatorEmail?: string;
  date: string;
  phone: string;
  eventType: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const EmailToCreator = ({
  name,
  creatorName,
  email,
  date,
  phone,
  eventType,
  creatorEmail,
}: EmailToCreatorProps) => {
  const USER_URL_NAME = creatorEmail?.substring(0, creatorEmail.indexOf("@"));
  const CREATO_URL = absoluteUrl(`/${USER_URL_NAME}`);
  const DATE_EVENT = dayjs(date)
    .utc()
    .locale("pt-br")
    .format("dddd, D [de] MMMM - HH:mm");
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
            <p className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Novo <strong>Contato</strong> de <strong>{name}</strong>
            </p>
            <Text className="text-black text-[14px] leading-[24px]">
              Olá {creatorName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Um novo evento foi agendado.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Tipo do Evento:</strong> {eventType}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Convidado </strong>
              {name},
            </Text>
            <Text className="text-black text-[14px] capitalize leading-[24px]">
              <strong>Data/Hora do evento: </strong>
              {DATE_EVENT}
            </Text>
            <Text className="text-black text-[14px] capitalize leading-[24px]">
              <strong>Tefefone: </strong>
              {phone}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>E-mail: </strong>
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
                href={`${CREATO_URL}`}
              >
                Ver Eventos no AgendaÊ
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              ou copie e cole este URL em seu navegador:{" "}
              <Link
                href={`${CREATO_URL}`}
                className="text-blue-600 no-underline"
              >
                {`${CREATO_URL}`}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailToCreator.PreviewProps = {
  name: "Maria José",
  creatorName: "Éverton Carvalho",
  email: "mariajoség@example.com",
  creatorEmail: "evertonsnkaeg@example.com",
  date: "2024-03-29T13:00:00.000Z",
  phone: "88999082170",
  eventType: "vento",
} as EmailToCreatorProps;

export default EmailToCreator;
