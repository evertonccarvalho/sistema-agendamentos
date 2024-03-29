import { teamList } from "../../../../lib/const";
import TeamCard, { type Team } from "./TeamCard";

export const TeamSection = () => {
  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="text-primary">
          Nossa equipe{" "}
        </span>
        Dedicada.
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Conheça as mentes por trás desse sistema que irá revolucionar a forma como você gerencia seus agendamentos.
      </p>

      <div className="flex gap-6 flex-wrap items-center justify-evenly">
        {teamList.map((team: Team) => (
          <TeamCard team={team} />
        ))}
      </div>
    </section>
  );
};
