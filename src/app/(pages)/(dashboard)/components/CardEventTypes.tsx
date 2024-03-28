"use client";
import { deleteEvent } from "@/actions/eventType/deleteEvent";
import { AlertModal } from "@/components/alert-modal";
// import type { EventType } from "@prisma/client";
import { Copy, Share2Icon, Timer } from "lucide-react";
import { useState } from "react";
import { EventSettings } from "./eventSetting";
import { toggleEventTypeActive } from "@/actions/eventType/toggleEventActive";
import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import type { IEventType } from "@/actions/eventType/interface";
import { toast } from "sonner";
import { absoluteUrl } from "@/lib/utils";

interface CardEventProps {
	eventType: IEventType;
}

const CardEventTypes = ({ eventType }: CardEventProps) => {
	const [loading, setLoading] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const router = useRouter();

	const username = eventType.creator.email?.substring(
		0,
		eventType.creator.email.indexOf("@"),
	);
	const eventUrl = absoluteUrl(`/${username}/${eventType.id}`);
	const handleDelete = async () => {
		try {
			setLoading(true);
			setOpenDelete(true);
			await deleteEvent(eventType.id);
		} catch (error) {
			console.error("Error deleting event:", error);
		} finally {
			toast.success("Evento deletado com sucesso.");
			setLoading(false);
			setOpenDelete(false);
		}
	};

	const handleEdit = () => {
		// Implementar a lógica de edição do evento
		router.push(`/dashboard/update/${eventType.id}`);
	};

	const handleShare = () => {
		navigator.clipboard
			.writeText(eventUrl)
			.then(() => {
				console.log(
					"Link do evento copiado para a área de transferência:",
					eventUrl,
				);
			})
			.catch((error) => {
				console.error(
					"Erro ao copiar link do evento para a área de transferência:",
					error,
				);
			});
	};

	const handleToggleActive = async () => {
		try {
			setLoading(true);
			await toggleEventTypeActive(
				eventType.creatorId,
				eventType.id,
				!eventType.active,
			);
			console.log("Estado do evento alterado com sucesso.");
		} catch (error) {
			console.error("Erro ao alternar o estado ativo do evento:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card
			className={`
			relative max-w-xs w-full md:break-inside-avoid overflow-hidden
		border drop-shadow-md hover:drop-shadow-xl  
		${eventType.active
					? "border-t-4  border-t-green-800"
					: "border-t-4  border-t-zinc-700 opacity-80"
				}`}
		>
			<CardHeader className="flex flex-row items-center gap-4 ">
				<div className="flex gap-1 flex-col">
					<CardTitle className="text-lg">{eventType.name}</CardTitle>
					<CardDescription className="flex items-center">
						<Timer size={16} />
						{eventType.duration} Min
					</CardDescription>
					<CardDescription>{eventType.description}</CardDescription>
					<Link href={eventUrl} className="text-sm pt-1 text-blue-600">
						Ver página de reserva
					</Link>
				</div>
				<div className="text-primary absolute right-0 m-4 top-0">
					<EventSettings
						onDelete={() => setOpenDelete(true)}
						onEdit={handleEdit}
						onToggleActive={handleToggleActive}
						isActive={eventType.active}
					/>
				</div>
			</CardHeader>

			<Separator />
			<CardContent className="flex gap-2 p-2 items-center justify-center">
				<div className="w-full flex justify-between">
					<Button
						onClick={handleShare}
						variant="link"
						size="sm"
						className="flex items-center gap-1"
					>
						<Copy size={16} />
						Copiar
					</Button>
					<Button
						onClick={handleShare}
						variant="outline"
						size="sm"
						className="bg-transparent text-primary flex items-center gap-1"
					>
						Compartilhar
						<Share2Icon size={16} />
					</Button>
				</div>
			</CardContent>

			<AlertModal
				isOpen={openDelete}
				onClose={() => setOpenDelete(false)}
				onConfirm={handleDelete}
				loading={loading}
			/>
		</Card>
	);
};
export default CardEventTypes;
