import { Calendar } from '@/components/ui/calendar';
import { ptBR } from 'date-fns/locale';

interface DateSelectorProps {
  date: Date | undefined;
  handleDateClick: (date: Date | undefined) => void;
}

const DateSelector = ({ date, handleDateClick }: DateSelectorProps) => {
  return (
    <Calendar
      mode="single"
      initialFocus
      selected={date}
      onSelect={handleDateClick}
      className="w-full h-fit "
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
  );
};

export default DateSelector;
