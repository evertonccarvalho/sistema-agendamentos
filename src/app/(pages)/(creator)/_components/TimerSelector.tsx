import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TimeSelectorProps {
  date: Date | null;
  timeList: string[];
  hour: string | undefined;
  handleHourClick: (time: string) => void;
}

const TimeSelector = ({ date, timeList, hour, handleHourClick }: TimeSelectorProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-2  md:w-[30%]  max-w-[340px] md:max-h-[550px]">
      <h1 className="text-sm font-semibold capitalize truncate  text-center mx-2 md:py-4">
        {date && format(date, "EEEE dd 'de' MMMM", { locale: ptBR })}
      </h1>
      <div className="flex md:flex-col gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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
  );
};

export default TimeSelector;
