import { Resend } from "resend";
import EmailVerification from "./_components/email-verification";
import type { SchedulingStatus } from "@prisma/client";
import StatusUpdateEmail from "./_components/email-change-status-to-client";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
		to: email,
		subject: "2FA Code",
		html: `<p>Your 2FA code: ${token}</p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `${domain}/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
		to: email,
		subject: "Reset your password",
		html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
	});
};

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`;
	await resend.emails.send({
		from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
		to: email,
		subject: "Confirm your email",
		react: EmailVerification({
			confirmLink: confirmLink,
		}),
	});
};

export const sendStatusUpdateEmail = async (
	email: string,
	newStatus: SchedulingStatus,
	name: string,
	date: string,
	eventType: string,
) => {
	await resend.emails.send({
		from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
		to: email,
		subject: "Atualização de Status do Agendamento",
		react: StatusUpdateEmail({
			name: name,
			date: date,
			eventType: eventType,
			newStatus: newStatus,
		}),
	});
};
