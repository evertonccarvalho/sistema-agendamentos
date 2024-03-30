import Image from "next/image";
import { Statistics } from "./Statistics";

export const About = () => {
  return (
    <section id="about" className="container py-12 sm:py-20">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src="/LOGO-ICONE.png"
            alt=""
            width={1000}
            height={1000}
            className="max-w-[250px] lg:flex hidden w-full object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col text-center md:text-left justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-primary">
                  Sobre{" "}
                </span>
                Agendaê
              </h2>
              <p className="text-sm  md:text-lg  text-muted-foreground mt-4">
                A Agendaê é uma plataforma inovadora de agendamentos para indivíduos e empresas. Nosso objetivo é simplificar o processo de agendamento, oferecendo uma experiência fácil e confiável. Com uma comunidade crescente de usuários, estamos deixando uma marca significativa no cenário de sistemas de agendamento. Na Agendaê, acreditamos que um sistema de agendamento eficaz pode fazer toda a diferença na organização pessoal e empresarial. Junte-se a nós nesta jornada para simplificar o agendamento na era digital.
              </p>
            </div>
            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
