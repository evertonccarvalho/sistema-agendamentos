import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Loader, Pencil, Trash2 } from "lucide-react";

export function CardEventTypes() {
	return (
		<section className="flex flex-col gap-5 bg-secondary w-96 min-h-40 rounded-md p-6 border-[1px] border-zinc-700">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-1">
					<Loader size={16} />
					<h1 className="text-base font-normal">Meu compromisso</h1>
				</div>
				<Button size={"sm"} variant={"destructive"}>
					<Trash2 size={16} />
				</Button>
			</div>
			<Separator className="bg-zinc-700" />
			<div className="flex w-full">
				<p className="text-sm font-light">Alguma observação</p>
			</div>
			<div className="flex w-full items-center justify-between">
				<Button variant={"outline"}>
					Editar <Pencil size={16} />
				</Button>
				<Button className="text-white">
					Ver Agenda <ArrowRight size={16} />
				</Button>
			</div>
		</section>
	);
}
