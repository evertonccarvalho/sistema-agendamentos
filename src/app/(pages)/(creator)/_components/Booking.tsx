"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { format, setHours, setMinutes } from "date-fns";

import { ptBR } from "date-fns/locale";
import { Loader2, MapPin, Timer } from "lucide-react";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../../(dashboard)/(routes)/scheduling/helpers/hours";
import { createScheduling } from "@/actions/scheduling/createScheduling";
import type { IEventType } from "@/actions/eventType/interface";
import type { IScheduling } from "../../(dashboard)/(routes)/scheduledevents/interface/interface";
import { toast } from 'sonner';

interface BookingItemProps {
  data: IEventType;
}
const BookingItem = ({ data }: BookingItemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [day, setDay] = useState<IScheduling[]>([]);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  console.log('data que chegou no bookings', data)
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
      toast('Reserva realizada com sucesso!', {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: 'Visualizar',
          onClick: () => alert('OK'),
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
      {/* serviços */}
      <div className=" w-full h-full p-4 flex flex-col md:flex-row ">
        <section className="w-full md:max-w-[25%]  ">
          <div className="p-3 flex gap-2 flex-col w-full items-center justify-center md:items-start">
            <h2 className="font-semibold text-sm text-muted">
              {data.name ? data.name : "Nome do Cara"}
            </h2>
            <h1 className="font-semibold text-xl break-words">
              {data.name ? data.name : "Serviço X"}
            </h1>
            <div className="flex gap-2  md:flex-col">
              <div className="flex items-center gap-1">
                <Timer size={18} />
                <p className="text-xs text-muted">
                  {data.duration ? `${data.duration} min` : "30Min"}
                </p>
              </div>
              {data.locationType && (
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <p className=" font-semibold  text-muted">
                    {data.locationType}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* serviços */}
        <Separator
          orientation="vertical"
          className="bg-zinc-700 hidden md:block"
        />
        <Separator orientation="horizontal" className="bg-zinc-700 md:hidden" />

        <section className="  w-full h-full flex flex-col justify-center items-center  gap-2  p-4">
          <h1 className="font-semibold  text-xl">Selectione a Data e Hora</h1>
          <div className="w-full h-full flex flex-col md:flex-row gap-2  ">
            <div className="w-full h-full ">
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
              <div className="h-full md:w-[30%] flex flex-col gap-2 md:max-w-[300px] max-w-[340px] md:max-h-[550px]  ">
                <h1 className="text-sm font-semibold capitalize truncate  text-center mx-2 md:py-4">
                  {format(date, "EEEE dd 'de' MMMM", { locale: ptBR })}
                </h1>
                <div className="flex md:flex-col gap-2 overflow-x-auto  [&::-webkit-scrollbar]:hidden">
                  {timeList.map((time) => (
                    <Button
                      onClick={() => handleHourClick(time)}
                      variant={hour === time ? "default" : "outline"}
                      className="rounded-md py-1 w-full"
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
          <Button
            onClick={handleBookingSubmit}
            disabled={!hour || !date || submitIsLoading}
          >
            {submitIsLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirmar reserva
          </Button>
        </section>

      </div>
    </>
  );
};

export default BookingItem;
