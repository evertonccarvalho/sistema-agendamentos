"use client";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

import { MapPin, Timer } from "lucide-react";

import { useEffect, useState } from "react";
import DateSelector from "@/app/(pages)/(creator)/_components/DataSelector";
import { Card } from "../../../../../../components/ui/card";
import dayjs from "dayjs";
import { getTimePerDate } from "@/helpers/hours";
import { Button } from "../../../../../../components/ui/button";
interface SchedulingItemProps {
	eventData: {
		userName?: string;
		eventName?: string;
		eventDuration?: string;
		eventLocation?: string;
	};
}
interface Availability {
	possibleTimes: number[];
	availableTimes: number[];
}
const SchedulingItem = ({ eventData }: SchedulingItemProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [availability, setAvailability] = useState<Availability>();
	const { data } = useSession();

	if (!data?.user) {
		return null
	}

	const isDateSelected = !!selectedDate;
	const userId = data.user.id;

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
					const res = await getTimePerDate(userId || '', selectedDateWithoutTime);
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
				<h1 className="bg-foreground/80 text-sm p-1 rounded-t-md text-background text-center  w-full">
					Esta é uma prévia. Para reservar um evento, compartilhe o link com
					seus convidados.
				</h1>
				<div className="w-full h-full p-4 flex flex-col md:flex-row ">
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
							{isDateSelected && (
								<div>
									{availability?.possibleTimes.map((hour) => {
										return (
											<Button
												key={hour}
												onClick={() => handleSelectTime(hour)}
												disabled={!availability.availableTimes.includes(hour)}
												className="rounded-md py-1 w-full mb-2"
												size="sm"
											>
												{String(hour).padStart(2, "0")}:00h
											</Button>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</Card>
		</>
	);
};

export default SchedulingItem;
