import type * as React from "react";

interface EmailRecipientProps {
	Name: string;
	Subject: string;
	Email: string;
	Message: string;
	Phone: string;
}

export const EmailRecipient: React.FC<Readonly<EmailRecipientProps>> = ({

	Name,
	Subject,
	Email,
	Message,
	Phone,
}) => (
	<div className="p-4 bg-gray-100">
		<h1 className="text-2xl font-bold mb-4">Novo contato de {Name}!</h1>
		<div className="border-b-2 pb-2 mb-4">
			<h2 className="text-lg font-semibold">Detalhes do contato:</h2>
			<p className="text-gray-700">Nome: {Name}</p>
			<p className="text-gray-700">Email: {Email}</p>
			<p className="text-gray-700">Assunto: {Subject}</p>
			<p className="text-gray-700">Telefone: {Phone}</p>
		</div>
		<div>
			<h2 className="text-lg font-semibold">Mensagem:</h2>
			<p className="text-gray-700">{Message}</p>
		</div>
	</div>
);
