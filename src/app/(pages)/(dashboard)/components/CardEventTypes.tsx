import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { EventType } from "@prisma/client";
import { Loader, Pencil, Share2Icon, Trash2 } from "lucide-react";

interface CardEventProps {
	eventType: EventType;
}

export function CardEventTypes({ eventType }: CardEventProps) {
	return (
		<section className="flex flex-col gap-5 bg-secondary w-96 min-h-40 rounded-md p-6 border-[1px] border-zinc-700">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-1">
					<Loader size={16} />
					<h1 className="text-base font-normal">{eventType.name}</h1>
				</div>
				<Button size={"sm"} variant={"destructive"}>
					<Trash2 size={16} />
				</Button>
			</div>
			<Separator className="bg-zinc-700" />
			<div className="flex w-full">
				<p className="text-sm font-light">{eventType.description}</p>
			</div>
			<div className="flex w-full items-center justify-between">
				<Button variant={"outline"} className="flex items-center gap-1">
					Editar <Pencil size={16} />
				</Button>
				{/* TODO COPIAR LINK */}
				<Button className="text-white flex items-center gap-1">
					Compartilhar <Share2Icon size={16} />
				</Button>
			</div>
		</section>
	);
}
