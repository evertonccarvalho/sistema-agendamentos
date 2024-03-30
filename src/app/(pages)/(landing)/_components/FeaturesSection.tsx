import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, Clock, User } from "lucide-react";

interface FeatureProps {
	icon: JSX.Element;
	title: string;
	description: string;
}

const features: FeatureProps[] = [
	{
		title: "Agendamento Online",
		description:
			"Permita que seus clientes agendem compromissos online facilmente, sem a necessidade de contato direto.",
		icon: <Calendar className="text-primary" />,
	},
	{
		title: "Gestão de Horários",
		description:
			"Gerencie eficientemente seus horários e disponibilidades, evitando conflitos e maximizando a eficiência.",
		icon: <Clock className="text-primary" />,
	},
	{
		title: "Notificações Automatizadas",
		description:
			"Envie lembretes automáticos e confirmações de agendamento para seus clientes, mantendo-os informados e reduzindo no-shows.",
		icon: <Bell className="text-primary" />,
	},
	{
		title: "Perfil do Cliente",
		description:
			"Obtenha insights valiosos sobre seus clientes, permitindo uma personalização precisa e um atendimento mais eficaz.",
		icon: <User className="text-primary" />,
	},
];

export const FeaturesSection = () => {
	return (
		<section id="features" className="container  text-center ">
			<h2 className="text-3xl  md:text-4xl font-bold ">
				Nossos <span className="text-primary">Serviços de Agendamento</span>
			</h2>
			<p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
				Facilite a gestão do seu tempo e das suas marcações com nossos
				serviços especializados em agendamento online.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{features.map(({ icon, title, description }: FeatureProps) => (
					<Card key={title} className="bg-muted">
						<CardHeader className="p-4">
							<CardTitle className="grid gap-2 text-lg place-items-center">
								<div className="mt-1 bg-primary/20 p-4 rounded-full">
									{icon}
								</div>
								{title}
							</CardTitle>
						</CardHeader>
						<CardContent className="text">{description}</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};
