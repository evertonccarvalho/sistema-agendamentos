import { getEventsByCreatorName } from "@/actions/eventType/getEventsByCreatorName";

interface CreatorsPageProps {
  params: {
    creatorName: string;
  };
}
const CreatorsPage = async ({ params }: CreatorsPageProps) => {
  const events = await getEventsByCreatorName(params.creatorName);
  console.log(events);

  return (
    <>
      <div className="flex items-center justify-center">
        <h1>CREATORS PAGE</h1>
      </div>
    </>
  );
};

export default CreatorsPage;
