import { teamList } from "./const/const";
import TeamCard, { type Team } from "./TeamCard";

export const TeamSection = () => {
  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="text-primary">
          Our Dedicated{" "}
        </span>
        Crew
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {teamList.map((team: Team) => (
          <TeamCard team={team} />
        ))}
      </div>
    </section>
  );
};
