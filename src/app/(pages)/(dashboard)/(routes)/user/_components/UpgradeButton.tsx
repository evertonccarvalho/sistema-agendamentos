import { Zap } from "lucide-react";
import { ProModal } from "../../../../../../components/ProModal";
import { useEffect, useState } from "react";
import { Button } from "../../../../../../components/ui/button";
import { MAX_FREE_COUNTS } from "@/lib/const";
import { Progress } from "../../../../../../components/ui/progress";

interface ButtonProps {
  isOpen: boolean;
  apiLimitCount: number;
  isPro: boolean | null
}

const UpgradeButton = ({ isOpen, apiLimitCount, isPro }: ButtonProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }
  return (
    <>
      <div className={` pt-4 ${!isOpen && "flex items-center justify-center"}`}>
        <div className={`" gap-1 items-center flex flex-col text-sm text-foreground mb-4 space-y-2" ${!isOpen && "hidden"}`}>
          <p>
            {apiLimitCount} / {MAX_FREE_COUNTS} Tipos de Serviços
          </p>
          <Progress
            className="h-3"
            value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
          />
        </div>
        <Button
          type="button"
          variant={'premium'}
          className={`${!isOpen && "w-8"
            } w-full cursor-pointer group h-8 flex items-center text-sm text-secondary justify-center gap-3.5 font-medium p-2 rounded-full bg-card-foreground hover:text-secondary`}
          onClick={() => setOpen(true)}
        >
          <div>
            <Zap className="fill-white" size={16} />
          </div>
          <h2
            className={`whitespace-pre duration-500 ${!isOpen && "opacity-0 hidden translate-x-28 overflow-hidden"
              }`}
          >
            Atualizar
          </h2>
        </Button>
        <ProModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default UpgradeButton;
