"use client"
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

interface CardProps {
  pricing: Pricing;
}
interface Pricing {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}
enum PopularPlanType {
  NO = 0,
  YES = 1,
}

export const PricingCardAdd = ({ pricing }: CardProps) => {

  return (
    <Card
      key={pricing.title}
      className={
        pricing.popular === PopularPlanType.YES
          ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-primary/30 border"
          : ""
      }
    >
      <CardHeader>
        <CardTitle className="flex item-center justify-between text-4xl font-extrabold">
          {pricing.title}
          {pricing.popular === PopularPlanType.YES ? (
            <Badge variant="secondary" className="text-sm text-primary">
              Most popular
            </Badge>
          ) : null}
        </CardTitle>
        <div>
          <span className="text-2xl font-bold">R$ {pricing.price}</span>
          <span className="text-muted-foreground"> /Mês</span>
        </div>

        <CardDescription>{pricing.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <h1 className="text-2xl font-bold">Benefícios Incríveis!</h1>
      </CardContent>

      <hr className="w-4/5 m-auto mb-4" />

      <CardFooter className="flex">
        <div className="space-y-4">
          {pricing.benefitList.map((benefit: string) => (
            <div
              key={benefit}
              className="flex  w-full  justify-start  items-center"
            >
              <CheckIcon
                size={18}
                className="text-green-500 min-w-[16px] max-w-[16px]"
              />
              <h3 className="ml-2 text-sm">{benefit}</h3>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
