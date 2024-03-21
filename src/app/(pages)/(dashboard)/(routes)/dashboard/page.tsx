"use client"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CardEventTypes } from "../../components/CardEventTypes";
import BreadCrumb from "@/components/breadcrumb";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Dashboard() {
	const { data } = useSession();

	if (!data?.user) {
		return null;
	}
	console.log(data.user)
	const breadcrumbItems = [{ title: "Tipos de Evento", link: "/dashboard" }];
	const baseUrl = process.env.NEXT_PUBLIC_BASEURL
	console.log(process.env)
	const username = data.user.email?.substring(0, data.user.email.indexOf("@"));
	return (
		<main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />

			<section className="flex w-full">
				<div className="flex w-full gap-3 items-center">
					<Avatar className="h-10 w-10 ">
						<AvatarImage
							src={data.user.image ?? ""}
							alt={data.user.name ?? ""}
						/>
						<AvatarFallback className="uppercase">
							{data.user?.name ? data.user.name[0] : ""}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<h1 className="text-base font-semibold ">{data.user.name}</h1>
						<Link className="text-base font-light text-blue-500 hover:underline"
							href={`${baseUrl}/${username}`}>
							{`${baseUrl}/${username}`}
						</Link>
					</div>
				</div>
				<Button className="text-white flex items-center gap-1">
					Adicionar
					<Plus size={18} />
				</Button>
			</section>

			<section className="flex flex-wrap w-full gap-5 items-center justify-start">
				<CardEventTypes />
				<CardEventTypes />
				<CardEventTypes />
				<CardEventTypes />
				<CardEventTypes />
				<CardEventTypes />
			</section>
		</main>
	);
}
