"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const LandingHero = () => {
	return (
		<main className="flex w-full h-full items-center justify-around ">
			<section className="flex flex-col gap-3 w-[30rem] p-2">
				<Image src="/logo.png" alt="contentImage" width={500} height={100} />
				<h1 className="text-base">Compartilhe sua agenda com seus amigos e permita que vejam seus tempos livres para possiveis compromissos.</h1>
				<div className="flex items-center w-2/3 gap-2 justify-between">
					<Link href={"/register"}>
						<Button size={"lg"} className="text-white" variant="default">Criar Conta</Button>
					</Link>
					<Link href={"/login"}>
						<Button size={"lg"} variant="outline">Logar</Button>
					</Link>
				</div>
			</section>
			<section>
				<Image src="/content.png" alt="contentImage" width={300} height={100}/>
			</section>
		</main>
	);
};
