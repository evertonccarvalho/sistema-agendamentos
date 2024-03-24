"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduledEventItem from "./ScheduledEventItem";
import type { IScheduling } from "../interface/interface";
import Image from "next/image";

interface TabsComponentProps {
  confirmedBookings: IScheduling[]
  finishedBookings: IScheduling[]
}
const TabsComponent = ({ confirmedBookings, finishedBookings }: TabsComponentProps) => {
  return (
    <Tabs defaultValue="confirmedBookings" className="w-full space-y-2">
      <TabsList className='bg-secondary'>
        <TabsTrigger value="confirmedBookings">Proximos</TabsTrigger>
        <TabsTrigger value="finishedBookings">Anteriores</TabsTrigger>
      </TabsList>
      <TabsContent value="confirmedBookings">
        {confirmedBookings && confirmedBookings.length > 0 ? (
          confirmedBookings.map((item: IScheduling) => (
            <ScheduledEventItem key={item.id} scheduling={item} />
          ))
        ) : (
          <div className=" py-14 flex items-center flex-col justify-center">
            <Image
              src='/Zero_Events.svg'
              alt="zeroEvents"
              width={100}
              height={100}
            />
            <h1 className="font-semibold text-lg">
              Sem eventos futuros
            </h1>
          </div>
        )}
      </TabsContent>
      <TabsContent value="finishedBookings">
        {finishedBookings && finishedBookings.length > 0 ? (
          finishedBookings.map((item: IScheduling) => (
            <ScheduledEventItem key={item.id} scheduling={item} />
          ))
        ) : (
          <div className=" py-14 flex items-center flex-col justify-center">
            <Image
              src='/Zero_Events.svg'
              alt="zeroEvents"
              width={100}
              height={100}
            />
            <h1 className="font-semibold text-lg">
              Sem eventos anteriores
            </h1>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
