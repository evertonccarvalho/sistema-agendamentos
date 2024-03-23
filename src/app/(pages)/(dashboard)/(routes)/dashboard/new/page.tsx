"use client";

import BreadCrumb from "@/components/breadcrumb";
import { useEffect, useState } from "react";
import SchedulingItem from "@/components/schedulingItem";
import { useSession } from "next-auth/react";
import { EventForm } from "../../../components/eventFormEVERTONTESTE";

const NewEvent = () => {
	const breadcrumbItems = [{ title: "Criar Novo Evento", link: "/new" }];
	const { data } = useSession();

	const [userName, setUserName] = useState<string | undefined>("Zé da manga");
	const [eventName, setEventName] = useState<string | undefined>(undefined);
	const [eventDuration, setEventDuration] = useState<string | undefined>("30");
	const [eventLocation, setEventLocation] = useState<string | undefined>(
		undefined,
	);

	const getLogedUserName = () => {
		data?.user?.name && setUserName(data.user.name);
	};
	useEffect(() => {
		getLogedUserName();
	});

	// const [data, setData] = useState<EventFormValues | undefined>(undefined);
	// console.log(data);
	return (
		<main className="flex-1 gap-5 space-y-4 bg-card/80 p-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<section className="flex w-full items-start justify-between gap-3 flex-wrap">
				<EventForm initialData={null} />
				{/* <NewEventForm
					setEventName={setEventName}
					setEventDuration={setEventDuration}
					setEventLocation={setEventLocation}
				/> */}
				<section className="w-[37rem] h-[26rem] rounded-md max-w-[1200px] border-[1px] border-zinc-700 flex flex-col max-[1135px]:w-full md:flex-row">
					<SchedulingItem
						userName={userName}
						eventName={eventName}
						eventDuration={eventDuration}
						eventLocation={eventLocation}
					/>
				</section>
			</section>
		</main>
	);
};

export default NewEvent;
