"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const LoginSchema = z.object({
		email: z.string().email(),
		password: z.string().min(8, { message: "mínimo 8 caracteres" }), // Mínimo 8 caracteres para a senha
	});

	type FormValues = z.infer<typeof LoginSchema>;
	const form = useForm<FormValues>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleGoogleClick = async () => {
		await signIn("google", {
			callbackUrl: "/dashboard",
		});
	};

	const handleGithubClick = async () => {
		await signIn("github", {
			callbackUrl: "/dashboard",
		});
	};

	async function onSubmit(data: z.infer<typeof LoginSchema>) {
		setIsLoading(true);
		const res = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: true,
			callbackUrl: "/dashboard",
		});
		console.log("loginres", res);
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
						/>
						<Label className="" htmlFor="password">
							Senha
						</Label>
						<Input
							id="password"
							placeholder="name@example.com"
							type="password"
							autoCapitalize="none"
							autoComplete="password"
							autoCorrect="off"
							disabled={isLoading}
						/>
					</div>
					<Button disabled={isLoading}>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Sign In with Email
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Ou continue com
					</span>
				</div>
			</div>
			<div className="flex gap-2 w-full">
				<Button
					onClick={handleGoogleClick}
					className="w-full"
					variant="outline"
					type="button"
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<FcGoogle className="mr-2 h-4 w-4" />
					)}
					Google
				</Button>
				{/* <Button
					onClick={handleGithubClick}
					className="w-full"
					variant="default"
					type="button"
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<FaGithub className="mr-2 h-4 w-4" />
					)}
					Github
				</Button> */}
			</div>
		</div>
	);
}
