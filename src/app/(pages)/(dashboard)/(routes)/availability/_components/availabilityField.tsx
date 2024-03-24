"use client"
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AvailabilityFieldProps {
  index: number;
  weekDay: string; // Assumindo que 'weekDay' é uma string
  control: any; // Tipo apropriado para control do react-hook-form
  form: any; // Tipo apropriado para form do react-hook-form
}

// Componente para cada campo de disponibilidade
const AvailabilityField = ({
  index,
  weekDay,
  control,
  form,
}: AvailabilityFieldProps) => {
  // Adicionando 'form' como prop
  return (
    <div>
      <FormField
        control={control}
        name={`availability.${index}.enabled`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            </FormControl>
            <FormLabel>{weekDay}</FormLabel>
          </FormItem>
        )}
      />
      <Input
        disabled={!control.fields[`availability.${index}.enabled`].value} // Ajustando para acessar o controle de desabilitado do Checkbox
        {...form.register(`availability.${index}.startTime`)} // Corrigindo para 'form'
        type="time"
      />
      <Input
        disabled={!control.fields[`availability.${index}.enabled`].value} // Ajustando para acessar o controle de desabilitado do Checkbox
        {...form.register(`availability.${index}.endTime`)} // Corrigindo para 'form'
        type="time"
      />
    </div>
  );
}

export default AvailabilityField