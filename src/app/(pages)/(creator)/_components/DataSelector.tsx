import { getWeekDaysAvailability } from "@/actions/availability/getWeekDays";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { ptBR } from "date-fns/locale";

interface DateSelectorProps {
  date: Date | undefined;
  handleDateClick: (date: Date | undefined) => void;
  userId: string;
}

const DateSelector = ({ date, handleDateClick, userId }: DateSelectorProps) => {

  const {
    data: weekDays,
    isError,
    isLoading,
  } = useQuery<number[]>({
    queryKey: ["weekDays"],
    queryFn: () => getWeekDaysAvailability(userId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const isDayDisabled = (day: Date): boolean => {
    const weekDay = day.getDay();
    return !weekDays?.includes(weekDay);
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
