"use client";
import ContainerWrapper from "@/components/containerWrapper";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface SuccesPageProps {
	searchParams: {
		creatorName: string;
		name: string;
		eventType: string;
		date: string;
	};
}
const SuccessPage = ({ searchParams }: SuccesPageProps) => {
	const handleback = () => {
		window.history.go(-2);
	};
	return (
		<>
			<ContainerWrapper
				title="Você está agendado"
				subtitle=" Um convite de calendário foi enviado para seu endereço de e-mail."
			>
				<div className="flex flex-col gap-4 bg-secondary max-w-96 w-full min-h-32 rounded-md p-6 border-[1px] border-zinc-700 drop-shadow-md hover:drop-shadow-xl hover:bg-muted/10">
					<div className="flex w-full flex-col gap-2">
						<h1 className="text-base font-semibold ">
							{searchParams.eventType}
						</h1>
						<div className="flex items-center gap-1">
							<User size={22} className="text-primary" />
							<h1 className="text-base font-normal">
								{searchParams.creatorName}
							</h1>
						</div>
						<div className="flex items-center gap-1">
							<Calendar size={22} className="text-primary" />
							<h1 className="text-base font-normal">
								{format(
									new Date(searchParams.date ?? ""),
									"dd/MM/yyyy 'às' HH:mm"
								)}{" "}
							</h1>
						</div>
					</div>
					<Button onClick={handleback} className="text-white">
						Voltar ao início
					</Button>
				</div>
			</ContainerWrapper>
		</>
	);
};

export default SuccessPage;
