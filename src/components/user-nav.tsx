"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function UserNav() {
	const { data } = useSession();

	if (!data?.user) {
		return null;
	}

	return (
		<div className="flex gap-2">
			<DropdownMenu >

				<DropdownMenuTrigger asChild className="flex w-full">
					<div className=" flex  h-8 w-8 cursor-pointer rounded-full">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={data.user.image ?? ""}
								alt={data.user.name ?? ""}
							/>
							<AvatarFallback className="uppercase">
								{data.user?.name ? data.user.name[0] : ""}
							</AvatarFallback>
						</Avatar>
						<ChevronDownIcon size={18} />
					</div>
				</DropdownMenuTrigger>
				<div>
					<div className=" hidden md:flex text-start flex-col">
						<h3 className="text-xs font-semibold">{data.user.name}</h3>
						<p className="text-xs ">{data.user.email}</p>
					</div>
				</div>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">{data.user.name}</p>
							<p className="text-xs leading-none text-muted-foreground">
								{data.user.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<Link href="/profile">
							<DropdownMenuItem>
								Profile
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</DropdownMenuItem>
						</Link>

						<DropdownMenuItem>
							Settings
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>New Team</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
						Log out
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
