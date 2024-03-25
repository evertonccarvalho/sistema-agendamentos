"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IScheduling } from "../../scheduledevents/interface/interface";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AvailabilityForm } from "../../../components/AvailabilityForm";

interface TabsAvailabilityComponentProps {
  confirmedBookings: IScheduling[];
}
const TabsAvailabilityComponent = ({
  confirmedBookings,
}: TabsAvailabilityComponentProps) => {
  return (
    <Tabs defaultValue="listView" className="w-full space-y-2">
      <TabsList className="bg-secondary">
        <TabsTrigger value="listView">Lista</TabsTrigger>
        <TabsTrigger value="calendarView" disabled>
          Calendario
        </TabsTrigger>
      </TabsList>
      <TabsContent value="listView">
        <Card className="drop-shadow-lg bg-muted/50 border md:p-6 rou p-2">
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <AvailabilityForm />
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsAvailabilityComponent;
