"use client";
import { Separator } from "@/components/ui/separator";
import { format, setHours, setMinutes } from "date-fns";

import { ptBR } from "date-fns/locale";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../../(dashboard)/(routes)/scheduling/helpers/hours";
import { createScheduling } from "@/actions/scheduling/createScheduling";
import type { IEventType } from "@/actions/eventType/interface";
import type { IScheduling } from "../../(dashboard)/(routes)/scheduledevents/interface/interface";
import { toast } from "sonner";
import DateSelector from "./DataSelector";
import TimeSelector from "./TimerSelector";
import EventInfor from "./EventInfor";
import { FormModal } from "./formModal";
import { GuestForm, type GuestFormValues } from "./guestForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BookingItemProps {
	data: IEventType;
}
const BookingItem = ({ data }: BookingItemProps) => {
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [hour, setHour] = useState<string | undefined>();
	const [day, setDay] = useState<IScheduling[]>([]);
	const [submitIsLoading, setSubmitIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const handleDateClick = (date: Date | undefined) => {
		setDate(date);
		setHour(undefined);
	};

	const handleHourClick = (time: string) => {
		setHour(time);
		setOpen(true);
	};

	const handleBookingSubmit = async (formData: GuestFormValues) => {
		setSubmitIsLoading(true);

		try {
			if (!hour || !date) {
				return;
			}

			const dateHour = Number(hour.split(":")[0]);
			const dateMinutes = Number(hour.split(":")[1]);

			const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

			await createScheduling({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				message: formData.message,

				eventId: data.id,
				userId: data.creatorId,
				date: newDate,
			});

			// Preparar dados para envio por e-mail
			const dataForEmail = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				message: formData.message,
				creatorName: data.creator.name,
				eventType: data.name,
				date: newDate,
			};

			// Enviar dados por e-mail
			try {
				const response = await fetch("/api/email", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(dataForEmail),
				});

				const responseData = await response.json(); // Convertendo a resposta para JSON
				console.log(responseData);
				responseData.status !== "OK" &&
					toast.error(
						"Ocorreu um erro ao enviar o formulário. Por favor, verifique os campos."
					);
			} catch (error) {
				console.error("Erro durante a requisição:", error);
				toast.error("Ocorreu um erro ao enviar o formulário.");
			}

			setHour(undefined);
			setDate(undefined);
			toast("Reserva realizada com sucesso!", {
				description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
					locale: ptBR,
				}),
			});

			const queryParams = new URLSearchParams({
				name: formData.name,
				email: formData.email,
				creatorName: data.creator.name || "",
				eventType: data.name,
				date: newDate.toISOString(),
			});
			const username = data.creator.email?.substring(0, data.creator.email.indexOf("@"));
			router.push(`${`/${username}/success`}?${queryParams}`);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitIsLoading(false);
		}
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
			<div className="w-full h-full p-4 flex flex-col md:flex-row">
				<EventInfor data={data} />
				<Separator orientation="horizontal" className="bg-zinc-700 md:hidden" />
				<Separator orientation="vertical" className="bg-zinc-700 max-md:hidden" />
				<div className="w-full flex flex-col gap-2 p-2 items-center justify-center">
					<h1 className="font-semibold  text-xl">Selectione a Data e Hora</h1>

					<div className="w-full h-full flex items-start justify-between md:flex-row gap-2 flex-col">
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
				<FormModal
					isOpen={open}
					onClose={() => setOpen(false)}
					onConfirm={() => handleBookingSubmit}
					loading={submitIsLoading}
					title="Reservar Evento"
				>
					<GuestForm
						onClose={() => setOpen(false)}
						onSubmit={handleBookingSubmit}
					/>
				</FormModal>
			</div>
		</>
	);
};

export default BookingItem;
