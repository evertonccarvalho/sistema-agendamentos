import BreadCrumb from "@/components/breadcrumb";
import { EventForm } from "../../../components/eventFormEVERTONTESTE";
import SchedulingItem from "@/components/schedulingItem";
import { getEventsById } from "@/actions/eventType/getEventById";
import { redirect } from "next/navigation";

interface EventDetailsProps {
	params: {
		id?: string;
	};
}

const UpdateEvent = async ({ params }: EventDetailsProps) => {
	const breadcrumbItems = [{ title: "Criar Novo Evento", link: "/new" }];

	if (!params?.id) {
		return redirect("/dashboard");
	}

	const event = await getEventsById(params.id);

	console.log(event);

	return (
		<main className="flex-1 gap-5 space-y-4 bg-card/80 p-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			{event && (
				<section className="flex w-full items-start justify-between gap-3 flex-wrap">
					<EventForm initialData={event} />
					<section className="w-[37rem] h-[26rem] rounded-md max-w-[1200px] border-[1px] border-zinc-700 flex flex-col max-[1135px]:w-full md:flex-row">
						<SchedulingItem />
					</section>
				</section>
			)}
		</main>
	);
};

export default UpdateEvent;
