import type React from "react";
import { format } from "date-fns";
import Image from "next/image";

interface EmailTemplateProps {
	creatorName: string;
	name: string;
	eventType: string;
	email: string;
	date: string;
	message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
	name,
	creatorName,
	email,
	eventType,
	message,
	date,
}) => (
	<div className="flex flex-col items-center gap-3 justify-center p-4">
			<div className="w-full">
				<Image
					src="/agendae-banner.png"
					className="object-cover w-full"
					alt="Logo"
					width={1000}
					height={1000}
				/>
			</div>
			<h1 className="text-3xl font-bold text-primary mt-5">Olá {name}!</h1>
			<p className="text-xl mt-4">Um novo evento foi agendado.</p>
			<div className="flex flex-col bg-secondary rounded-md p-5 border border-gray-400">
				<p className="text-base font-semibold">Tipo de evento:<span className="text-sm font-light"> {eventType}</span></p>
				<p className="text-base font-semibold">Anfitrião: <span className="text-sm font-light"> {creatorName}</span></p>
				<p className="text-base font-semibold">E-mail do convidado:<span className="text-sm font-light"> {email}</span></p>
				<p className="text-base font-semibold">Data/Hora do Evento: <span className="text-sm font-light"> {format(new Date(date ?? ""), "dd/MM/yyyy 'às' HH:mm")}</span></p>
				<p className="text-base font-semibold">Questões:<span className="text-sm font-light"> {message}</span></p>
			</div>
		</div>
);
