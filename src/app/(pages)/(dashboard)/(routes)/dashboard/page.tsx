import BreadCrumb from "@/components/breadcrumb";
import EventPageHeader from "./components/eventPageHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CardEventTypes from "../../components/CardEventTypes";
import { getEventsByCreatorId } from "@/actions/eventType/getEvent";

const Dashboard = async () => {
	const breadcrumbItems = [{ title: "Tipos de Evento", link: "/dashboard" }];
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return redirect("/");
	}

	const events = await getEventsByCreatorId(session.user.id);

	return (
		<main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<EventPageHeader />

			<section className="flex flex-wrap w-full gap-5 items-center justify-center">
				{events?.map((event) => (
					<CardEventTypes key={event.id} eventType={event} />
				))}
			</section>
		</main>
	);
};

export default Dashboard;
