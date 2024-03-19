"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
	return (
		<div className="text-foreground font-bold py-28 flex flex-col items-center text-center space-y-5">
			<div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
				<h1>Agendamento fácil e rápido</h1>
				<div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600" />
			</div>
			<div className="text-sm md:text-xl font-light max-w-3xl text-muted-foreground">
				AgendaÊ é a sua plataforma de automação de agendamento para eliminar a
				troca de e-mails para encontrar o horário perfeito - e muito mais.
			</div>
			<div>
				<Link href={"/login"}>
					<Button
						variant="default"
						className="md:text-lg p-4 md:p-6  font-semibold"
					>
						Cadastre-se gratuitamente
					</Button>
				</Link>
			</div>
			<div className="text-muted-foreground text-xs md:text-sm font-normal">
				Não é necessário cartão de crédito.
			</div>
		</div>
	);
};
