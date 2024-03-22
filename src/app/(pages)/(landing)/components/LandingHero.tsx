"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const LandingHero = () => {
	return (
		<main
			className=" md:container flex md:flex-row flex-col w-full h-full items-center md:justify-around justify-center "
			style={{ gap: "50px", padding: "3rem" }}
		>
			<section className="flex items-center md:items-start flex-col gap-3  md:w-[30rem] p-2">
				<div className="    w-3/4 md:w-full object-cover object-center flex justify-center items-center">
					<Image
						src="/logoMelhor.png"
						alt="contentImage"
						width={100}
						height={100}
						className=" w-full h-full "
					/>
				</div>
				<h1 className="text-base text-center md:text-start ">
					Compartilhe sua agenda com seus amigos e permita que vejam seus tempos
					livres para possiveis compromissos.
				</h1>
				<div className="flex items-center gap-5 md:w-2/3 gap-2 justify-center md:justify-between ">
					<Link href={"/register"}>
						<Button size={"lg"} className="text-white" variant="default">
							Criar Conta
						</Button>
					</Link>
					<Link href={"/login"}>
						<Button size={"lg"} variant="outline">
							Logar
						</Button>
					</Link>
				</div>
			</section>
			<section className="">
				<Image src="/content.png" alt="contentImage" width={300} height={100} />
			</section>
		</main>
	);
};
