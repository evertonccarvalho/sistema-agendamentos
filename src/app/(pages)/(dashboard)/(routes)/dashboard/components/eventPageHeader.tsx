"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";
import { Copy, Link2Icon, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const EventPageHeader = () => {
	const { data } = useSession();

	if (!data?.user) {
		return null;
	}

	const username = data.user.email?.substring(0, data.user.email.indexOf("@"));
	const eventUrl = absoluteUrl(`/${username}`);

	const handleShare = () => {
		navigator.clipboard
			.writeText(eventUrl)
			.then(() => {
				toast.success("URL copiada com sucesso");
			})
			.catch((error) => {
				console.error("Erro ao copiar a URL:", error);
			});
	};

	return (
		<>
			<section className="flex w-full justify-between">
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
					<div className="flex flex-col justify-start w-full gap-1">
						<h1 className=" capitalize text-base font-semibold ">{data.user.name}</h1>
						<div className="flex justify-start md:justify-between   items-center">
							<div className="flex items-center justify-start">
								<Link
									className=" text-sm text-primary underline-offset-4 hover:underline items-center flex gap-1"
									href={eventUrl}
								>
									<Link2Icon size={18} />{" "}
									<p className="sr-only  md:not-sr-only">
										<span className="truncate">{eventUrl} </span>
									</p>
								</Link>
								<Button
									onClick={handleShare}
									variant="link"
									size="sm"
									className="flex items-center gap-1"
								>
									<Copy size={16} />
									<p className="sr-only">Copiar</p>

								</Button>
							</div>
							<Link
								href="/dashboard/new"
								className=" text-sm text-primary  underline-offset-4 hover:underline items-center flex gap-1"

							>
								<Plus size={18} />{" "}
								<p className="sr-only  md:not-sr-only">
									<span className="truncate">Criar Evento</span>
								</p>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default EventPageHeader;
