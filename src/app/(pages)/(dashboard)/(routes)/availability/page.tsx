import { getAvailabilitys } from "@/actions/availability/getAvailabilitys";
import BreadCrumb from "@/components/breadcrumb";
import CustomTabs from "@/components/CustomTabs";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { auth } from "../../../../../lib/auth";
import AvailabilityForm from "./_components/AvailabilityForm";

const AvailabilityPage = async () => {
	const breadcrumbItems = [{ title: "Disponibilidade", link: "/dashboard" }];
	const session = await auth();

	if (!session?.user) {
		return redirect("/");
	}

	const availability = await getAvailabilitys(session.user.id || "");

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
									<AvailabilityForm availability={availability} />
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
