"use client";
import {
	AtSignIcon,
	CalendarDays,
	ChevronsLeftIcon,
	DoorOpen,
	HomeIcon,
	Plus,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const menus = [
	{ name: "Inicio", link: "/dashboard", icon: HomeIcon },
	{ name: "Compromissos", link: "/appointments ", icon: CalendarDays },
	{ name: "Disponibilidade", link: "/availability ", icon: CalendarDays },
	{ name: "Agendas", link: "/event-types ", icon: CalendarDays },
];

const DashboardSideBar = () => {
	const [open, setOpen] = useState(true);
	const [keepSidebarOpen, setKeepSidebarOpen] = useState(false);

	const handleMouseEnter = () => {
		if (!keepSidebarOpen) {
			setOpen(true);
		}
	};

	const handleMouseLeave = () => {
		if (!keepSidebarOpen) {
			setOpen(false);
		}
	};

	const handleClick = () => {
		setKeepSidebarOpen(!keepSidebarOpen);
	};

	return (
		// <div className="p-2  h-dvh ">
		<aside
			className={`z-50 min-h-dvh rounded-md bg-card border border-gray-600/40 h-full  ${
				open ? "w-72" : "w-16 flex flex-col items-center"
			}
        } duration-500 text-primary px-4`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="flex py-4  justify-between items-center">
				<div
					className={`${
						!open && "w-8 justify-center"
					} h-8  group flex items-center text-sm text-secondary justify-start gap-0.5 font-medium  rounded-full`}
				>
					<div className="bg-blue-500 p-1.5   rounded-full">
						<AtSignIcon size={18} />
					</div>

					<h2
						className={`whitespace-pre  font-semibold text-lg duration-500 text-blue-500 ${
							!open && "opacity-0 hidden  translate-x-28 overflow-hidden"
						}`}
					>
						gendaÊ
					</h2>
				</div>

				{open && (
					<div className="flex justify-end">
						{keepSidebarOpen ? (
							<ChevronsLeftIcon
								size={26}
								className="cursor-pointer"
								onClick={handleClick}
							/>
						) : (
							<DoorOpen
								size={26}
								className="cursor-pointer"
								onClick={handleClick}
							/>
						)}
					</div>
				)}
			</div>

			<div className={`${!open && "flex  items-center justify-center"}`}>
				<button
					type="button"
					className={`${
						!open && "w-8"
					} w-full cursor-pointer group h-8 flex items-center text-sm text-secondary justify-center gap-3.5 font-medium p-2 rounded-full bg-card-foreground hover:text-secondary`}
					onClick={() => {}}
				>
					<div>
						<Plus size={16} />
					</div>
					<h2
						className={`whitespace-pre duration-500 ${
							!open && "opacity-0 hidden translate-x-28 overflow-hidden"
						}`}
					>
						Criar
					</h2>
				</button>
			</div>

			<div
				className={`mt-3 flex flex-col gap-1 relative ${
					!open && "flex items-center justify-center"
				}`}
			>
				{menus?.map((menu, i) => (
					<Link
						href={menu?.link}
						// biome-ignore lint/suspicious/noArrayIndexKey: this list is static
						key={i}
						className="group flex items-center text-sm gap-3 font-medium p-2 hover:bg-card-foreground hover:text-secondary rounded-md"
					>
						<div>{React.createElement(menu?.icon, { size: "16" })}</div>
						<h2
							className={`whitespace-pre duration-500 ${
								!open && "opacity-0 hidden translate-x-28 overflow-hidden"
							}`}
						>
							{menu?.name}
						</h2>
						<h2
							className={`${
								open && "hidden"
							} absolute left-48 bg-primary font-semibold whitespace-pre text-secondary rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:p-2 group-hover:left-12 group-hover:duration-300 group-hover:w-fit`}
						>
							{menu?.name}
						</h2>
					</Link>
				))}
			</div>
		</aside>
		// </div>
	);
};

export default DashboardSideBar;
