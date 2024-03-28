"use client";

import BreadCrumb from "@/components/breadcrumb";
import { useState } from "react";
import SchedulingItem from "@/components/schedulingItem";
import { useSession } from "next-auth/react";
import { NewEventForm } from "../../../components/NewEventForm";
import { Card } from "@/components/ui/card";

const NewEvent = () => {
	const breadcrumbItems = [{ title: "Criar Novo Evento", link: "/new" }];
	const { data } = useSession();

	const [eventName, setEventName] = useState<string | undefined>(undefined);
	const [eventDuration, setEventDuration] = useState<string | undefined>("30");
	const [eventLocation, setEventLocation] = useState<string | undefined>(
		undefined,
	);

	const userName = data?.user.name || ''

	return (
		<main className="flex-1 space-y-4  md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<Card className="drop-shadow-lg bg-muted/50 border  md:p-6 rou p-2 flex-col md:flex-row  flex w-full  items-center md:items-start justify-center gap-3 ">
				<NewEventForm
					setEventName={setEventName}
					setEventDuration={setEventDuration}
					setEventLocation={setEventLocation}
				/>
				{/* <section className="w-[37rem] h-[26rem] rounded-md max-w-[1200px] border-[1px] flex flex-col max-[1135px]:w-full md:flex-row"> */}
				<SchedulingItem
					eventData={{ userName, eventName, eventDuration, eventLocation }}
				/>
				{/* </section> */}
			</Card>
		</main>
	);
};

export default NewEvent;
