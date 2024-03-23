import type React from "react";
import { format } from "date-fns";

interface EmailTemplateProps {
	creatorName: string;
	name: string;
	eventType: string;
	email: string;
	date: string;
	message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
	creatorName,
	name,
	eventType,
	email,
	date,
	message,
}) => (
	<div className="p-4 bg-gray-100">
		<h1 className="text-2xl font-bold">Olá {name},</h1>
		<p className="text-lg mt-4">Um novo evento foi agendado.</p>
		<p>Tipo de evento: {eventType}</p>
		<p>Anfitrião: {creatorName}</p>
		<p>E-mail do convidado: {email}</p>
		<p>Data/Hora do Evento:
			{format(new Date(date ?? ""), "dd/MM/yyyy 'às' HH:mm")}
		</p>

		<p>Questões: {message}</p>
	</div>
);


