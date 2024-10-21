"use client";
import { Separator } from "@/components/ui/separator";

import { MapPin, Timer } from "lucide-react";

import DateSelector from "@/app/(pages)/(creator)/_components/DataSelector";
import { getTimePerDate } from "@/helpers/hours";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card } from "../../../../../../components/ui/card";
import AvailabilityList from "./AvailabilityList ";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface SchedulingItemProps {
	eventData: {
		userName?: string;
		eventName?: string;
		eventDuration?: string;
		eventLocation?: string;
	};
	userId: string;
}

const SchedulingItem = ({ eventData, userId }: SchedulingItemProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [hour, setHour] = useState<number | undefined>();
	const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();
	const isDateSelected = !!selectedDate;

	const selectedDateWithoutTime = selectedDate
		? dayjs(selectedDate).format("YYYY-MM-DD")
		: null;

	const { data: availability } = useQuery({
		queryKey: ["availability", userId, selectedDateWithoutTime],
		queryFn: async () => {
			if (selectedDateWithoutTime) {
				return await getTimePerDate({
					userId,
					date: selectedDateWithoutTime,
					eventDuration: Number(eventData.eventDuration),
					intervalDuration: 15,
				});
			}
		},
		enabled: !!selectedDateWithoutTime, // Só ativa a consulta quando selectedDateWithoutTime está definido
	});

	function handleSelectTime(hour: string) {
		const dateWithTime = dayjs(selectedDate)
			.utc()
			.set("hour", parseInt(hour))
			.startOf("hour")
			.toDate();
		setSelectedDateTime(dateWithTime);
	}

	const handleDateClick = (date: Date | undefined) => {
		setSelectedDate(date);
		setHour(undefined);
	};

	return (
		<>
			<Card className="w-full h-full flex flex-col ">
				<header className="bg-foreground/80 text-sm p-1 rounded-t-md text-background text-center  w-full">
					Esta é uma prévia. Para reservar um evento, compartilhe o link com
					seus convidados.
				</header>
				<section className="w-full h-full  flex flex-col md:flex-row ">
					<section className="w-full h-full md:max-w-[25%]  ">
						<div className="p-3 flex gap-2 flex-col w-full items-center justify-center md:items-start">
							<h2 className="font-semibold text-sm text-muted-foreground">
								{eventData.userName ? eventData.userName : "Nome do Cara"}
							</h2>
							<h1 className="font-semibold text-xl break-words">
								{eventData.eventName ? eventData.eventName : "Event Name"}
							</h1>
							<div className="flex gap-2  md:flex-col">
								<div className="flex items-center gap-1">
									<Timer size={18} />
									<p className="text-xs text-muted-foreground">
										{eventData.eventDuration
											? `${eventData.eventDuration} min`
											: "30Min"}
									</p>
								</div>
								<div className="flex items-center gap-1">
									<MapPin size={18} />
									<p className=" font-semibold  text-muted-foreground">
										{eventData.eventLocation
											? eventData.eventLocation
											: "Location"}
									</p>
								</div>
							</div>
						</div>
					</section>
					<Separator orientation="vertical" className="hidden md:block" />
					<Separator orientation="horizontal" className="md:hidden" />
					<div className="w-full flex flex-col gap-2 p-2 items-center justify-center">
						<h1 className="font-semibold  text-xl">Selectione a Data e Hora</h1>
						<div className=" w-full h-full flex flex-col md:flex-row gap-2 ">
							<DateSelector
								date={selectedDate}
								handleDateClick={handleDateClick}
								userId={userId}
							/>
							<AvailabilityList
								availability={availability}
								handleSelectTime={handleSelectTime}
								isDateSelected={isDateSelected}
								selectedDate={selectedDate}
							/>
						</div>
					</div>
				</section>
			</Card>
		</>
	);
};

export default SchedulingItem;
