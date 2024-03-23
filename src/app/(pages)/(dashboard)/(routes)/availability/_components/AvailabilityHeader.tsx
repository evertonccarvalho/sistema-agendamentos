import { Button } from "@/components/ui/button";
import { Plus, Timer } from "lucide-react";

const AvailabilityHeader = () => {
  return (
    <>
      <section className="flex w-full">
        <div className="flex w-full gap-3 items-center">

          <div className="flex flex-col gap-2">
            <h1 className="text-base font-semibold ">Schedule</h1>
            <div className="flex gap-2">


              <Button size='sm'>
                <Timer size={18} />Working hours
              </Button>
              <Button size='sm' variant='outline' className="bg-transparent">
                <Plus size={18} /> Create schedule
              </Button>
            </div>
          </div>
        </div>


      </section>
    </>
  );
}

export default AvailabilityHeader;