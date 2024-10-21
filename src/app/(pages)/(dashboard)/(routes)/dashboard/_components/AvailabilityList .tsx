"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import dayjs from "dayjs";
import type React from "react";
import { useEffect, useState } from "react";

interface Availability {
	possibleTimes: string[];
	availableTimes: string[];
}
interface AvailabilityListProps {
	isDateSelected: boolean;
	selectedDate: Date | null | undefined;
	availability: Availability | undefined;
	handleSelectTime: (hour: string) => void;
}

const AvailabilityList: React.FC<AvailabilityListProps> = ({
	isDateSelected,
	selectedDate,
	availability,
	handleSelectTime,
}) => {
	const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
		"vertical"
	);

	const determineOrientation = () => {
		if (window.innerWidth >= 767 && window.innerHeight < window.innerWidth) {
			setOrientation("vertical");
		} else {
			setOrientation("horizontal");
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		determineOrientation();
		window.addEventListener("resize", determineOrientation);
		return () => {
			window.removeEventListener("resize", determineOrientation);
		};
	}, []);

	return (
		<>
			{isDateSelected &&
				availability &&
				availability.availableTimes &&
				availability.availableTimes.length > 0 && (
					<div className="max-h-[22rem] justify-center   flex flex-col gap-1 items-center">
						<h1 className="text-sm font-semibold capitalize truncate text-center md:py-4">
							{selectedDate
								? dayjs(selectedDate).locale("pt-br").format("dddd, D MMMM")
								: null}
						</h1>

						<ScrollArea className="w-full ">
							<div className="flex items-center pb-3 md:pb-0 md:pr-3  gap-2 flex-row md:flex-col h-full w-full ">
								{availability?.possibleTimes.map((hour) => {
									return (
										<Button
											key={hour}
											onClick={() => handleSelectTime(hour)}
											disabled={!availability.availableTimes?.includes(hour)}
											className="rounded-md w-full "
											size="sm"
										>
											{String(hour).padStart(2, "0")}:00h
										</Button>
									);
								})}
							</div>
							<ScrollBar orientation={orientation} />
						</ScrollArea>
					</div>
				)}
		</>
	);
};

export default AvailabilityList;
