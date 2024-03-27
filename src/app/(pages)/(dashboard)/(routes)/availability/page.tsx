import BreadCrumb from "@/components/breadcrumb";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getAvailabilitys } from "@/actions/availability/getAvailabilitys";
import TabsAvailabilityComponent from "./_components/tabsBookingItems";
import { auth } from "../../../../../../auth";

const AvailabilityPage = async () => {
	const breadcrumbItems = [{ title: "Disponibilidade", link: "/dashboard" }];
	const session = await auth();

	if (!session?.user) {
		return redirect("/");
	}

	const availability = await getAvailabilitys("clu4iswxk0000k6j18161c2cs");
	console.log(availability);

	return (
		<main className="flex-1 space-y-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<Card className="drop-shadow-lg bg-muted/50 border rounded-md md:p-6 rou p-2">
				<TabsAvailabilityComponent availability={availability} />
			</Card>
		</main>
	);
};

export default AvailabilityPage;
