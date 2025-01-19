import { getEventActiveById } from "@/actions/eventType/getEventActiveById";
import ContainerWrapper from "@/components/containerWrapper";
import BookingItem from "../../_components/Booking";

interface BookingPageProps {
  params: Promise<{ id: string }>;
}

const BookingPage = async ({ params }: BookingPageProps) => {
  const { id } = await params;
  const event = await getEventActiveById(id);

  return (
    <ContainerWrapper>{event && <BookingItem data={event} />}</ContainerWrapper>
  );
};

export default BookingPage;
