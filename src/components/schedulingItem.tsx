"use client";
import { Separator } from "@/components/ui/separator";
import { MapPin, Timer } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../app/(pages)/(dashboard)/(routes)/scheduling/helpers/hours";
import DateSelector from "@/app/(pages)/(creator)/_components/DataSelector";
import TimeSelector from "@/app/(pages)/(creator)/_components/TimerSelector";
import { Card } from "./ui/card";

interface SchedulingItemProps {
	eventData: {
		userName?: string;
		eventName?: string;
		eventDuration?: string;
		eventLocation?: string;
	};
}
const SchedulingItem = ({ eventData }: SchedulingItemProps) => {
	const { data } = useSession();

	const [date, setDate] = useState<Date | undefined>(undefined);
	const [hour, setHour] = useState<string | undefined>();
	const [day, setDay] = useState<Scheduling[]>([]);
	const [isLoading, setIsloading] = useState(false);

	interface Scheduling {
		id: string;
		email: string;
		phone: string;
		message: string;
		// status: $Enums.SchedulingStatus;
		userId: string;
		eventId: string;
		date: Date;
	}

	const handleDateClick = (date: Date | undefined) => {
		setDate(date);
		setHour(undefined);
	};

	const handleHourClick = (time: string) => {
		setHour(time);
	};

	const timeList = useMemo(() => {
		if (!date) {
			return [];
		}

		return generateDayTimeList(date).filter((time) => {
			const timeHour = Number(time.split(":")[0]);
			const timeMinutes = Number(time.split(":")[1]);

			const scheduling = day.find((scheduling) => {
				const schedulingHour = scheduling.date.getHours();
				const schedulingMinutes = scheduling.date.getMinutes();

				return schedulingHour === timeHour && schedulingMinutes === timeMinutes;
			});

			if (!scheduling) {
				return true;
			}

			return false;
		});
	}, [date, day]);

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
							<DateSelector date={date} handleDateClick={handleDateClick} />
							{date && (
								<TimeSelector
									date={date}
									timeList={timeList}
									hour={hour}
									handleHourClick={handleHourClick}
								/>
							)}
						</div>
					</div>
				</div>
			</Card>
		</>
	);
};

export default SchedulingItem;
