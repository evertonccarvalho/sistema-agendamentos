import { getEventsByCreatorName } from "@/actions/eventType/getEventsByCreatorName";
import ContainerWrapper from "@/components/containerWrapper";
import CardEvent from "../_components/CardEvent";

interface CreatorsPageProps {
  params: Promise<{
    creatorName: string;
  }>;
}
const CreatorsPage = async ({ params }: CreatorsPageProps) => {
  const { creatorName } = await params;

  const events = await getEventsByCreatorName(creatorName);

  return (
    <>
      <ContainerWrapper
        title={`${
          events && events.length > 0 ? events[0].creator.name : creatorName
        }`}
        subtitle="
         Bem-vindo à minha página de agendamento. Siga as instruções para adicionar um evento à minha agenda."
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-4  mx-4">
          {events && events.length > 0 ? (
            events.map((event) => (
              <CardEvent
                creator={creatorName}
                key={event.id}
                eventType={event}
              />
            ))
          ) : (
            <h1 className="text-lg font-semibold">
              Nenhum evento disponível no momento.
            </h1>
          )}
        </div>
      </ContainerWrapper>
    </>
  );
};

export default CreatorsPage;
