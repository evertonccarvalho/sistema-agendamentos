"use client";
import { cancelBooking } from "@/actions/scheduling/cancelBooking";
import { toggleBookingStatus } from "@/actions/scheduling/togleBookingStatus";
import { AlertModal } from "@/components/alert-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { addMinutes, format } from "date-fns";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import { ArrowUpRight, Check, Trash2Icon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import type { IScheduling } from "../interface/interface";

dayjs.extend(utc);

interface ScheduledEvent {
  scheduling: IScheduling;
}

const ScheduledEventItem = ({ scheduling }: ScheduledEvent) => {
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openFinished, setOpenFinished] = useState(false);

  const endDate = addMinutes(
    new Date(scheduling.date ?? ""),
    scheduling.eventType.duration
  );

  const handleDelete = async () => {
    try {
      setLoading(true);
      setOpenDelete(true);
      await cancelBooking(scheduling.id, scheduling.userId);
      toast.success("deletado com sucesso.");
    } catch (error) {
      toast.error("Error ao deletar:");
    } finally {
      setLoading(false);
      setOpenDelete(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      await toggleBookingStatus(
        scheduling.id,
        scheduling.userId,
        "REJECTED",
        scheduling.email,
        scheduling.name,
        scheduling.date,
        scheduling.eventType.name
      );
      toast.success(
        `O Agendamento para ${scheduling.eventType.name} às ${dayjs(
          scheduling.date ?? ""
        )
          .utc()
          .locale("pt-br")
          .format("dddd, D MMMM  - HH:mm")} foi rejeitado.`
      );
    } catch (error) {
      toast.error("Erro ao rejeitar o agendamento.");
    } finally {
      setLoading(false);
      setOpenReject(false);
    }
  };

  const handleFinished = async () => {
    try {
      setLoading(true);
      await toggleBookingStatus(
        scheduling.id,
        scheduling.userId,
        "FINISHED",
        scheduling.email,
        scheduling.name,
        scheduling.date,
        scheduling.eventType.name
      );
      toast.success(
        `O Agendamento para ${scheduling.eventType.name} às ${dayjs(
          scheduling.date ?? ""
        )
          .utc()
          .locale("pt-br")
          .format("dddd, D MMMM - HH:mm")} foi finalizado.`
      );
    } catch (error) {
      toast.error("Erro ao finalizar o agendamento.");
    } finally {
      setLoading(false);
      setOpenFinished(false);
    }
  };

  const handleAccept = async () => {
    try {
      setLoading(true);
      await toggleBookingStatus(
        scheduling.id,
        scheduling.userId,
        "ACCEPTED",
        scheduling.email,
        scheduling.name,
        scheduling.date,
        scheduling.eventType.name
      );
      toast.success(
        `O Agendamento para ${scheduling.eventType.name} às ${dayjs(
          scheduling.date ?? ""
        )
          .utc()
          .locale("pt-br")
          .format("dddd, D MMMM  - HH:mm")} foi aceito.`
      );
    } catch (error) {
      toast.error("Erro ao aceitar o agendamento.");
    } finally {
      setLoading(false);
    }
  };

  const formattedStartTime = dayjs.utc(scheduling.date ?? "").format("HH:mm");

  return (
    <>
      <AlertModal
        variant="destructive"
        title="Tem certeza"
        description="Que deseja deletar? essa ação não pode ser desfeita."
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
      <AlertModal
        variant="destructive"
        title="Tem certeza"
        description="Que deseja rejeitar o agendamento"
        isOpen={openReject}
        onClose={() => setOpenReject(false)}
        onConfirm={handleReject}
        loading={loading}
      />
      <AlertModal
        variant="destructive"
        title="Tem certeza"
        description="Que deseja finalizar o agendamento"
        isOpen={openFinished}
        onClose={() => setOpenFinished(false)}
        onConfirm={handleFinished}
        loading={loading}
      />

      <Accordion className="bg-card rounded-md mb-2" type="single" collapsible>
        <AccordionItem className="border-none" value="item-1">
          <div className="flex gap-1.5   p-4 bg-muted/10 rounded-t-md  flex-col justify-start">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full ${
                  scheduling.status === "PENDING"
                    ? "bg-yellow-600"
                    : scheduling.status === "ACCEPTED"
                    ? "bg-green-600"
                    : scheduling.status === "REJECTED"
                    ? "bg-red-600"
                    : scheduling.status === "FINISHED"
                    ? "bg-gray-600"
                    : ""
                }`}
              />

              <h1 className=" text-sm font-semibold">
                {dayjs(scheduling.date ?? "").format("DD/MM/YYYY")}
              </h1>
              <h1 className="text-sm">
                {formattedStartTime} às {dayjs.utc(endDate).format("HH:mm")}
              </h1>
            </div>
          </div>
          <div className="flex text-sm  items-center  justify-between gap-1.5 px-4 py-2    ">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold">{scheduling.name}</h1>
              <h1>
                Evento:{" "}
                <span className="font-semibold">
                  {scheduling.eventType.name}
                </span>
              </h1>
            </div>

            <AccordionTrigger className="font-semibold  w-full justify-end text-primary gap-1">
              <p className="hidden md:block">Detalhes</p>
            </AccordionTrigger>
          </div>
          <AccordionContent className="border-t-[1px] ">
            <div className="gap-4  flex flex-col md:flex-row  w-full   p-4">
              <div className="flex-col items-center gap-3 flex">
                <div className="flex gap-2 ">
                  {scheduling.status !== "ACCEPTED" && (
                    <Button
                      onClick={handleAccept}
                      className="rounded-full gap-1 disabled"
                      variant="outline"
                    >
                      <Check size={20} />
                      Aceitar
                    </Button>
                  )}

                  {scheduling.status === "REJECTED" && (
                    <Button
                      onClick={() => setOpenDelete(true)}
                      className="rounded-full gap-1 "
                      variant="outline"
                    >
                      <Trash2Icon size={20} />
                      Deletar
                    </Button>
                  )}

                  {scheduling.status !== "REJECTED" && (
                    <Button
                      onClick={() => setOpenReject(true)}
                      className="rounded-full gap-1 "
                      variant="outline"
                    >
                      <X size={20} />
                      Rejeitar
                    </Button>
                  )}

                  <Button
                    onClick={() => setOpenFinished(true)}
                    className="rounded-full gap-1 "
                    variant="outline"
                  >
                    <X size={20} />
                    Finalizar
                  </Button>
                </div>

                <Link
                  className="flex gap-1 items-center text-sm truncate font-light text-blue-500 hover:underline"
                  href={`/dashboard/update/${scheduling.eventType.id}`}
                >
                  <ArrowUpRight size={20} />
                  Edita Tipo do Evento
                </Link>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col">
                  <h1 className="text-primary font-bold uppercase">Email</h1>
                  <p>{scheduling?.email}</p>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-primary font-bold uppercase">Local</h1>
                  <p>{scheduling?.eventType.locationType}</p>
                  {scheduling.eventType.locationType === "PRESENCIAL" && (
                    <div className="flex flex-col">
                      <p className="font-medium">
                        Endereço:
                        <span className="font-normal ">
                          {scheduling?.eventType.address}
                        </span>
                      </p>
                      <p className="font-medium">
                        Capacidade:{" "}
                        <span className="font-normal">
                          {" "}
                          {scheduling?.eventType.capacity}
                        </span>
                      </p>
                      <p className="font-medium">
                        Informaçoes Adicionais:
                        <span className="font-normal">
                          {scheduling?.eventType.arrivalInfo}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-primary font-bold uppercase">Messagem</h1>
                  <p>{scheduling?.message}</p>
                </div>
                <div className="flex gap-1 flex-col">
                  <h1 className="text-primary font-bold uppercase">
                    ANFITRIÃO DA REUNIÃO
                  </h1>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={scheduling.user.image ?? ""}
                      alt={scheduling.user.name ?? ""}
                    />
                    <AvatarFallback className="uppercase">
                      {scheduling.user?.name ? scheduling.user.name[0] : ""}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="text-muted-foreground ">
                  Criado em{" "}
                  {format(
                    new Date(scheduling.created_at ?? ""),
                    "dd/MM/yyyy HH:mm"
                  )}{" "}
                  por: <span className="font-semibold">{scheduling.name}</span>
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ScheduledEventItem;
