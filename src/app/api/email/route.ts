import EmailToClient from "@/actions/email/_components/email-to-client";
import EmailToCreator from "@/actions/email/_components/email-to-creator";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	try {
		const {
			email,
			name,
			message,
			subject,
			phone,
			eventType,
			creatorName,
			creatorEmail,
			date,
		}: ContactForm = await request.json();

		// Enviar e-mail para o remetente
		await resend.emails.send({
			from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
			to: email,
			subject: "Confirmação de Recebimento do Contato",
			text: "Obrigado por entrar em contato. Recebemos sua mensagem e entraremos em contato em breve.",
			react: EmailToClient({
				name,
				email,
				creatorEmail,
				eventType,
				date,
				creatorName,
			}),
		});

		// Enviar e-mail para o destinatário
		await resend.emails.send({
			from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
			to: [`${creatorEmail}`],
			subject: "Nova mensagem de contato recebida",
			text: `Você recebeu uma nova mensagem de contato de ${name} (${email}): ${message}`,
			react: EmailToCreator({
				name,
				creatorName,
				email,
				eventType,
				date,
				phone,
				creatorEmail,
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
	creatorEmail: string;
	creatorName: string;
	date: string;
};
