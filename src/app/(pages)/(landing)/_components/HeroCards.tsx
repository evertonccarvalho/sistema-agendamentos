import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import PricingCard from "./PricingCard";
import { pricingList, teamList, testimonialsList } from "../../../../lib/const";
import TeamCard from "./TeamCard";
import TestimonialCard from "./TestimonialsCard";
import { CalendarIcon } from "lucide-react";

export const HeroCards = () => {
	return (
		<div className="hidden lg:flex flex-row flex-wrap  relative w-[650px] h-[500px]">
			{/* Testimonial */}
			<div className="absolute w-[340px] -top-[35px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
				<TestimonialCard testmonial={testimonialsList[0]} />
			</div>
			{/* Team */}
			<div className="absolute right-[10px] top-4 w-72 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
				<TeamCard team={teamList[0]} />
			</div>
			{/* Pricing */}
			<div className="absolute top-[140px] left-[15px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
				<PricingCard pricing={pricingList[0]} />
			</div>
			{/* Service */}
			<Card className="absolute w-[340px] -right-[5px] bottom-[-10px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
				<CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
					<div className="mt-1 bg-primary/20 p-4 rounded-full">
						<CalendarIcon className="text-primary" />
					</div>
					<div className="">
						<CardTitle className="text-lg">Agendamentos flexíveis</CardTitle>
						<CardDescription className="text-md mt-2">
							Personalize seus agendamentos de acordo com suas necessidades,
						</CardDescription>
					</div>
				</CardHeader>
			</Card>
		</div>
	);
};
