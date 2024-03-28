"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

interface PricingCardSubscriberProps {
  pricing: Pricing;
}
export interface Pricing {
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

const PricingCardSubscriber = ({ pricing }: PricingCardSubscriberProps) => {
  return (
    <Card
      key={pricing.title}
      className={
        pricing.popular === PopularPlanType.YES
          ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
          : ""
      }
    >
      <CardHeader>
        <CardTitle className="flex item-center justify-between">
          {pricing.title}
          {pricing.popular === PopularPlanType.YES ? (
            <Badge variant="secondary" className="text-sm text-primary">
              Most popular
            </Badge>
          ) : null}
        </CardTitle>
        <div>
          <span className="text-3xl font-bold">R$ {pricing.price}</span>
          <span className="text-muted-foreground"> /Mês</span>
        </div>

        <CardDescription>{pricing.description}</CardDescription>
      </CardHeader>

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

export default PricingCardSubscriber;
