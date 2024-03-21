"use client"
import { deleteEvent } from "@/actions/eventType/deleteEvent";
import { AlertModal } from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { EventType } from "@prisma/client";
import { Loader, Pencil, Share2Icon, Trash2 } from "lucide-react";
import { useState } from "react";

interface CardEventProps {
	eventType: EventType;
}

const CardEventTypes = ({ eventType }: CardEventProps) => {
	const [loading, setLoading] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const handleDelete = async () => {
		try {
			setLoading(true);
			await deleteEvent(eventType.id);
			console.log('Evento deletado com successo.');
		} catch (error) {
			console.error('Error deleting event:', error);
		} finally {
			setLoading(false);
			setOpenDelete(false);
		}
	};

	return (
		<section className="flex flex-col gap-5 bg-secondary w-96 min-h-40 rounded-md p-6 border-[1px] border-zinc-700">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-1">
					<Loader size={16} />
					<h1 className="text-base font-normal">{eventType.name}</h1>
				</div>
				<Button
					onClick={() => setOpenDelete(true)}
					size={"sm"} variant={"destructive"}>
					<Trash2 size={16} />
				</Button>
			</div>
			<Separator className="bg-zinc-700" />
			<div className="flex w-full">
				<p className="text-sm font-light">{eventType.description}</p>
			</div>
			<div className="flex w-full items-center justify-between">
				<Button
					onClick={() => { }}
					variant={"outline"} className="flex items-center gap-1" >
					Editar <Pencil size={16} />
				</Button>
				{/* TODO COPIAR LINK */}
				<Button
					onClick={() => { }}

					className="text-white flex items-center gap-1">
					Compartilhar <Share2Icon size={16} />
				</Button>
			</div>

			<AlertModal
				isOpen={openDelete}
				onClose={() => setOpenDelete(false)}
				onConfirm={handleDelete}
				loading={loading}
			/>
		</section>
	);
}
export default CardEventTypes