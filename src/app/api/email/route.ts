import EmailToClient from "@/actions/email/_components/email-to-client";
import EmailToCreator from "@/actions/email/_components/email-to-creator";
import { format } from "date-fns";
import { NextResponse } from "next/server";
import { Resend } from "resend";

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

		// Assunto para o e-mail do cliente
		const clientSubject = `${name}, seu agendamento no AgendaÊ foi confirmado`;

		// Assunto para o e-mail do criador
		const creatorSubject = `Novo agendamento: ${eventType} em ${format(new Date(date ?? ""), "dd/MM/yyyy HH:mm")}`;

		// Enviar e-mail para o cliente
		await resend.emails.send({
			from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
			to: email,
			subject: clientSubject,
			text: "Seu agendamento foi realizado com sucesso.",
			react: EmailToClient({
				name,
				email,
				creatorEmail,
				eventType,
				date,
				creatorName,
			}),
		});

		// Enviar e-mail para o criador


		await resend.emails.send({
			from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
			to: [`${creatorEmail}`],
			subject: creatorSubject,
			text: `Você recebeu um novo agendamento de ${name} (${email}) para o evento ${eventType} em  ${format(new Date(date ?? ""), "dd/MM/yyyy HH:mm")}`,
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
