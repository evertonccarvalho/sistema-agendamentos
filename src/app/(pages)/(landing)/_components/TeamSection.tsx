import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { teamList } from "../../../../lib/const";
import TeamCard from "./TeamCard";

export const TeamSection = () => {
  return (
    <section id="team" className="container py-12 sm:py-20">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="text-primary">Nossa </span>
        equipe.
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Conheça as mentes por trás desse sistema que irá revolucionar a forma
        como você gerencia seus agendamentos.
      </p>

      <div className="flex  gap-6 flex-wrap items-center justify-center">
        <Carousel
          opts={{
            align: "center",
            breakpoints: {
              "(min-width: 920px)": { align: "start", active: false },
            },
          }}
          className=" w-full  max-w-[1152px]"
        >
          <CarouselContent>
            {teamList?.map((team) => (
              <CarouselItem
                key={team.name}
                className="basis-72 md:basis-96  pt-4 "
              >
                <div className="flex h-full flex-col ">
                  <TeamCard team={team} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-7 md:hidden" />
          <CarouselNext className="-right-7 md:hidden" />
        </Carousel>
      </div>
    </section>
  );
};
