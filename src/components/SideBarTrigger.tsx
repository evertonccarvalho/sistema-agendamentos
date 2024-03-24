import { Menu } from "lucide-react";

interface SideBarTriggerProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SideBarTrigger = ({
  sidebarOpen,
  setSidebarOpen,
}: SideBarTriggerProps) => {
  return (
    <div className="block md:hidden justify-end p-3">
      <Menu
        size={26}
        className="cursor-pointer"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
};

export default SideBarTrigger;
