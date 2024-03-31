import { CardFooter } from "@/components/ui/card";
import { ResetForm } from "../_components/reset-form";
import { BackButton } from "../_components/back-button";

const ResetPage = () => {
  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 bg-gradient-to-b to-gray-500/30 from-black/10">
        <div className="p-4 lg:p-8 h-full flex items-center ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Esqueceu sua senha?
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira o seu endereço de e-mail abaixo para redefinir sua senha.
              </p>
            </div>
            <ResetForm />
            <CardFooter>
              <BackButton label="Ir paga login" href="/auth/login" />
            </CardFooter>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPage;
