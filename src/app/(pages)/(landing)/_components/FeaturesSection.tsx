import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Bell, Calendar, Clock, User } from "lucide-react";

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    title: "Agendamento Online",
    description:
      "Permita que seus clientes agendem compromissos online facilmente, sem a necessidade de contato direto.",
    icon: Calendar,
  },
  {
    title: "Gestão de Horários",
    description:
      "Gerencie eficientemente seus horários e disponibilidades, evitando conflitos e maximizando a eficiência.",
    icon: Clock,
  },
  {
    title: "Notificações Automatizadas",
    description:
      "Envie lembretes automáticos e confirmações de agendamento para seus clientes, mantendo-os informados e reduzindo no-shows.",
    icon: Bell,
  },
  {
    title: "Perfil do Cliente",
    description:
      "Obtenha insights valiosos sobre seus clientes, permitindo uma personalização precisa e um atendimento mais eficaz.",
    icon: User,
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container  text-center ">
      <h2 className="text-3xl  md:text-4xl font-bold ">
        Nossos <span className="text-primary">Serviços de Agendamento</span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Facilite a gestão do seu tempo e das suas marcações com nossos serviços
        especializados em agendamento online.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-muted">
            <CardHeader className="p-4">
              <CardTitle className="grid gap-2 text-lg place-items-center">
                <feature.icon className={cn("h-22 w-22 ")} />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text">{feature.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
