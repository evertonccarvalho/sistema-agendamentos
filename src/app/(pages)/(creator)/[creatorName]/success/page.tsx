"use client"
import ContainerView from "@/components/ContainerView";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";


interface SuccesPageProps {
  searchParams: {
    creatorName: string;
    name: string;
    eventType: string;
    date: string;
  }
}
const SuccessPage = ({
  searchParams
}: SuccesPageProps) => {
  return (<>
    <ContainerView
      title="Você está agendado"
      subtitle=" Um convite de calendário foi enviado para seu endereço de e-mail."
    >
      <div className={"flex flex-col gap-2 bg-secondary max-w-96  w-full h-full min-h-32 rounded-md p-6 border-[1px] border-zinc-700 drop-shadow-md hover:drop-shadow-xl 	hover:bg-muted/10	"}>
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-base font-semibold ">{searchParams.eventType}</h1>
          <div className="flex items-center gap-1">
            <User size={22} className="text-primary" />
            <h1 className="text-base font-normal">{searchParams.creatorName}</h1>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={22} className="text-primary" />
            <h1 className="text-base font-normal">  {format(new Date(searchParams.date ?? ""), "dd/MM/yyyy 'às' HH:mm")} </h1>
          </div>
        </div>
      </div>
    </ContainerView>

  </>);
}

export default SuccessPage;