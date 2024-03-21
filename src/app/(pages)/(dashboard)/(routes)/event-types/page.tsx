import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CardEventTypes } from "../../components/CardEventTypes";

export default function EventTypePage() {
	return (
		<main className="flex flex-col items-center justify-between gap-5 p-16">
			<section className="flex w-full flex-col gap-2 items-center justify-center">
				<h1 className="text-base font-normal">ziriguidum</h1>
				<p className="text-sm font-light">ziriguidum@ziri.com.br</p>
			</section>
			<section className="flex items-center justify-end w-[70%]">
				<Button className="text-white">
					Adicionar <Plus size={16} />
				</Button>
			</section>
			<section className="flex flex-wrap w-5/6 gap-5 items-center justify-center">
				<CardEventTypes />
				<CardEventTypes />
				<CardEventTypes />
				<CardEventTypes />
				<CardEventTypes />
				<CardEventTypes />
			</section>
		</main>
	);
}
