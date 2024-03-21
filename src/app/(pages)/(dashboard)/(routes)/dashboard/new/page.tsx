import BreadCrumb from "@/components/breadcrumb";
import SchedulingItem from "@/components/schedulingItem";
import { NewEventForm } from "../../../components/NewEventForm";

const NewEvent = () => {
	const breadcrumbItems = [{ title: "Criar Novo Evento", link: "/new" }];

	const dataInfo = {
		eventName: "Aulas de Programação",
		eventDuration: "30Min",
		eventLocation: "Vai ser aculá",
		userName: "Ziriguidum da Silva",
	};

	return (
		<main className="flex-1 gap-5 space-y-4 bg-card/80 p-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<section className="flex w-full items-center justify-between gap-2 flex-wrap">
				<NewEventForm />
				<section className="w-[37rem] h-[26rem] rounded-md max-w-[1200px] border-[1px] border-zinc-700 flex flex-col max-[1135px]:w-full md:flex-row">
					<SchedulingItem
						userName={dataInfo.userName}
						eventName={dataInfo.eventName}
						eventDuration={dataInfo.eventDuration}
						eventLocation={dataInfo.eventLocation}
					/>
				</section>
			</section>
		</main>
	);
};

export default NewEvent;
