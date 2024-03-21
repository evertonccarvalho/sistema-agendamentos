"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Timer } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../app/(pages)/(dashboard)/(routes)/scheduling/helpers/hours";

const SchedulingItem = () => {
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
			{/* serviços */}
			<section className="w-full md:max-w-[25%]  ">
				<div className="p-4 flex gap-2 flex-col  w-full items-center justify-center md:items-start">
					<h2 className="font-semibold text-sm text-muted">Éverton Carvalho</h2>
					<h1 className="font-semibold text-xl">Serviço X</h1>
					<div className="flex gap-2  md:flex-col">
						<div className="flex items-center gap-1">
							<Timer size={18} />
							<p className="text-xs text-muted">30 Min</p>
						</div>
						<div className="flex items-center gap-1">
							<MapPin size={18} />
							<p className=" font-semibold  text-muted">Local</p>
						</div>
					</div>
				</div>
			</section>

			{/* serviços */}
			<Separator orientation="vertical" className="hidden md:block" />
			<Separator orientation="horizontal" className="md:hidden" />

			<section className="flex flex-col justify-start w-full p-4">
				<h1 className="font-semibold  text-xl">Selectione a Data e Hora</h1>
				<div className="flex flex-col  md:flex-row gap-2 w-full h-full  ">
					<div className=" w-full h-full ">
						<Calendar
							mode="single"
							initialFocus
							selected={date}
							onSelect={handleDateClick}
							className="w-full h-full  flex "
							locale={ptBR}
							numberOfMonths={1}
							fromDate={new Date()}
							styles={{
								caption: { textTransform: "capitalize" },
								cell: {
									width: "100%",
									height: "40px",
								},
								button: {
									width: "100%",
									height: "100%",
								},
								nav_button_previous: {
									width: "32px",
									height: "32px",
								},
								nav_button_next: {
									width: "32px",
									height: "32px",
								},
							}}
						/>
					</div>

					{date && (
						<div className="flex flex-col  gap-2 md:w-fit w-full max-w-[300px] md:max-h-[420px]  h-full">
							<h1 className="text-sm font-semibold capitalize truncate py-2  flex items-center justify-center mx-2 md:py-4">
								{format(date, "EEEE dd 'de' MMMM", { locale: ptBR })}
							</h1>
							<div className="flex md:flex-col gap-2 overflow-x-auto py-3 px-4  [&::-webkit-scrollbar]:hidden">
								{timeList.map((time) => (
									<Button
										onClick={() => handleHourClick(time)}
										variant={hour === time ? "default" : "outline"}
										className="rounded-md py-1"
										size="sm"
										key={time}
									>
										{time}
									</Button>
								))}
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default SchedulingItem;