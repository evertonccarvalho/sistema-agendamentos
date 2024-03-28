import ContainerWrapper from "@/components/containerWrapper";
import BookingItem from "../../_components/Booking";
import { getEventActiveById } from "@/actions/eventType/getEventActiveById";

interface BookingPageProps {
	params: {
		id: string;
	};
}
const BookingPage = async ({ params }: BookingPageProps) => {
	const event = await getEventActiveById(params.id);
	// const available = await getAvailabilitys("clu2p1exz0000zk8juzvmdwjd");
	// console.log(available);
	return (
		<>
			<ContainerWrapper>
				{event && <BookingItem data={event} />}
			</ContainerWrapper>
		</>
	);
};

export default BookingPage;
