import DashboardSideBar from "@/components/DashboardSideBar";
import HeaderDashboard from "@/components/HeaderDashboard";

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: SettingsLayoutProps) {
	return (
		<>
			<div className="flex flex-col h-screen">
				<div className="flex flex-1 h-full overflow-hidden">
					<DashboardSideBar />
					<div className="w-full p-2  rounded-sm bg-muted-foreground/5 container  mt-[80px] mb-2 ">
						<HeaderDashboard />
						{children}
					</div>
				</div>
			</div>
		</>
	);
}
