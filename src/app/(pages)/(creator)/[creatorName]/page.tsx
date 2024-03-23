import { getEventsByCreatorName } from "@/actions/eventType/getEventsByCreatorName";
import ContainerWrapper from "@/components/containerWrapper";
import CardEvent from "../_components/CardEvent";

interface CreatorsPageProps {
  params: {
    creatorName: string;
    creator: {
      name: string;
    };
  };
}
const CreatorsPage = async ({ params }: CreatorsPageProps) => {
  const events = await getEventsByCreatorName(params.creatorName);
  console.log(events);

  return (
    <>
      <ContainerWrapper
        title={`${events && events.length > 0 ? events[0].creator.name : params.creatorName}`}
        subtitle=" 
         Bem-vindo à minha página de agendamento. Siga as instruções para adicionar um evento à minha agenda."
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-4  mx-4">
          {events && events.length > 0 ? (
            events.map((event) => (
              <CardEvent
                creator={params.creatorName}
                key={event.id}
                eventType={event}
              />
            ))
          ) : (
            <h1 className="text-lg font-semibold">Nenhum evento disponível no momento.</h1>
          )}
        </div>
      </ContainerWrapper>
    </>
  );
};

export default CreatorsPage;
