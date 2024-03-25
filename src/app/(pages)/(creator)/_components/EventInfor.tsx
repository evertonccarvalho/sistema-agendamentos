import type { IEventType } from "@/actions/eventType/interface";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Timer } from "lucide-react";
interface EventInforProps {
	data: IEventType;
}
const EventInfor = ({ data }: EventInforProps) => {
	const handleBack = (): void => {
		window.history.go(-1);
	}
	return (
		<>
			<section className="w-full md:max-w-[25%]">
				<Button size={"icon"} className="rounded-full bg-card-foreground" onClick={handleBack} type="button"><ArrowLeft size={22} /></Button>
				<div className="p-3 flex gap-2 flex-col w-full items-center justify-center md:items-start">
					<h2 className="font-semibold text-sm text-muted-foreground">
						{data.creator ? (typeof data.creator === 'string' ? data.creator : data.creator.name) : "Nome do Cara"}
					</h2>
					<h1 className="font-semibold text-xl break-words">
						{data.name ? data.name : "Serviço X"}
					</h1>
					<div className="flex gap-2  md:flex-col">
						<div className="flex items-center gap-1">
							<Timer size={18} />
							<p className="text-xs text-muted-foreground">
								{data.duration ? `${data.duration} min` : "30Min"}
							</p>
						</div>
						{data.locationType && (
							<div className="flex items-center gap-1">
								<MapPin size={18} />
								{data.locationType === 'PRESENCIAL' ? (
									<div className="flex flex-col">
										<p className="text-xs  text-muted-foreground">{data.address}</p>
										<p className="text-xs  text-muted-foreground">{data.arrivalInfo}</p>
									</div>

								) : (
									<p className=" font-semibold  text-muted-foreground">
										{data.locationType}
									</p>
								)}

							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default EventInfor;
