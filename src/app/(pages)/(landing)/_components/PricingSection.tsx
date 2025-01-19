import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { pricingList } from "../../../../lib/const";
import type { Pricing } from "./PricingCard";
import PricingCard from "./PricingCard";

export const PricingSection = () => {
  return (
    <section id="pricing" className="container py-12 sm:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Obtenha
        <span className="text-primary"> Acesso </span>
        Ilimitado
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Encontre o plano que melhor se adapta às suas necessidades.
      </h3>
      <div className="flex gap-6 flex-wrap items-center justify-center">
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
            {pricingList?.map((pricing: Pricing, index: number) => (
              <CarouselItem key={index} className="basis-72 md:basis-96 ">
                <div className="flex h-full">
                  <PricingCard pricing={pricing} />
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
