"use client";
import {
  sendConfirmationEmailToClient,
  sendConfirmationEmailToCreator,
} from "@/actions/email/mail";
import type { IEventType } from "@/actions/eventType/interface";
import { createBooking } from "@/actions/scheduling/createBooking";
import { Separator } from "@/components/ui/separator";
import { getTimePerDate } from "@/helpers/hours";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import AvailabilityList from "../../(dashboard)/(routes)/dashboard/_components/AvailabilityList ";
import DateSelector from "./DataSelector";
import EventInfor from "./EventInfor";
import { FormModal } from "./formModal";
import { GuestForm, type GuestFormValues } from "./guestForm";

dayjs.extend(utc);
interface BookingItemProps {
  data: IEventType;
}

const BookingItem = ({ data }: BookingItemProps) => {
  const userId = data.creatorId;
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<number | undefined>();
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();
  const isDateSelected = !!selectedDate;
  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : null;

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { data: availability } = useQuery({
    queryKey: ["availability", userId, selectedDateWithoutTime],
    queryFn: async () => {
      if (selectedDateWithoutTime) {
        return await getTimePerDate({
          userId,
          date: selectedDateWithoutTime,
          eventDuration: Number(data.duration),
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
    setOpen(true);
  }

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

      await createBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        eventId: data.id,
        userId: userId,
        date: newDate,
      });

      // Send confirmation email to client
      await sendConfirmationEmailToClient({
        name: formData.name,
        email: formData.email,
        creatorEmail: data.creator.email || "",
        eventType: data.name,
        date: newDate.toISOString(),
        creatorName: data.creator.name || "",
      });

      // Send confirmation email to creator
      await sendConfirmationEmailToCreator({
        name: formData.name,
        email: formData.email,
        creatorEmail: data.creator.email || "",
        eventType: data.name,
        date: newDate.toISOString(),
        phone: formData.phone,
        creatorName: data.creator.name || "",
      });

      toast.success("Agendamento realizado com sucesso!", {
        description: dayjs(newDate).utc().format("YYYY-MM-DD HH:mm"),
        action: {
          label: "Voltar Para inicio",
          onClick: () => {
            window.history.go(-2);
          },
        },
      });

      setHour(undefined);
      setSelectedDate(undefined);
      const searchParams = new URLSearchParams({
        name: formData.name || "",
        email: formData.email || "",
        creatorName: data.creator.name || "",
        eventType: data.name || "",
        date: dayjs(newDate).utc().format("YYYY-MM-DD HH:mm"),
      });

      const username = data.creator.email?.substring(
        0,
        data.creator.email.indexOf("@"),
      );

      router.push(`/${username}/success?${searchParams.toString()}`);
    } catch (error) {
      console.error("Error during booking submission:", error);
      toast.error("Ocorreu um erro ao enviar o formulário.");
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
