import type React from "react";
import dayjs from "dayjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface AvailabilityListProps {
  isDateSelected: boolean;
  selectedDate: Date | null | undefined;
  availability:
  | {
    availableTimes: number[] | undefined;
    possibleTimes: number[];
  }
  | null
  | undefined;
  handleSelectTime: (hour: number) => void;
}

const AvailabilityList: React.FC<AvailabilityListProps> = ({
  isDateSelected,
  selectedDate,
  availability,
  handleSelectTime,
}) => {
  return (
    <>
      {isDateSelected && availability && availability?.availableTimes?.length && (
        <div className="max-h-[23rem] w-64 p-2 flex flex-col gap-2 items-center">
          <h1 className="text-sm font-semibold capitalize truncate text-center mx-2 md:py-4">
            {selectedDate
              ? dayjs(selectedDate).locale("pt-br").format("dddd, D MMMM")
              : null}
          </h1>
          <ScrollArea className="h-[23rem] w-52 p-4">
            {availability?.possibleTimes.map((hour) => {
              return (
                <Button
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availableTimes?.includes(hour)}
                  className="rounded-md py-1 w-full mb-2"
                  size="sm"
                >
                  {String(hour).padStart(2, "0")}:00h
                </Button>
              );
            })}
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default AvailabilityList;
