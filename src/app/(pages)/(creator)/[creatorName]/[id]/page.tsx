import ContainerView from "@/components/ContainerView";
import BookingItem from "../../_components/Booking";
import { getEventActiveById } from "@/actions/eventType/getEventActiveById";

interface BookingPageProps {
  params: {
    id: string;
  };
}
const BookingPage = async ({ params }: BookingPageProps) => {
  const event = await getEventActiveById(params.id);
  console.log("O EVENTO", event);
  return (
    <>
      <ContainerView>
        {event && <BookingItem data={event} />}
      </ContainerView>
    </>
  );
};

export default BookingPage;
