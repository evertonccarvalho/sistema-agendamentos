import { getEventsByCreatorName } from "@/actions/eventType/getEventsByCreatorName";
import CardEvent from "../_components/CardEvent";
import ContainerView from "@/components/ContainerView";

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
      <ContainerView
        title="Everton Carvalho"
        subtitle=" 
         Bem-vindo à minha página de agendamento. Siga as instruções para adicionar um evento à minha agenda."
      >
        <div className="flex w-full  flex-wrap items-center justify-center gap-4  mx-4">
          {events?.map((event) => (
            <CardEvent
              creator={params.creatorName}
              key={event.id}
              eventType={event}
            />
          ))}
        </div>
      </ContainerView>
    </>
  );
};

export default CreatorsPage;
