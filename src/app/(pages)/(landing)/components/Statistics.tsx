export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    { quantity: "2.7K+", description: "Usuários" },
    { quantity: "1.8K+", description: "Assinantes" },
    { quantity: "48.5k", description: "Agendamentos" },
    { quantity: "54k", description: "Clientes Satisfeitos" },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-2xl md:text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-sm md:text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
