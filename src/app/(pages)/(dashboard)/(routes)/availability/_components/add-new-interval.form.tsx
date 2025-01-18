import { createAvailabilityInterval } from '@/actions/availability/availabilityInterval/create';
import { AvailabilityModel } from '@/actions/availability/getAvailabilitys';
import { GenericForm } from '@/components/form/form';
import { InputForm } from '@/components/form/InputForm';
import { Modal } from '@/components/modal';
import { Button } from '@/components/ui/button';
import { convertTimeStringToNumber } from '@/utils/convertTimeStringToNumber';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
	NewTimeIntervalDto,
	newTimeIntervalSchema,
} from '../schemas/new-time-interval.schema';

interface AddNewIntervalFormProps {
	day: Pick<AvailabilityModel, 'weekDay'>;
}

const AddNewIntervalForm = ({ day }: AddNewIntervalFormProps) => {
	const [openModal, setOpenModal] = useState(false);
	const defaultValues: NewTimeIntervalDto = {
		weekDay: day.weekDay,
		startTime: '08:00',
		endTime: '12:00',
	};

	const form = useForm<NewTimeIntervalDto>({
		resolver: zodResolver(newTimeIntervalSchema),
		defaultValues,
	});

	const onSubmit = async (data: NewTimeIntervalDto) => {
		const parsedData = newTimeIntervalSchema.parse(data);

		try {
			const res = await createAvailabilityInterval({
				weekDay: parsedData.weekDay,
				startTime: convertTimeStringToNumber(parsedData.startTime),
				endTime: convertTimeStringToNumber(parsedData.endTime),
			});

			// Verifica o sucesso da resposta
			if (res?.success) {
				toast.success('Intervalo adicionado com sucesso!');
			} else {
				// Exibe mensagem de erro para o usuário
				toast.error(res?.message || 'Erro ao criar novo intervalo.');
				console.error(`Erro ao criar novo intervalo: ${res?.message}`);
			}
		} catch (error) {
			// Trata erros não previstos
			toast.error('Erro inesperado ao adicionar novo intervalo.');
			console.error('Erro ao adicionar novo intervalo:', error);
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
					action={'Salvar'}
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
