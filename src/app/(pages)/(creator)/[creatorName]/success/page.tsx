"use client";
import ContainerWrapper from "@/components/containerWrapper";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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
				<>
					<Card className="relative max-w-md md:break-inside-avoid overflow-hidden">
						<CardHeader className="flex flex-row items-center gap-4 pb-2">
							<div className="flex flex-col">
								<CardTitle className="text-lg flex items-center justify-between">
									{searchParams.eventType}
								</CardTitle>
								<CardDescription className=" flex gap-2 items-center">
									<User size={22} className="text-primary" />
									{searchParams.creatorName}
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent className="flex gap-2 items-center flex-col justify-center">
							<h1 className="items-center flex gap-2">
								<Calendar size={22} className="text-primary" />
								{format(new Date(searchParams.date ?? ""), "dd/MM/yyyy 'às' HH:mm",)}
							</h1>
							<Button onClick={handleback} className="text-white">
								Voltar ao início
							</Button>
						</CardContent>
					</Card>
				</>
			</ContainerWrapper>
		</>
	);
};

export default SuccessPage;
