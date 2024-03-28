import { cn } from "@/lib/utils";
import { CalendarDays, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
  sidebarOpen: boolean;
}
const menus = [
  { name: "Inicio", link: "/dashboard", icon: HomeIcon },
  { name: "Eventos Agendados", link: "/scheduledevents", icon: CalendarDays },
  {
    name: "Disponibilidade",
    link: "/availability",
    icon: CalendarDays,
    margin: true,
  },
];

export default function SideBarLinks({ sidebarOpen }: props) {
  const pathname = usePathname();

  return (
    <div className="relative  gap-10">
      {menus?.map((menu) => (
        <Link href={menu.link} key={menu.link} className={cn('group py-2 flex items-center mt-2 text-sm gap-3 font-medium px-1.5 hover:text-primary hover:bg-secondary rounded-md', pathname === menu.link ? 'text-primary bg-secondary' : 'text-muted-foreground')}        >
          <menu.icon className={cn('h-22 w-22 ')} />
          <h2 className={`whitespace-pre duration-500 ${!sidebarOpen ? "opacity-0 hidden translate-x-28 overflow-hidden" : ""}`}>
            {menu.name}
          </h2>
          <h2 className={cn(`${sidebarOpen ? "hidden" : ""} absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-card px-0 py-0 font-semibold drop-shadow-lg group-hover:left-12 group-hover:w-fit group-hover:px-2 group-hover:py-1`, { 'text-primary bg-secondary': pathname === menu.link, 'text-muted-foreground': pathname !== menu.link })}>
            {menu.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}
