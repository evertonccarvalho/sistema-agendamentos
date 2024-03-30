import Link from "next/link";
import { LoginForm } from "./login-form";
import { Social } from "../_components/social";
import Image from "next/image";

export default function LoginPage() {
	return (
		<div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-gradient-to-b to-gray-500/30 from-black/10">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
				<div className="absolute inset-0 bg-accent bg-gradient-to-tl to-primary/30 from-secondary" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<Image
						alt="logo"
						width={100}
						height={100}
						src="/logo.png"
						className=""
					/>
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<div className="flex w-full justify-center">
							<Image
								alt="logo"
								width={1000}
								height={1000}
								src="/login-img.png"
								className="w-80"
							/>
						</div>
						<h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
							<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
								Estamos anciosos
							</span>{" "}
							por sua presença!
						</h1>
						<p className="text-base font-normal text-gray-500 lg:text-lg dark:text-gray-400">
							Seus agendamentos estão á um clique de distância. Faça login e
							aproveite, não perca mais tempo. Dá um agendaê!
						</p>
					</blockquote>
				</div>
			</div>
			<div className="p-4 lg:p-8 h-full flex items-center ">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Login</h1>
						<p className="text-sm text-muted-foreground">
							Digite seu e-mail abaixo para fazer login na sua conta
						</p>
					</div>
					<LoginForm />
					<Social />

					<p className="px-8 text-center text-sm text-muted-foreground">
						Não tem uma conta?{" "}
						<Link
							href="/auth/register"
							className="underline underline-offset-4 hover:text-primary"
						>
							Criar conta
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
