"use client";
import Link from "next/link";
import { LogIn, LogInIcon, UserCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { useSession } from "next-auth/react";

export const Hero = () => {
	const { data } = useSession();
	return (
		<section className="container h-full min-h-dvh  flex-col md:flex-row place-items-center justify-center flex py-20 md:py-24 gap-10">
			<div className="text-center w-full h-full md:pb-40  lg:text-start space-y-6">
				{data?.user ? (
					<main className="text-4xl md:text-6xl font-bold">
						<h1 className="inline ">
							<span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
								Bem-vindo
							</span>{" "}
							de
						</h1>{" "}

						<h2 className="inline ">
							<span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
								volta
							</span>{" "}
							{data.user.name}
						</h2>
					</main>
				) : (
					<main className="text-4xl md:text-6xl font-bold">
						<h1 className="inline ">
							<span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
								Agendamento
							</span>{" "}
							fácil
						</h1>{" "}
						e{" "}
						<h2 className="inline ">
							<span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
								rápido
							</span>{" "}
							para você.
						</h2>
					</main>
				)}

				<p className="text-base md:text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
					Compartilhe sua agenda com seus amigos e permita que vejam seus tempos
					livres para possiveis compromissos.
				</p>

				<div className="space-y-4 md:space-y-0 md:space-x-4">
					{data?.user ? (
						<Link href="/dashboard" className={`border w-1/2 ${buttonVariants({ variant: "default" })}`}>
							<LogIn className="mr-2 w-5 h-5" />
							Minha Conta
						</Link>
					) : (
						<>
							<Link
								href="/auth/register"
								className={`w-full md:w-1/3 text-white/80 ${buttonVariants({
									variant: "default",
								})}`}
							>
								Criar Conta
								<UserCheck className="ml-2 w-5 h-5" />
							</Link>
							<Link
								href="/auth/login"
								className={`w-full md:w-1/3 ${buttonVariants({
									variant: "outline",
								})}`}
							>
								Entrar
								<LogInIcon className="ml-2 w-5 h-5" />
							</Link>
						</>
					)}
				</div>
			</div>
			<div className="z-10 ">
				<HeroCards />
			</div>
			<div className="shadow" />
		</section>
	)
};
