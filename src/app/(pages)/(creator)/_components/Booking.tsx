"use client";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { createBooking } from "@/actions/scheduling/createBooking";
import type { IEventType } from "@/actions/eventType/interface";
import { toast } from "sonner";
import DateSelector from "./DataSelector";
import EventInfor from "./EventInfor";
import { FormModal } from "./formModal";
import { GuestForm, type GuestFormValues } from "./guestForm";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { getTimePerDate } from "@/helpers/hours";
import AvailabilityList from "../../(dashboard)/(routes)/dashboard/_components/AvailabilityList ";
import { useQuery } from "@tanstack/react-query";
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
	const [hour, setHour] = useState<number | undefined>();
	const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();
	const isDateSelected = !!selectedDate;
	const userId = data.creatorId;
	// const [availability, setAvailability] = useState<Availability>();
	// const [dayBookings, setDayBookings] = useState<Scheduling[]>([]);

	const selectedDateWithoutTime = selectedDate
		? dayjs(selectedDate).format("YYYY-MM-DD")
		: null;

	const { data: availability } = useQuery({
		queryKey: ["availability", userId, selectedDateWithoutTime],
		queryFn: async () => {
			if (selectedDateWithoutTime) {
				return await getTimePerDate(userId, selectedDateWithoutTime);
			}
		},
		enabled: !!selectedDateWithoutTime, // Só ativa a consulta quando selectedDateWithoutTime está definido
	});

	function handleSelectTime(hour: number) {
		const dateWithTime = dayjs(selectedDate)
			.set("hour", hour)
			.startOf("hour")
			.toDate();
		setSelectedDateTime(dateWithTime);
		setOpen(true);
	}

	//
	// useEffect(() => {
	// 	if (!selectedDate) {
	// 		return;
	// 	}

	// 	const refreshAvailableHours = async () => {
	// 		const _dayBookings = await getDayBookings(data.creatorId, selectedDate);
	// 		setDayBookings(_dayBookings);
	// 	};

	// 	refreshAvailableHours();
	// }, [selectedDate, data.creatorId]);

	const handleDateClick = (date: Date | undefined) => {
		setSelectedDate(date);
		setHour(undefined);
	};

	const handleBookingSubmit = async (formData: GuestFormValues) => {
		setSubmitIsLoading(true);

		try {
			if (!selectedDateTime) {
				console.log("selectedDate is not defined:", hour, selectedDate);
				return;
			}
			const newDate = selectedDateTime;
			// console.log("New date:", newDate);
			await createBooking({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				message: formData.message,
				eventId: data.id,
				userId: data.creatorId,
				date: newDate,
			});

			// console.log("Booking created successfully.");

			// Prepare data for email sending
			const dataForEmail = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				message: formData.message,
				creatorName: data.creator.name,
				creatorEmail: data.creator.email,
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
					toast.success("Agendamento realizado com sucesso!", {
						description: format(
							newDate,
							"'Para' dd 'de' MMMM 'às' HH':'mm'.'",
							{
								locale: ptBR,
							},
						),
						action: {
							label: "Voltar Para inicio",
							onClick: () => {
								window.history.go(-2);
							},
						},
					});
				} else {
					toast.error(
						"Ocorreu um erro ao enviar o formulário. Por favor, verifique os campos.",
					);
				}
			} catch (error) {
				console.error("Error during email request:", error);
				toast.error("Ocorreu um erro ao enviar o formulário.");
			}

			setHour(undefined);
			setSelectedDate(undefined);

			const queryParams = new URLSearchParams({
				name: formData.name,
				email: formData.email,
				creatorName: data.creator.name || "",
				eventType: data.name,
				date: newDate.toISOString(),
			});

			const username = data.creator.email?.substring(
				0,
				data.creator.email.indexOf("@"),
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
			<section className="w-full h-full  flex flex-col md:flex-row ">
				<EventInfor data={data} />
				<Separator orientation="horizontal" className="md:hidden" />
				<Separator orientation="vertical" className="max-md:hidden" />
				<div className="w-full flex flex-col gap-2 p-2 items-center justify-center">
					<h1 className="font-semibold  text-xl">Selectione a Data e Hora</h1>
					<div className=" w-full h-full flex flex-col md:flex-row gap-2 ">
						<DateSelector
							date={selectedDate}
							handleDateClick={handleDateClick}
							userId={data.creatorId}
						/>
						<AvailabilityList
							availability={availability}
							handleSelectTime={handleSelectTime}
							isDateSelected={isDateSelected}
							selectedDate={selectedDate}
						/>
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
			</section>
		</>
	);
};
export default BookingItem;
