import { getEventsByCreatorName } from "@/actions/eventType/getEventsByCreatorName";
import ContainerView from "@/components/ContainerView";
import BookingItem from "../../_components/Booking";

interface BookingPageProps {
  params: {
    id: string;
  };
}
const BookingPage = async ({ params }: BookingPageProps) => {
  const events = await getEventsByCreatorName(params.id);
  console.log(events);

  return (
    <>
      <ContainerView      >
        {/* <div className="flex w-full h-full items-center justify-center"> */}
        <BookingItem />
        {/* </div> */}
      </ContainerView>
    </>
  );
};

export default BookingPage;
