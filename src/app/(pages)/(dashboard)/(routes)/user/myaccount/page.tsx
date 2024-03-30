import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import { auth } from "../../../../../../lib/auth";
import { SubscriptionButton } from "../_components/subscription-button";
import { checkSubscription } from "@/actions/subscription/subscription";
import { ModeToggle } from "@/components/theme-toggle";
import { checkSubscriptionTimeExpires } from "@/actions/subscription/checkSubscriptionTimeExpires";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { PricingCardAdd } from "../_components/PricingCardAd";

const SettingsProfilePage = async () => {
	const session = await auth();

	if (!session) {
		return null;
	}

	const isPro = await checkSubscription();
	const timeExpires = await checkSubscriptionTimeExpires();
	const EXPIRATION_TIME = dayjs(timeExpires?.stripeCurrentPeriodEnd)
		.locale("pt-br")
		.format("dddd, D MMMM - HH:mm");

	const popularPlan = {
		title: "Padrão",
		popular: 1,
		price: 10,
		description: "Para necessidades de agendamento mais sofisticadas.",
		buttonText: "Iniciar Teste Grátis",
		benefitList: [
			"Tipos de evento ilimitados com reuniões ilimitadas",
			"Múltiplos calendários para disponibilidade e agendamento",
			"Integrações com Hubspot, PayPal, Stripe e mais",
			"Tipos de evento em grupo e coletivo",
			"Lembretes, solicitações de reconfirmação e fluxos de trabalho",
			"Mais personalização de sua página de agendamento e e-mails",
			"Suporte por chat ao vivo 24/7",
		],
	};

	return (
		<>
			<div className="max-w-screen-2xl mx-auto p-1 md:p-4 rounded-sm bg-muted gap-4 flex flex-col w-full">
				<section className="flex w-full items-start justify-between gap-2">
					<div className="w-full flex">
						<div className="flex gap-1 items-center p-8 h-full w-full justify-center bg-card rounded-md">
							<div className="flex h-full flex-col md:flex-row items-center gap-4 justify-center">
								<Button
									variant="ghost"
									className=" h-14 w-14 md:h-20 md:w-1h-20 rounded-full cursor-default"
								>
									<Avatar className="h-14 w-14 md:h-20 md:w-1h-20">
										<AvatarImage
											src={session.user.image ?? ""}
											alt={session.user.name ?? ""}
										/>
										<AvatarFallback className="uppercase">
											{session.user.name?.[0]}
										</AvatarFallback>
									</Avatar>
								</Button>

								<div className="flex relative gap-4 items-center">
									<div>
										<h1 className="font-bold md:text-xl">
											Bem-Vindo, {session.user.name}
										</h1>
										<div className=" flex justify-center md:justify-start gap-1 items-center">
											<MailIcon size={18} className="text-primary" />
											<p>{session.user.email}</p>
										</div>
									</div>
									<ModeToggle />
								</div>
							</div>
						</div>
					</div>
					<div className="w-full flex">
						<div className="flex gap-1 items-center p-8 h-full  w-full justify-center bg-card rounded-md">
							<div className="flex h-full flex-col md:flex-row items-center gap-4 justify-center">
								<div className="px-4 flex items-center flex-col gap-4  ">
									<div className="text-muted-foreground  text-center text-sm">
										{isPro
											? "Você está atualmente em um plano Pro."
											: "Você está atualmente em um plano gratuito."}
									</div>
									{!isPro && (
										<>
											<div className="flex flex-col gap-1 justify-center items-center">
												<h1 className="text-4xl font-extrabold text-primary">
													Atualize para o Pro
												</h1>
												<p className="text-muted-foreground text-sm">
													E garanta todas as vantagens de ser pro.
												</p>
											</div>
											<PricingCardAdd pricing={popularPlan} />
										</>
									)}
									{isPro && (
										<h1 className="text-sm text">
											Seu plano expira
											<span className="capitalize"> {EXPIRATION_TIME}</span>
										</h1>
									)}
									<SubscriptionButton isPro={isPro} />
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default SettingsProfilePage;
