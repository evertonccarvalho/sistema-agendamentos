"use client"
import BreadCrumb from "@/components/breadcrumb";
import { NewEventForm } from "../../../../components/NewEventForm";
import SchedulingItem from "@/components/schedulingItem";
import { getEventsById } from "@/actions/eventType/getEventById";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type $Enums } from "@prisma/client";

interface EventDetailsProps {
	params: {
		id?: string;
	};
}

const UpdateEvent = ({ params }: EventDetailsProps) => {
	const { data } = useSession();

	const [userName, setUserName] = useState<string | undefined>("Zé da manga");
	const [eventName, setEventName] = useState<string | undefined>(undefined);
	const [eventDuration, setEventDuration] = useState<string | undefined>("30");
	const [eventLocation, setEventLocation] = useState<string | undefined>(
		undefined
	);

	interface IIntialData {
		id: string;
		creatorId: string;
		name: string;
		description: string;
		duration: number;
		active: boolean;
		locationType: $Enums.LocationType | null | undefined;
		capacity: number;
		arrivalInfo: string;
	}
	const [initialData, setInititalData] = useState<IIntialData | undefined>(
		undefined
	);

	const getData = async () => {
		if (!params?.id) {
			return redirect("/dashboard");
		}
		const event = await getEventsById(params.id);

		const data = {
			id: event?.id as string,
			creatorId: event?.creatorId as string,
			name: event?.name as string,
			description: event?.description as string,
			duration: event?.duration as number,
			active: event?.active as boolean,
			locationType: event?.locationType,
			capacity: event?.capacity as number,
			arrivalInfo: event?.arrivalInfo as string,
		};

		setInititalData(data);
	};
	const getLogedUserName = () => {
		data?.user?.name && setUserName(data.user.name);
	};
	useEffect(() => {
		getLogedUserName();
		getData();
	});

	const breadcrumbItems = [{ title: "Criar Novo Evento", link: "/new" }];

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
					<section className="w-[37rem] h-[26rem] rounded-md max-w-[1200px] border-[1px] border-zinc-700 flex flex-col max-[1135px]:w-full md:flex-row">
						<SchedulingItem
							eventData={{ userName, eventName: initialData.name, eventDuration: JSON.stringify(initialData.duration), eventLocation: JSON.stringify(initialData.locationType)}}
						/>
					</section>
				</section>
			)}
		</main>
	);
};

export default UpdateEvent;
