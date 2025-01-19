import { getConfirmedBookings } from "@/actions/scheduling/getConfirmedBookings";
import { getFinishedBookings } from "@/actions/scheduling/getFinishedBookings";
import BreadCrumb from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { auth } from "../../../../../lib/auth";
import TabsComponent from "./components/tabsBookingItems";

const ScheduledEvents = async () => {
  const breadcrumbItems = [{ title: "Agendamentos", link: "/dashboard" }];
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return redirect("/");
  }

  const confirmedBookings = await getConfirmedBookings(session.user.id);
  const finishedBookings = await getFinishedBookings(session.user.id);

  return (
    <main className="flex-1 space-y-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <Card className="drop-shadow-lg bg-muted/50 border rounded-md md:p-6 rou p-2">
        <TabsComponent
          confirmedBookings={confirmedBookings}
          finishedBookings={finishedBookings}
        />
      </Card>
    </main>
  );
};

export default ScheduledEvents;
