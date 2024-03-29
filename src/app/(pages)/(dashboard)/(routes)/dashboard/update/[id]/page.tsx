"use client";
import BreadCrumb from "@/components/breadcrumb";
import { NewEventForm } from "../../components/NewEventForm";
import SchedulingItem from "@/app/(pages)/(dashboard)/(routes)/dashboard/components/schedulingItem";
import { getEventsById } from "@/actions/eventType/getEventById";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import type { EventType } from "@prisma/client";

interface EventDetailsProps {
	params: {
		id?: string;
	};
}

const UpdateEvent = ({ params }: EventDetailsProps) => {
	const { data } = useSession();
	const [eventName, setEventName] = useState<string | undefined>(undefined);
	const [eventDuration, setEventDuration] = useState<string | undefined>("30");
	const [eventLocation, setEventLocation] = useState<string | undefined>(
		undefined,
		);
		
	const [initialData, setInititalData] = useState<EventType | null>(null);
		
	const getData = useCallback(async () => {
		if (!params?.id) {
			return redirect("/dashboard");
		}

		const event = await getEventsById(params.id);

		if (event !== undefined) {
			setInititalData(event);
			setEventName(event?.name);
			setEventDuration(event?.duration.toString());
			setEventLocation(event?.locationType?.toString());
		}
	}, [params?.id]);

	useEffect(() => {
		getData();
	},[getData]);

	const userName = data?.user.name || "";
	const userId = data?.user.id || "";
	const breadcrumbItems = [{ title: "Editar Evento", link: "/new" }];

	return (
		<main className="flex-1 gap-5 space-y-4 bg-card/80 p-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			{initialData && (
				<section className="flex w-full items-start justify-center gap-3 flex-wrap">
					<NewEventForm
						setEventName={setEventName}
						setEventDuration={setEventDuration}
						setEventLocation={setEventLocation}
						initialData={initialData}
					/>
					<section className="w-[37rem] h-[30rem] rounded-md max-w-[1200px] border-[1px] border-zinc-700 flex flex-col max-[1135px]:w-full md:flex-row">
						<SchedulingItem
							userId={userId}
							eventData={{ userName, eventName, eventDuration, eventLocation }}
						/>
					</section>
				</section>
			)}
		</main>
	);
};

export default UpdateEvent;
