"use client"
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface CardProps {
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

const PricingCard = ({ pricing }: CardProps) => {
  const { data } = useSession();

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

      <CardContent>
        {data?.user ? (
          <Link
            href="/dashboard"
            className={`w-full  ${buttonVariants({
              variant: "default",
            })}`}
          >
            {pricing.buttonText}
          </Link>
        ) : (
          <Link
            href="/auth/register"
            className={`w-full text-white  ${buttonVariants({
              variant: "default",
            })}`}
          >
            {pricing.buttonText}
          </Link>
        )}
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

export default PricingCard;
