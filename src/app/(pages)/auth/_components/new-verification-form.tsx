"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { newVerification } from "@/actions/users/new-verification";
import { CardFooter } from "@/components/ui/card";
import { BackButton } from "./back-button";
import { Loader2 } from "lucide-react";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Token de verificação ausente!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
        if (data.success) {
          window.location.href = "/auth/login";
        }
      })
      .catch(() => {
        setError("Algo deu errado ao verificar o email!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 bg-gradient-to-b to-gray-500/30 from-black/10">
        <div className="p-4 lg:p-8 h-full flex items-center ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Verificando Email
              </h1>
              <p className="text-sm text-muted-foreground">
                Por favor, aguarde enquanto verificamos seu email.
              </p>
            </div>
            <div className="flex items-center w-full justify-center">
              {!success && !error && <Loader2 className="animate-spin w-5 h-5 mr-3" />}
              {success && <FormSuccess message={success} />}
              {!success && <FormError message={error} />}
            </div>
            <CardFooter>
              <BackButton label="Ir paga login" href="/auth/login" />
            </CardFooter>
          </div>
        </div>
      </div>
    </>
  );
};
