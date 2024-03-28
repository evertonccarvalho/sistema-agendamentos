"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { newVerification } from "@/actions/users/new-verification";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BackButton } from "./back-button";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
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
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex w-full h-svh items-center justify-center">
      <Card className="w-[400px] ">
        <CardHeader className="text-center text-sm font-semibold">Verificando email</CardHeader>
        <CardContent>
          <div className="flex items-center w-full justify-center">
            {!success && !error && <Loader2 />}
            {success && <FormSuccess message={success} />}
            {!success && <FormError message={error} />}
          </div>
        </CardContent>
        <CardFooter>
          <BackButton label="Ir paga login" href="/auth/login" />
        </CardFooter>
      </Card>
    </div>
  );
};
