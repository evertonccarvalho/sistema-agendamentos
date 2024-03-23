import { EmailRecipient } from "@/app/(pages)/(creator)/_components/email/email-recipient";
import { EmailTemplate } from "@/app/(pages)/(creator)/_components/email/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	try {
		const { email, name, message, subject, phone, eventType, creatorName, date, }: ContactForm = await request.json();

		// Enviar e-mail para o remetente
		await resend.emails.send({
			from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
			to: email,
			subject: "Confirmação de Recebimento do Contato",
			text: "Obrigado por entrar em contato. Recebemos sua mensagem e entraremos em contato em breve.",
			react: EmailTemplate({ name, email, message, eventType, creatorName, date, }),
		});

		// Enviar e-mail para o destinatário
		await resend.emails.send({
			from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
			to: [`${process.env.MY_EMAIL}`],
			subject: "Nova mensagem de contato recebida",
			text: `Você recebeu uma nova mensagem de contato de ${name} (${email}): ${message}`,
			react: EmailRecipient({
				Name: name,
				Subject: subject,
				Email: email,
				Message: message,
				Phone: phone,
			}),
		});

		return NextResponse.json({ status: "OK" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export const ContactSchema = z.object({
	name: z
		.string()
		.min(5, { message: "mínimo 5 caracteres" })
		.refine((value) => !/^\s*$/.test(value), {
			message: "Não pode ter apenas espaços!",
		}),
	email: z.string().email(),
	subject: z
		.string()
		.min(5, { message: "mínimo 5 caracteres" })
		.refine((value) => !/^\s*$/.test(value), {
			message: "Não pode ter apenas espaços!",
		}),
	message: z
		.string()
		.min(5, { message: "mínimo 5 caracteres" })
		.refine((value) => !/^\s*$/.test(value), {
			message: "Não pode ter apenas espaços!",
		}),
});

export type ContactForm = {
	name: string;
	email: string;
	subject: string;
	message: string;
	phone: string;
	eventType: string;
	creatorName: string;
	date: string;

};
