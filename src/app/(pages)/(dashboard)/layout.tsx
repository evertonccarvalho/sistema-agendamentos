import DashboardSideBar from "@/components/DashboardSideBar";
import HeaderDashboard from "@/components/HeaderDashboard";

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: SettingsLayoutProps) {
	return (
		<>
			<div className="flex flex-col h-screen">
				<div className=" absolute z-50 top-0 left-0">
					<DashboardSideBar />
				</div>
				<div className="flex flex-1 h-full flex-col overflow-hidden">
					<div className="sticky z-10 top-0 flex flex-col">
						<HeaderDashboard />
					</div>
					<div className="w-full max-w-screen-2xl  m-auto py-0 px-8 ">
						<main className="relative py-0 pr-0 pl-10">{children}</main>
					</div>
				</div>
			</div>
		</>
	);
}
