import { createAvailabilityInterval } from "@/actions/availability/availabilityInterval/create";
import { GenericForm } from "@/components/form/form";
import { InputForm } from "@/components/form/InputForm";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { convertTimeStringToNumber } from "@/utils/convertTimeStringToNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addIntervalSchema = z
	.object({
		availabilityId: z.string(),
		startTime: z.string(),
		endTime: z.string(),
	})
	.refine((data) => data.startTime < data.endTime, {
		message: "A hora de início deve ser menor que a hora de término.",
		path: ["endTime"],
	});

export type AddIntervalSchemaDto = z.infer<typeof addIntervalSchema>;

interface AddNewIntervalFormProps {
	availabilityId: string;
}

const AddNewIntervalForm = ({ availabilityId }: AddNewIntervalFormProps) => {
	const [openModal, setOpenModal] = useState(false);

	console.log(availabilityId);
	const defaultValues: AddIntervalSchemaDto = {
		availabilityId,
		startTime: "08:00",
		endTime: "12:00",
	};

	const form = useForm({
		resolver: zodResolver(addIntervalSchema),
		values: defaultValues,
	});

	const onSubmit = async (data: AddIntervalSchemaDto) => {
		const parsedData = addIntervalSchema.parse(data);

		try {
			const res = await createAvailabilityInterval({
				availabilityId: parsedData.availabilityId,
				startTime: convertTimeStringToNumber(parsedData.startTime),
				endTime: convertTimeStringToNumber(parsedData.endTime),
			});

			// Verifica o sucesso da resposta
			if (res?.success) {
				toast.success("Intervalo adicionado com sucesso!");
			} else {
				// Exibe mensagem de erro para o usuário
				toast.error(res?.message || "Erro ao criar novo intervalo.");
				console.error(`Erro ao criar novo intervalo: ${res?.message}`);
			}
		} catch (error) {
			// Trata erros não previstos
			toast.error("Erro inesperado ao adicionar novo intervalo.");
			console.error("Erro ao adicionar novo intervalo:", error);
		}
	};

	return (
		<>
			<div className="flex justify-end gap-2">
				<Button
					className="text-xs md:text-base"
					size="icon"
					type="button"
					variant="ghost"
					onClick={() => setOpenModal(true)}
				>
					<Plus size={18} />
				</Button>
			</div>
			<Modal
				title="Adicionar novo intervalo"
				description="Adicione um novo intervalo de disponibilidade."
				isOpen={openModal}
				onClose={() => setOpenModal(false)}
			>
				<GenericForm
					form={form}
					action={"Salvar"}
					onSubmit={onSubmit}
					loading={false}
				>
					<InputForm
						form={form}
						name="startTime"
						label="Hora de início"
						type="time"
					/>
					<InputForm
						form={form}
						name="endTime"
						label="Hora de término"
						type="time"
					/>
				</GenericForm>
			</Modal>
		</>
	);
};

export default AddNewIntervalForm;
