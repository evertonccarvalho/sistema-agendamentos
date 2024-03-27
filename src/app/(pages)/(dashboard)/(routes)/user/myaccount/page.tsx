import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import { auth } from "../../../../../../../auth";
import { ModeToggle } from "@/components/theme-toggle";
import { SubscriptionButton } from "../_components/subscription-button";
import { checkSubscription } from "@/actions/subscription/subscription";

const SettingsProfilePage = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }
  const isPro = await checkSubscription();

  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-1 md:p-4 rounded-sm bg-muted gap-4 flex flex-col w-full h-full ">
        <section className="flex w-full flex-col md:flex-row gap-2">
          <div className="w-full  flex">
            <div className="flex gap-1 items-center  p-8 h-full  w-full justify-center bg-card rounded-md">
              <div className="flex h-full   flex-col md:flex-row items-center gap-4 justify-center">
                <div className="px-4 lg:px-8 space-y-4">
                  <div className="text-muted-foreground text-sm">
                    {isPro
                      ? "Você está atualmente em um plano Pro."
                      : "Você está atualmente em um plano gratuito."}
                  </div>
                  <SubscriptionButton isPro={isPro} />
                </div>
                <div className="px-4 lg:px-8 py-4 space-y-4 ">
                  <div className="flex items-center  gap-4">
                    <p className="text-sm">Mudar Tema</p>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full  flex">
            <div className="flex gap-1 items-center  p-8 h-full  w-full justify-center bg-card rounded-md">
              <div className="flex h-full flex-col md:flex-row items-center gap-4 justify-center">
                <Button
                  variant="ghost"
                  className=" h-14 w-14 md:h-28 md:w-28 rounded-full"
                >
                  <Avatar className="h-14 w-14 lg:h-28 lg:w-28">
                    <AvatarImage
                      src={session.user.image ?? ""}
                      alt={session.user.name ?? ""}
                    />
                    <AvatarFallback className="uppercase">
                      {session.user.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>

                <div className="flex  gap-2 items-center">
                  <div>
                    <h1 className="font-bold text-xl">
                      Bem-Vindo, {session.user.name}
                    </h1>
                    <div className=" flex gap-1 items-center">
                      <MailIcon size={18} className="text-primary" />
                      <p>{session.user.email}</p>
                    </div>
                  </div>
                  {/* <div className="flex cursor-pointer ">
                    <Settings size={30} className="text-primary " />
                  </div> */}
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
