"use client";
import ContainerWrapper from "@/components/containerWrapper";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.extend(utc);

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
							<h1 className="items-center capitalize flex gap-2">
								<Calendar size={22} className="text-primary " />
								{dayjs(searchParams.date ?? "")
									.utc()
									.locale("pt-br")
									.format("dddd, D MMMM [às] HH:mm")}
								;
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
