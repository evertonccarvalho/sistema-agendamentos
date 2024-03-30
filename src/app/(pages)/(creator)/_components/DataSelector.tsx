import { getWeekDaysAvailability } from "@/actions/availability/getWeekDays";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";

interface DateSelectorProps {
  date: Date | undefined;
  handleDateClick: (date: Date | undefined) => void;
  userId: string;
}

const DateSelector = ({ date, handleDateClick, userId }: DateSelectorProps) => {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weekDaysData = await getWeekDaysAvailability(userId);
        setWeekDays(weekDaysData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setError("Error fetching availability data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // Dependência userId garante que o efeito seja chamado quando o userId mudar

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const isDayDisabled = (day: Date): boolean => {
    const weekDay = day.getDay();
    return !weekDays.includes(weekDay);
  };

  return (
    <Calendar
      mode="single"
      initialFocus
      selected={date}
      onSelect={handleDateClick}
      className="w-full h-full"
      locale={ptBR}

      numberOfMonths={1}
      fromDate={new Date()}
      disabled={isDayDisabled}
      styles={{
        caption: { textTransform: "capitalize" },
        cell: { width: "100%", height: "40px" },
        button: { width: "100%", height: "100%" },
        day: { backgroundAttachment: "#3838" },
        nav_button_previous: { width: "32px", height: "32px" },
        nav_button_next: { width: "32px", height: "32px" },
      }}
    />
  );
};

export default DateSelector;
