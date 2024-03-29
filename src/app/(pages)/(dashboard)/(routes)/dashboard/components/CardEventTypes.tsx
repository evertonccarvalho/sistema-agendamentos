"use client";
import { deleteEvent } from "@/actions/eventType/deleteEvent";
import { AlertModal } from "@/components/alert-modal";
import { Copy, Timer, Users } from "lucide-react";
import { useState } from "react";
import { EventSettings } from "../../../components/eventSetting";
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
		eventType.creator.email.indexOf("@")
	);

	const eventUrl = absoluteUrl(`/${username}/${eventType.id}`);
	const handleDelete = async () => {
		try {
			setLoading(true);
			setOpenDelete(true);
			const res = await deleteEvent(eventType.id);
			if (
				res &&
				res.error ===
					"Este tipo de evento tem reservas associadas e não pode ser excluído."
			) {
				toast.error(
					"Não é possível remover o evento, pois já foi realizado um agendamento."
				);
			} else {
				console.log(res);
				toast.success("Evento removido com sucesso!");
			}
		} catch (error) {
			console.error("Error deleting event:", error);
		} finally {
			setLoading(false);
			setOpenDelete(false);
		}
	};

	const handleEdit = () => {
		router.push(`/dashboard/update/${eventType.id}`);
	};

	const handleShare = () => {
		navigator.clipboard
			.writeText(eventUrl)
			.then(() => {
				toast.success("Link do evento copiado com sucesso.");
			})
			.catch((error) => {
				console.error(
					"Erro ao copiar link do evento para a área de transferência:",
					error
				);
			});
	};

	const handleToggleActive = async () => {
		try {
			setLoading(true);
			await toggleEventTypeActive(
				eventType.creatorId,
				eventType.id,
				!eventType.active
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
			className={`relative max-w-sm w-full md:break-inside-avoid overflow-hidden border drop-shadow-md hover:drop-shadow-xl
		${
			eventType.active
				? "border-t-4  border-t-primary"
				: "border-t-4  border-t-muted-foreground opacity-80"
		}`}
		>
			<CardHeader className="flex p-3 md:p-6 flex-row items- justify-between ">
				<div className="flex gap-1 w-full flex-col">
					<CardTitle className="text-balance text-base capitalize mr-2">
						{eventType.name}
					</CardTitle>
					<CardDescription className="flex items-start flex-col gap-1 ">
						<h1 className="flex items-center gap-1">
							<Timer size={16} />
							{eventType.duration} Min{" "}
						</h1>
						<h1 className="flex items-center gap-1">
							{" "}
							<Users size={16} />
							{eventType.capacity}
						</h1>
					</CardDescription>
					<CardDescription>{eventType.description}</CardDescription>
					<Link href={eventUrl} className="text-sm pt-1 text-blue-600">
						Ver página de reserva
					</Link>
				</div>
				<EventSettings
					onDelete={() => setOpenDelete(true)}
					onEdit={handleEdit}
					onToggleActive={handleToggleActive}
					isActive={eventType.active}
				/>
			</CardHeader>

			<Separator />
			<CardContent className="flex gap-2 p-2 items-center justify-center">
				<div className="w-full flex justify-end">
					<Button
						onClick={handleShare}
						variant="link"
						size="sm"
						className="flex items-center gap-1"
					>
						<Copy size={16} />
						Copiar
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
