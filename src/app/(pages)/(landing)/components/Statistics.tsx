"use client"
import CountUp from 'react-countup';

export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
    value: string;
  }

  const stats: statsProps[] = [
    { quantity: "2.700", description: "Usuários", value: "K+"},
    { quantity: "1.800", description: "Assinantes", value: "K+" },
    { quantity: "48.500", description: "Agendamentos", value: "K" },
    { quantity: "54.000", description: "Clientes Satisfeitos", value: "K" },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description, value }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-2xl md:text-3xl sm:text-4xl font-bold "><CountUp end={Number.parseFloat(quantity)} decimals={1} duration={4}/>{value}</h2>
            <p className="text-sm md:text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
