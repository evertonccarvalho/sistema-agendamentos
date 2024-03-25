"use client";
import HeaderDashboard from "@/components/HeaderDashboard";
import MainSideBar from "@/components/Sidebar";
import { useState } from "react";

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: SettingsLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<div className="flex flex-col h-screen">
				<div className="flex flex-1 h-full overflow-hidden">
					<MainSideBar
						sidebarOpen={sidebarOpen}
						setSidebarOpen={setSidebarOpen}
					/>

					<div className="w-full p-2 rounded-sm  container mt-[80px] mb-2 overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-primary">
						<HeaderDashboard

						/>
						{children}
					</div>
				</div>
			</div>
		</>
	);
}
