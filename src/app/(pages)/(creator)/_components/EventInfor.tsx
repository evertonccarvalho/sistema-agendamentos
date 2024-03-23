import type { IEventType } from "@/actions/eventType/interface";
import { MapPin, Timer } from "lucide-react";
interface EventInforProps {
  data: IEventType;
}
const EventInfor = ({ data }: EventInforProps) => {
  return (
    <>
      <section className="w-full md:max-w-[25%]">
        <div className="p-3 flex gap-2 flex-col w-full items-center justify-center md:items-start">
          <h2 className="font-semibold text-sm text-muted">
            {data.name ? data.name : "Nome do Cara"}
          </h2>
          <h1 className="font-semibold text-xl break-words">
            {data.name ? data.name : "Serviço X"}
          </h1>
          <div className="flex gap-2  md:flex-col">
            <div className="flex items-center gap-1">
              <Timer size={18} />
              <p className="text-xs text-muted">
                {data.duration ? `${data.duration} min` : "30Min"}
              </p>
            </div>
            {data.locationType && (
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                <p className=" font-semibold  text-muted">
                  {data.locationType}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventInfor;
