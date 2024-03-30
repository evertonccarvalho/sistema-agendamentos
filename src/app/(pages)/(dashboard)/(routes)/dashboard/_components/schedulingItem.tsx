"use client";
import { Separator } from "@/components/ui/separator";

import { MapPin, Timer } from "lucide-react";

import { useEffect, useState } from "react";
import DateSelector from "@/app/(pages)/(creator)/_components/DataSelector";
import { Card } from "../../../../../../components/ui/card";
import dayjs from "dayjs";
import { getTimePerDate } from "@/helpers/hours";
import "dayjs/locale/pt-br"; // import locale
import AvailabilityList from "./AvailabilityList ";

interface SchedulingItemProps {
	eventData: {
		userName?: string;
		eventName?: string;
		eventDuration?: string;
		eventLocation?: string;
	};
	userId: string;
}
interface Availability {
	possibleTimes: number[];
	availableTimes: number[];
}
const SchedulingItem = ({ eventData, userId }: SchedulingItemProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [availability, setAvailability] = useState<Availability>();

	const isDateSelected = !!selectedDate;

	const selectedDateWithoutTime = selectedDate
		? dayjs(selectedDate).format("YYYY-MM-DD")
		: null;

	const onSelectDateTime = (date: Date | undefined) => {
		setSelectedDate(date);
	};

	useEffect(() => {
		const fetchAvailability = async () => {
			try {
				if (selectedDateWithoutTime) {
					const res = await getTimePerDate(
						userId || "",
						selectedDateWithoutTime,
					);
					setAvailability(res);
				}
			} catch (error) {
				console.error("Error fetching availability:", error);
			}
		};
		if (selectedDateWithoutTime) {
			fetchAvailability();
		}
	}, [userId, selectedDateWithoutTime]);

	function handleSelectTime(hour: number) {
		const dateWithTime = dayjs(selectedDate)
			.set("hour", hour)
			.startOf("hour")
			.toDate();

		onSelectDateTime(dateWithTime);
	}

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
								handleDateClick={setSelectedDate}
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
