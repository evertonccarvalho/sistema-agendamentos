import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimeSelectorProps {
	date: Date | null;
	timeList: string[];
	hour: string | undefined;
	handleHourClick: (time: string) => void;
}

const TimeSelector = ({
	date,
	timeList,
	hour,
	handleHourClick,
}: TimeSelectorProps) => {
	return (
		<div className="max-h-[23rem] w-64 p-2 flex flex-col gap-2 items-center">
			<h1 className="text-sm font-semibold capitalize truncate  text-center mx-2 md:py-4">
				{date && format(date, "EEEE dd 'de' MMMM", { locale: ptBR })}
			</h1>
			<ScrollArea className="h-[23rem] w-52 p-4">
				{timeList.map((time) => (
					<Button
						onClick={() => handleHourClick(time)}
						variant={hour === time ? "default" : "outline"}
						className="rounded-md py-1 w-full mb-2"
						size="sm"
						key={time}
					>
						{time}
					</Button>
				))}
			</ScrollArea>
		</div>
	);
};

export default TimeSelector;
