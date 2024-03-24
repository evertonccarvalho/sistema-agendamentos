
interface Availability {
	id: string;
	weekDay: number
	startTime: number
	endTime: number
	userId: string
	user: {
		name: string
		id: string
		email: string
	}
}
const WorkingHoursComponent = ({ availability }: { availability: Availability[] }) => {

	return (
		<>
			<div className="flex flex-row justify-between w-full gap-4 text-xs border-b py-4 border-solid border-gray-700">
				<div className="">
					<ul className="flex flex-col gap-2 text-gray-400">
						{availability.map((hours) => (
							<li key={hours.id}>{hours.weekDay}</li>
						))}
					</ul>
				</div>
				<div className="">
					<ul className="flex flex-col gap-2 text-end">
						{availability.map((hours) => (
							<li key={hours.id}>
								{hours.startTime} - {hours.endTime}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default WorkingHoursComponent;
