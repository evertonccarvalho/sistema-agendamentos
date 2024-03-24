import { useEffect } from "react";
import SideBarLinks from "./sideBarLinks";
import Logos from "./logo";
import CreateButton from "./createButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const MainSideBar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 640) {
        // Defina aqui o ponto de quebra para fechar a sidebar em telas menores
        setSidebarOpen(false); // Fecha a sidebar quando a largura da tela for menor ou igual a 640px
      }
    }

    // Adiciona o listener do evento de redimensionamento da janela
    window.addEventListener("resize", handleResize);

    // Remove o listener do evento de redimensionamento ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSidebarOpen]);

  return (
    <>
      <aside
        className={`z-50 border-r-[1px] border-zinc-700 relative min-h-dvh gap-5 text-foreground px-4 ${sidebarOpen ? "w-72" : "md:w-16"
          } grid-cols-1 bg-card px-4 text-foreground duration-500 `}
      >
        <Logos isOpen={sidebarOpen} />
        <div className="hidden md:block">
          {sidebarOpen ? (
            <ChevronLeft
              className="cursor-pointer  absolute top-4 bg-card rounded-full right-1"
              size={22}
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            />
          ) : (
            <ChevronRight
              className="cursor-pointer hiden absolute top-4 bg-card rounded-full right-1"
              size={22}
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            />
          )}
        </div>
        <CreateButton isOpen={sidebarOpen} />
        <div className="flex flex-col gap-4 py-3">
          <SideBarLinks sidebarOpen={sidebarOpen} />
        </div>
      </aside>
    </>
  );
};

export default MainSideBar;