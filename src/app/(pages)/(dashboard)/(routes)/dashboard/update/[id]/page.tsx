"use client";
import BreadCrumb from "@/components/breadcrumb";
import { NewEventForm } from "../../_components/NewEventForm";
import SchedulingItem from "@/app/(pages)/(dashboard)/(routes)/dashboard/_components/schedulingItem";
import { getEventsById } from "@/actions/eventType/getEventById";
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import type { EventType } from "@prisma/client";
import { Card } from "@/components/ui/card";



const UpdateEvent = () => {
  const params = useParams<{ id: string }>();
	const { data } = useSession();
	const [eventName, setEventName] = useState<string | undefined>(undefined);
	const [eventDuration, setEventDuration] = useState<string | undefined>("30");
	const [eventLocation, setEventLocation] = useState<string | undefined>(
		undefined
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
	}, [getData]);

	const userName = data?.user.name || "";
	const userId = data?.user.id || "";
	const breadcrumbItems = [{ title: "Editar Evento", link: "/new" }];

	return (
		<main className="flex-1 space-y-4  md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			{initialData && (
				<Card className="drop-shadow-lg bg-muted/50 border  md:p-6 rou p-2 flex-col md:flex-row  flex w-full  items-center md:items-start justify-center gap-3 ">

					<NewEventForm
						setEventName={setEventName}
						setEventDuration={setEventDuration}
						setEventLocation={setEventLocation}
						initialData={initialData}
					/>
					<SchedulingItem
						userId={userId}
						eventData={{ userName, eventName, eventDuration, eventLocation }}
					/>
				</Card>
			)}
		</main>
	);
};

export default UpdateEvent;
