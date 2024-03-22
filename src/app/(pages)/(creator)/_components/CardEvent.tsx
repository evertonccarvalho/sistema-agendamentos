import { Separator } from "@/components/ui/separator";
import type { EventType } from "@prisma/client";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

interface CardEventProps {
	creator: string;
	eventType: EventType;
}

const CardEvent = ({ eventType, creator }: CardEventProps) => {

	return (
		<Link
			href={`/${creator}/${eventType.id}`}
			className={
				"flex flex-col gap-2 bg-secondary max-w-96  w-full h-full min-h-32 rounded-md p-6 border-[1px] border-zinc-700 drop-shadow-md hover:drop-shadow-xl 	hover:bg-muted/10	"
			}
		>
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-1">
					<h1 className="text-base font-normal">{eventType.name}</h1>
				</div>
				<ArrowUpRightIcon size={22} className="text-primary" />
			</div>
			<Separator className="bg-zinc-700" />
			<p className="text-sm text-center font-light">
				{eventType.description}
			</p>
		</Link>
	);
};
export default CardEvent;
