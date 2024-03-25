import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { EventType } from "@prisma/client";
import { ArrowUpRightIcon, Timer } from "lucide-react";
import Link from "next/link";

interface CardEventProps {
	creator: string;
	eventType: EventType;
}
const CardEvent = ({ eventType, creator }: CardEventProps) => {
	return (
		<Link href={`/${creator}/${eventType.id}`} className={"max-w-96 w-full"}>
			<Card
				// key={eventType.name}
				className="relative max-w-md md:break-inside-avoid overflow-hidden"
			>
				<CardHeader className="flex flex-row items-center gap-4 pb-2">
					<div className="flex flex-col">
						<CardTitle className="text-lg flex items-center justify-between">
							{eventType.name}
						</CardTitle>
						<CardDescription>{eventType.description}</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="flex gap-2 items-center justify-center">
					<Timer size={22} />
					{eventType.duration} Min
				</CardContent>
				<ArrowUpRightIcon size={22} className="text-primary absolute right-0 m-4 top-0" />
			</Card>
		</Link>
	);
};
export default CardEvent;
