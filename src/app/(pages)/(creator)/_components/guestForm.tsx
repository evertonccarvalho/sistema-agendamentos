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
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const guestStoreSchema = z.object({
	name: z.string().min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
	email: z.string().email({ message: "Insira um endereço de e-mail válido" }),
	phone: z.string().min(8, { message: "O telefone deve ter no mínimo 8 dígitos" }),
	message: z.string().min(10, { message: "A mensagem deve ter no mínimo 10 caracteres" }),
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
								<FormLabel>Nome</FormLabel>
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
								<FormLabel>Email</FormLabel>
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
								<FormLabel>Telefone</FormLabel>
								<FormControl>
									<Input placeholder="Telefone" {...field} />
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
								<FormLabel>Mensagem</FormLabel>
								<FormControl>
									<Input placeholder="Mensagem" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex gap-2">
					<Button type="button" variant="outline" onClick={() => onClose()} disabled={loading}>
						{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Cancelar
					</Button>
					<Button type="submit" disabled={loading}>
						{loading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
						Confirmar
					</Button>
				</div>
			</form>
		</Form>
	);
};
