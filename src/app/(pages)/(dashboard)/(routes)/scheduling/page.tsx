"use client";
import { useMemo, useState } from "react";
import SchedulingItem from "../../../../../components/schedulingItem";
import { generateDayTimeList } from "./helpers/hours";
import BreadCrumb from "@/components/breadcrumb";

export default function SchedulingPage() {
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [hour, setHour] = useState<string | undefined>();
	const [day, setDay] = useState<Scheduling[]>([]);

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
	const breadcrumbItems = [{ title: "Criar Novo Evento", link: "/new" }];

	return (
		<>
			<div className="flex-1 space-y-4 bg-card/80  md:p-8 pt-6">
				<BreadCrumb items={breadcrumbItems} />
				<section className=" w-full rounded-md max-w-[1200px] md:min-w-[900px]  border-[1px] border-gray-400  flex flex-col md:flex-row ">
					<SchedulingItem />
				</section>
			</div>
		</>
	);
}
