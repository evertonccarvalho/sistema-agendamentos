// "use client";
// import {
// 	CalendarDays,
// 	ChevronsLeftIcon,
// 	DoorOpen,
// 	HomeIcon,
// } from "lucide-react";
// import Link from "next/link";
// import React, { useState } from "react";
// import Logos from "../logo";
// import CreateButton from "../createButton";

// const menus = [
// 	{ name: "Inicio", link: "/dashboard", icon: HomeIcon },
// 	{ name: "Eventos Agendados", link: "/scheduledevents ", icon: CalendarDays },
// 	{
// 		name: "Disponibilidade",
// 		link: "/availability ",
// 		icon: CalendarDays,
// 		margin: true,
// 	},
// ];

// const DashboardSideBar = () => {
// 	const [open, setOpen] = useState(true);
// 	const [keepSidebarOpen, setKeepSidebarOpen] = useState(false);

// 	const handleMouseEnter = () => {
// 		if (!keepSidebarOpen) {
// 			setOpen(true);
// 		}
// 	};

// 	const handleMouseLeave = () => {
// 		if (!keepSidebarOpen) {
// 			setOpen(false);
// 		}
// 	};

// 	const handleClick = () => {
// 		setKeepSidebarOpen(!keepSidebarOpen);
// 	};

// 	return (
// 		<div
// 			className={` py-2 pl-2 z-50   min-h-dvh bg-card border border-zinc-700 h-full   text-primary px-4 ${open ? "w-72" : "w-16 flex flex-col items-center"
// 				} `}
// 			onMouseEnter={handleMouseEnter}
// 			onMouseLeave={handleMouseLeave}
// 		>
// 			<div className="flex py-4  justify-between items-center">
// 				<Logos isOpen={open} />
// 				{open && (
// 					<div className="flex justify-end">
// 						{keepSidebarOpen ? (
// 							<ChevronsLeftIcon
// 								size={26}
// 								className="cursor-pointer"
// 								onClick={handleClick}
// 							/>
// 						) : (
// 							<DoorOpen
// 								size={26}
// 								className="cursor-pointer"
// 								onClick={handleClick}
// 							/>
// 						)}
// 					</div>
// 				)}
// 			</div>

// 			<CreateButton isOpen={open} />

// 			<div
// 				className={`mt-3 flex flex-col gap-1 relative ${!open && "flex items-center justify-center"
// 					}`}
// 			>
// 				{menus?.map((menu) => (
// 					<Link
// 						href={menu?.link}
// 						key={menu.link}
// 						className="group flex items-center text-sm gap-3 font-medium p-2 hover:bg-card-foreground hover:text-secondary rounded-md"
// 					>
// 						<div>{React.createElement(menu?.icon, { size: "16" })}</div>
// 						<h2
// 							className={`whitespace-pre duration-500 ${!open && "opacity-0 hidden translate-x-28 overflow-hidden"
// 								}`}
// 						>
// 							{menu?.name}
// 						</h2>
// 						<h2
// 							className={`${open && "hidden"
// 								} absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-card px-0 py-0 font-semibold text-primary drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1   `}
// 						>
// 							{menu?.name}
// 						</h2>
// 					</Link>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default DashboardSideBar;
