import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonialsList } from "../../../../lib/const";
import TestimonialCard, { type Testimonial } from "./TestimonialsCard";

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="container py-12 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        Por que
        <span className="text-primary"> as Pessoas Amam </span>o Agendaê
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Veja o que nossos usuários têm a dizer sobre sua experiência com nosso
        sistema de agendamento.
      </p>

      <div className="hidden md:block md:grid-cols-2 lg:grid-cols-4  columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonialsList.map((testmonial: Testimonial) => (
          <TestimonialCard key={testmonial.name} testmonial={testmonial} />
        ))}
      </div>
      <div className="flex md:hidden gap-6 flex-wrap items-center justify-evenly">
        <Carousel
          opts={{
            align: "center",
            breakpoints: {
              "(min-width: 920px)": { align: "start" },
            },
          }}
          className=" w-full flex items-center justify-center"
        >
          <CarouselContent>
            {testimonialsList?.map((testmonial: Testimonial) => (
              <CarouselItem key={testmonial.name} className="basis-72 pt-4 ">
                <div className="p-1 flex gap-4">
                  <TestimonialCard testmonial={testmonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-7 " />
          <CarouselNext className="-right-7 " />
        </Carousel>
      </div>
    </section>
  );
};
