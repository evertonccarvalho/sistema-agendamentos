import { getAvailabilitys } from "@/actions/availability/getAvailabilitys";
import BreadCrumb from "@/components/breadcrumb";
import CustomTabs from "@/components/CustomTabs";
import { Card } from "@/components/ui/card";
import { getWeekDays } from "@/utils/getWeekDay";
import { redirect } from "next/navigation";
import { auth } from "../../../../../lib/auth";
import DayForm from "./_components/day-form";

const AvailabilityPage = async () => {
	const breadcrumbItems = [{ title: "Disponibilidade", link: "/dashboard" }];
	const session = await auth();

	if (!session?.user) {
		return redirect("/");
	}

	const availability = await getAvailabilitys(session.user.id || "");
	const weekDays = getWeekDays();

	return (
		<>
			<BreadCrumb items={breadcrumbItems} />
			<Card className="drop-shadow-lg bg-muted/50 border rounded-md md:p-6 rou p-2">
				<CustomTabs
					tabs={[
						{
							label: "Disponibilidade",
							content: (
								<Card className="drop-shadow-lg bg-muted/50 border md:p-6 rou p-2">
									{availability.map((day) => (
										<DayForm
											key={day.id}
											day={day}
											weekDayLabel={weekDays[day.weekDay]}
										/>
									))}
								</Card>
							),
						},
					]}
				/>
			</Card>
		</>
	);
};

export default AvailabilityPage;
