"use client";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { createBooking } from "@/actions/scheduling/createBooking";
import type { IEventType } from "@/actions/eventType/interface";
import { toast } from "sonner";
import DateSelector from "./DataSelector";
import EventInfor from "./EventInfor";
import { FormModal } from "./formModal";
import { GuestForm, type GuestFormValues } from "./guestForm";
import { useRouter } from "next/navigation";
import { getDayBookings } from "@/actions/scheduling/getDayBookings";
import type { Scheduling } from "@prisma/client";
import dayjs from "dayjs";
import { getTimePerDate } from "@/helpers/hours";
import { Button } from "@/components/ui/button";
interface BookingItemProps {
	data: IEventType;
}

interface Availability {
	possibleTimes: number[];
	availableTimes: number[];
}
const BookingItem = ({ data }: BookingItemProps) => {
	const [submitIsLoading, setSubmitIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [availability, setAvailability] = useState<Availability>();
	const [hour, setHour] = useState<number | undefined>();
	const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();
	const isDateSelected = !!selectedDate;
	const userId = data.creatorId;
	const [dayBookings, setDayBookings] = useState<Scheduling[]>([]);

	const selectedDateWithoutTime = selectedDate
		? dayjs(selectedDate).format("YYYY-MM-DD")
		: null;

	useEffect(() => {
		const fetchAvailability = async () => {
			try {
				if (selectedDateWithoutTime) {
					const res = await getTimePerDate(userId, selectedDateWithoutTime);
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
		setSelectedDateTime(dateWithTime);
		setOpen(true);
	}

	//
	useEffect(() => {
		if (!selectedDate) {
			return;
		}

		const refreshAvailableHours = async () => {
			const _dayBookings = await getDayBookings(data.creatorId, selectedDate);
			setDayBookings(_dayBookings);
		};

		refreshAvailableHours();
	}, [selectedDate, data.creatorId]);

	const handleDateClick = (date: Date | undefined) => {
		setSelectedDate(date);
		setHour(undefined);
	};

	const handleBookingSubmit = async (formData: GuestFormValues) => {
		setSubmitIsLoading(true);

		try {
			if (!selectedDateTime) {
				return;
			}
			const newDate = selectedDateTime;
			await createBooking({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				message: formData.message,
				eventId: data.id,
				userId: data.creatorId,
				date: newDate,
			});

			// Prepare data for email sending
			const dataForEmail = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				message: formData.message,
				creatorName: data.creator.name,
				eventType: data.name,
				date: newDate,
			};

			// Send data via email
			try {
				const response = await fetch("/api/email", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(dataForEmail),
				});
				const responseData = await response.json();
				console.log("Email response:", responseData);
				if (responseData.status === "OK") {
					toast.success(
						`${dataForEmail.name} seu formulário enviado com sucesso!`
					);
				} else {
					toast.error(
						"Ocorreu um erro ao enviar o formulário. Por favor, verifique os campos."
					);
				}
			} catch (error) {
				console.error("Error during email request:", error);
				toast.error("Ocorreu um erro ao enviar o formulário.");
			}

			setHour(undefined);
			setSelectedDate(undefined);
			toast("Reserva realizada com sucesso!", {
				description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
					locale: ptBR,
				}),
				action: {
					label: "Visualizar",
					onClick: () => alert("OK"),
				},
			});

			const queryParams = new URLSearchParams({
				name: formData.name,
				email: formData.email,
				creatorName: data.creator.name || "",
				eventType: data.name,
				date: newDate.toISOString(),
			});

			const username = data.creator.email?.substring(
				0,
				data.creator.email.indexOf("@")
			);
			router.push(`${`/${username}/success`}?${queryParams}`);
		} catch (error) {
			console.error("Error during booking submission:", error);
		} finally {
			setSubmitIsLoading(false);
		}
	};

	return (
		<>
			<div className=" w-full h-full p-4 flex flex-col md:flex-row ">
				<EventInfor data={data} />
				<Separator orientation="horizontal" className="md:hidden" />
				<Separator orientation="vertical" className="max-md:hidden" />
				<div className="w-full flex flex-col gap-2 p-2 items-center justify-center">
					<h1 className="font-semibold  text-xl">Selectione a Data e Hora</h1>

					<div className=" w-full h-full flex flex-col md:flex-row gap-2 ">
						<DateSelector
							date={selectedDate}
							handleDateClick={handleDateClick}
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
