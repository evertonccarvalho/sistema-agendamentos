import Link from "next/link";
import { UserAuthForm } from "./user-auth-form";

export default function LoginPage() {
	return (
		<div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					Logo
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id,
							recusandae?
						</p>
						<footer className="text-sm">Éverton Carvalho</footer>
					</blockquote>
				</div>
			</div>
			<div className="p-4 lg:p-8 h-full flex items-center">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Login</h1>
						<p className="text-sm text-muted-foreground">
							Digite seu e-mail abaixo para fazer login na sua conta
						</p>
					</div>
					<UserAuthForm />
					<p className="px-8 text-center text-sm text-muted-foreground">
						Não tem uma conta?{" "}
						<Link
							href="/register"
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
