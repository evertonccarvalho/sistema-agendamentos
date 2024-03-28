import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface EmailVerificationProps {
  name?: string;
  confirmLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const EmailVerification = ({ confirmLink, name }: EmailVerificationProps) => {
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
              Verificar Email
            </Heading>
            <Text className="text-black text-center text-[14px] leading-[24px]">
              Para verificar <strong>seu e-mail,</strong> clique no <strong>botão</strong>  abaixo:
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={confirmLink}
              >
                Verificar Email
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Se o botão acima não funcionar, você também pode copiar e colar o
              seguinte link em seu navegador:
            </Text>
            <Link
              href={confirmLink}
              className="text-blue-600 no-underline break-all"
            >
              {confirmLink}
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailVerification.PreviewProps = {
  name: "Maria José",
  confirmLink: "http://example.com",
};

export default EmailVerification;
