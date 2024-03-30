import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { maskPhone } from "../../../../utils/masks";

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;

const guestStoreSchema = z.object({
	name: z
		.string()
		.min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
	email: z
		.string()
		.email({ message: "Insira um endereço de e-mail válido" })
		.refine((value) => emailRegex.test(value), {
			message: "Insira um endereço de e-mail válido",
		}),
	phone: z
		.string()
		.min(8, { message: "O telefone deve ter no mínimo 8 dígitos" })
		.refine((value) => phoneRegex.test(value), {
			message: "Insira um número de telefone válido",
		}),
	message: z
		.string()
		.min(10, { message: "A mensagem deve ter no mínimo 10 caracteres" }),
});

export type GuestFormValues = z.infer<typeof guestStoreSchema>;

interface GuestFormProps {
	onClose: () => void;
	onSubmit: (data: GuestFormValues) => void;
}

export const GuestForm: React.FC<GuestFormProps> = ({ onClose, onSubmit }) => {
	const [loading, setLoading] = useState(false);

	const form = useForm<GuestFormValues>({
		resolver: zodResolver(guestStoreSchema),
	});

	const handleFormSubmit = async (data: GuestFormValues) => {
		setLoading(true);

		try {
			await onSubmit(data);
			onClose();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className="space-y-8 mx-auto items-center justify-center"
			>
				<div className="flex gap-2 flex-col">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<label>Nome</label>
								<FormControl>
									<Input placeholder="Nome" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<label>Email</label>
								<FormControl>
									<Input placeholder="E-mail" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<label>Telefone</label>
								<FormControl>
									<Input
										placeholder="Telefone"
										{...field}
										onChange={(e) => field.onChange(maskPhone(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<label>Mensagem</label>
								<FormControl>
									<Textarea placeholder="Mensagem" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex gap-5">
					<Button type="submit" className="text-white" disabled={loading}>
						{loading && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
						)}
						Confirmar
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={() => onClose()}
						disabled={loading}
					>
						Cancelar
					</Button>
				</div>
			</form>
		</Form>
	);
};
