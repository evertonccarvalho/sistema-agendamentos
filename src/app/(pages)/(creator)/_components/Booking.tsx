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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
  data: IEventType;
}
const BookingItem = ({ data }: BookingItemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [day, setDay] = useState<IScheduling[]>([]);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  console.log("data que chegou no bookings", data);
  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);

    try {
      if (!hour || !date) {
        return;
      }

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await createScheduling({
        name: "Everton",
        email: "evertonsna@gmail.com",
        message: "OLA GRAVANDO AGENDAMENTO",
        phone: "88888888",

        eventId: data.id,
        userId: data.creatorId,
        date: newDate,
      });

      setHour(undefined);
      setDate(undefined);
      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => alert("OK"),
        },
      });
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
      <div className=" w-full h-full p-4 flex flex-col md:flex-row ">
        <EventInfor data={data} />
        <Separator orientation="horizontal" className="bg-zinc-700 md:hidden" />
        <Separator orientation="vertical" className="bg-zinc-700" />
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
          <Button
            onClick={handleBookingSubmit}
            disabled={!hour || !date || submitIsLoading}>
            {submitIsLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
            Confirmar
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingItem;
