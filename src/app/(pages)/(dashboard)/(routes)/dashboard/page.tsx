import BreadCrumb from "@/components/breadcrumb";
import EventPageHeader from "./components/eventPageHeader";
import { redirect } from "next/navigation";
import CardEventTypes from "../../components/CardEventTypes";
import { getEventsByCreatorId } from "@/actions/eventType/getEvent";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "../../../../../../auth";

const Dashboard = async () => {
	const breadcrumbItems = [{ title: "Tipos de Evento", link: "/dashboard" }];
	const session = await auth();

	if (!session?.user || !session.user.id) {
		return redirect("/");
	}

	const events = session.user.id ? await getEventsByCreatorId(session.user.id) : [];
	return (
		<main className="flex-1 space-y-4  md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<Card className="drop-shadow-lg bg-muted/50 border md:p-6 rou p-2">
				<EventPageHeader />
				<Separator className='my-4' />
				<section className="flex flex-wrap w-full gap-5 items-center justify-center">
					{events?.map((event) => (
						<CardEventTypes key={event.id} eventType={event} />
					))}
				</section>
			</Card>
		</main>
	);
};

export default Dashboard;
