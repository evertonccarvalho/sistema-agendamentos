"use client"
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getWeekDays } from "@/utils/getWeekDay";
import { convertTimeStringToNumber } from "@/utils/convertTimeStringToNumber";
import AvailabilityField from "./AvailabilityField";

const ONE_HOUR_IN_MINUTES = 60;

const staticDefaultAvailability = [
  { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
  { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
];

const availabilitySchema = z.object({
  availability: z
    .array(
      z.object({
        weekDay: z.coerce.number(),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((availability) => availability.filter((a) => a.enabled))
    .refine(
      (availability) => availability.length > 0,
      "Você precisa de pelo menos uma disponibilidade em um dia da semana",
    )
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekDay: interval.weekDay,
        startTime: convertTimeStringToNumber(interval.startTime),
        endTime: convertTimeStringToNumber(interval.endTime),
      })),
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTime - ONE_HOUR_IN_MINUTES >= interval.startTime,
        ),
      {
        message:
          "O horário de término do agendamento deve ser pelo menos 1h a frente do horário de início.",
      },
    ),
});

const AvailabilityForm = () => {
  const form = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      availability: staticDefaultAvailability,
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "availability",
  });

  const weekDays = getWeekDays();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        {fields.map((field, index) => (
          <AvailabilityField
            index={index}
            weekDay={weekDays[index]}
            control={form.control}
            form={form}

          />
        ))}
        <Button disabled={form.formState.isSubmitting} type="submit">
          Confirmar
        </Button>
      </form>
    </Form>
  );
}

export default AvailabilityForm