import { Plus } from "lucide-react";
import Link from "next/link";

interface ButtonProps {
  isOpen: boolean;
}

const CreateButton = ({ isOpen }: ButtonProps) => {
  return (
    <>
      <div className={`${!isOpen && "flex  items-center justify-center"}`}>
        <Link href={"/dashboard/new"}>
          <button
            type="button"
            className={`${!isOpen && "w-8"
              } w-full cursor-pointer group h-8 flex items-center text-sm text-secondary justify-center gap-3.5 font-medium p-2 rounded-full bg-card-foreground hover:text-secondary`}
            onClick={() => { }}
          >
            <div>
              <Plus size={16} />
            </div>
            <h2
              className={`whitespace-pre duration-500 ${!isOpen && "opacity-0 hidden translate-x-28 overflow-hidden"
                }`}
            >
              Criar
            </h2>
          </button>
        </Link>
      </div>
    </>
  );
}

export default CreateButton;