import { pricingList } from "./const/const";
import type { Pricing } from "./PricingCard";
import PricingCard from "./PricingCard";



export const PricingSection = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Obtenha
        <span className="text-primary">
          {" "}
          Acesso{" "}
        </span>
        Ilimitado
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Encontre o plano que melhor se adapta às suas necessidades.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: Pricing) => (
          <PricingCard pricing={pricing} />
        ))}
      </div>
    </section>
  );
};
