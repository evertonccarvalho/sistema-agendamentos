import BreadCrumb from "@/components/breadcrumb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { IScheduling } from "./interface/interface";
import { getBookings } from "@/actions/scheduling/getBookings";
import ScheduledEventItem from "./components/ScheduledEventItem";

const ScheduledEvents = async () => {
	const breadcrumbItems = [{ title: "Tipos de Evento", link: "/dashboard" }];
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return redirect("/");
	}

	const scheduledEvents = await getBookings(session.user.id);
	console.log(scheduledEvents);
	return (
		<main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<h1>Eventos Marcados</h1>
			<div className="w-full ">
				{scheduledEvents?.map((item: IScheduling) => {
					return <ScheduledEventItem key={item.id} scheduling={item} />;
				})}
			</div>
		</main>
	);
};

export default ScheduledEvents;
