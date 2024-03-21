"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

interface EventSettingsProps {
  onDelete: () => void;
  onEdit: () => void;
  onToggleActive: () => void;
  isActive: boolean; // Adicione uma propriedade para indicar se o evento está ativo ou não

}
export function EventSettings({ onDelete, onEdit, onToggleActive, isActive }: EventSettingsProps) {

  const [eventActive, setEventActive] = useState(isActive);

  const handleToggleActive = () => {
    // Atualize o estado local
    setEventActive(!eventActive);
    // Chame a função de alternar ativação
    onToggleActive();
  };

  // Atualize o estado local quando a propriedade isActive mudar
  useEffect(() => {
    setEventActive(isActive);
  }, [isActive]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onEdit}>
            Editar
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            Deletar
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={onToggleActive}>
            <div className="flex items-center space-x-2">
              <Label htmlFor="airplane-mode">on/off</Label>
              <Switch
                id="airplane-mode"
                checked={eventActive}
                onCheckedChange={handleToggleActive}
                aria-readonly
              />
            </div>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
