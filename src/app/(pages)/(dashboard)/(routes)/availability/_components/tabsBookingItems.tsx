"use client";
import { AvailabilityModel } from "@/actions/availability/getAvailabilitys";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvailabilityForm from "./AvailabilityForm";

interface TabsAvailabilityComponentProps {
	availability: AvailabilityModel[];
}
const TabsAvailabilityComponent = ({
	availability,
}: TabsAvailabilityComponentProps) => {
	return (
		<Tabs defaultValue="listView" className="w-full space-y-2">
			<TabsList className="bg-secondary">
				<TabsTrigger value="listView">Lista</TabsTrigger>
				<TabsTrigger value="calendarView" disabled>
					Calendário
				</TabsTrigger>
			</TabsList>
			<TabsContent value="listView">
				<Card className="drop-shadow-lg bg-muted/50 border md:p-6 rou p-2">
					<Separator className="my-4" />
					<AvailabilityForm availability={availability} />
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default TabsAvailabilityComponent;
