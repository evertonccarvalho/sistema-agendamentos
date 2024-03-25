import BreadCrumb from "@/components/breadcrumb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getBookings } from "@/actions/scheduling/getBookings";
import { getFinishedBookings } from "@/actions/scheduling/getFinishedBookings";
import { Card } from "@/components/ui/card";
import TabsAvailabilityComponent from "./_components/tabsBookingItems";

const AvailabilityPage = async () => {
	const breadcrumbItems = [{ title: "Disponibilidade", link: "/dashboard" }];
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return redirect("/");
	}

	const confirmedBookings = await getBookings(session.user.id);
	const finishedBookings = await getFinishedBookings(session.user.id);

	console.log(confirmedBookings);
	console.log(finishedBookings);

	return (
		<main className="flex-1 space-y-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<Card className="drop-shadow-lg bg-muted/50 border rounded-md md:p-6 rou p-2">
				<TabsAvailabilityComponent confirmedBookings={confirmedBookings} />
			</Card>
		</main>
	);
};

export default AvailabilityPage;
