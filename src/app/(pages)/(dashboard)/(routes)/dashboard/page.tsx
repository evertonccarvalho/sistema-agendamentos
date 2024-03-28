import BreadCrumb from "@/components/breadcrumb";
import EventPageHeader from "./components/eventPageHeader";
import { redirect } from "next/navigation";
import { getEventsByCreatorId } from "@/actions/eventType/getEvent";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "../../../../../../auth";
import CardEventTypes from "../../components/CardEventTypes";
import Image from "next/image";

const Dashboard = async () => {
	const breadcrumbItems = [{ title: "Tipos de Evento", link: "/dashboard" }];
	const session = await auth();

	if (!session?.user || !session.user.id) {
		return redirect("/");
	}

	const events = session.user.id
		? await getEventsByCreatorId(session.user.id)
		: [];
	return (
		<main className="flex-1 space-y-4  md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<Card className="drop-shadow-lg bg-muted/50 border md:p-6 rou p-2">
				<EventPageHeader />
				<Separator className='my-4' />
				<section className="flex flex-wrap w-full gap-5 items-center justify-center">
					{events && events.length > 0 ? (
						events.map((event) => (
							<CardEventTypes key={event.id} eventType={event} />
						))
					) : (
						<div className="py-10 flex gap-2 items-center flex-col justify-center">
							<Image
								src='/Zero_Events.svg'
								alt="zeroEvents"
								width={100}
								height={100}
							/>
							<h1 className="font-semibold text-lg">
								Crie um tipo de evento
							</h1>
							<p className="text-xs text-center text-muted-foreground">
								Você pode usar tipos de evento para configurar detalhes de reuniões para eventos que você agendará regularmente, como demonstração de produto, ligação de cliente ou horário comercial.
							</p>
						</div>
					)}
				</section>

			</Card>
		</main>
	);
};

export default Dashboard;
