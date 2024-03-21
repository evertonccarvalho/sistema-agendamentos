import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

export function NewEventForm() {
	return (
		<section className="flex w-96 p-4 rounded-md flex-col gap-3 border-[1px] border-zinc-700">
			<h1 className="text-2xl font-semibold">Criar Novo Evento</h1>
            <Separator orientation="horizontal" className="bg-zinc-700"/>
			<form className="flex flex-col gap-3">
				<label htmlFor="">
					<span>Nome do Evento.</span>
					<Input type="text" placeholder="Ex. Aulas de Violão" />
				</label>
				<label htmlFor="">
					<span>Duração.</span>
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="30 min" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="15">15 min</SelectItem>
							<SelectItem value="30">30 min</SelectItem>
							<SelectItem value="45">45 min</SelectItem>
							<SelectItem value="60">60 min</SelectItem>
							<SelectItem value="custom">Personalizado</SelectItem>
						</SelectContent>
					</Select>
				</label>
				<div className="flex gap-3">
					<Input type="text" placeholder="Ex. 2" />
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="min" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="m">min</SelectItem>
							<SelectItem value="h">h</SelectItem>
						</SelectContent>
					</Select>
				</div>
                <label htmlFor="">
					<span>Local.</span>
					<Input type="text" placeholder="Ex. Na minha cama." />
				</label>
                <div className="flex gap-3 items-center justify-between">
                    <Button variant={"outline"}>Cancelar</Button>
                    <Button className="text-white flex gap-2">Continuar <ArrowRight width={20}/></Button>
                </div>
			</form>
		</section>
	);
}
