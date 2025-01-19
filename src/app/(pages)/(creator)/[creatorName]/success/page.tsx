"use client";
import ContainerWrapper from "@/components/containerWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import { Calendar, User } from "lucide-react";
import { useParams } from "next/navigation";

dayjs.extend(utc);

const SuccessPage = () => {
  const params = useParams<{
    creatorName: string;
    name: string;
    eventType: string;
    date: string;
  }>();

  const handleback = () => {
    window.history.go(-2);
  };
  return (
    <>
      <ContainerWrapper
        title="Você está agendado"
        subtitle=" Um convite de calendário foi enviado para seu endereço de e-mail."
      >
        <>
          <Card className="relative max-w-md md:break-inside-avoid overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="flex flex-col">
                <CardTitle className="text-lg flex items-center justify-between">
                  {params.eventType}
                </CardTitle>
                <CardDescription className=" flex gap-2 items-center">
                  <User size={22} className="text-primary" />
                  {params.creatorName}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex gap-2 items-center flex-col justify-center">
              <h1 className="items-center capitalize flex gap-2">
                <Calendar size={22} className="text-primary " />
                {dayjs(params.date ?? "")
                  .utc()
                  .locale("pt-br")
                  .format("dddd, D MMMM [às] HH:mm")}
                ;
              </h1>
              <Button onClick={handleback} className="text-white">
                Voltar ao início
              </Button>
            </CardContent>
          </Card>
        </>
      </ContainerWrapper>
    </>
  );
};

export default SuccessPage;
