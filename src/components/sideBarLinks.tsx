import { CalendarDays, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface props {
  sidebarOpen: boolean;
}
const menus = [
  { name: "Inicio", link: "/dashboard", icon: HomeIcon },
  { name: "Eventos Agendados", link: "/scheduledevents", icon: CalendarDays },
  { name: "Disponibilidade", link: "/availability", icon: CalendarDays, margin: true, },
];

export default function SideBarLinks({ sidebarOpen }: props) {
  const pathname = usePathname();

  return (
    <div className="relative gap-10">
      {menus?.map((menu) => (
        <Link
          href={menu.link}
          key={menu.link}
          className={`group py-2 flex items-center text-sm gap-3 font-medium px-1.5 hover:bg-card-foreground hover:text-secondary rounded-md ${menu.link.trim() === pathname.trim() ? "text-primary" : ""
            }`}
        >
          <div>{React.createElement(menu.icon, { size: "18" })}</div>
          <h2
            className={`whitespace-pre duration-500 ${!sidebarOpen ? "opacity-0 hidden translate-x-28 overflow-hidden" : ""
              }`}
          >
            {menu.name}
          </h2>
          <h2
            className={`${sidebarOpen ? "hidden" : ""
              } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-card px-0 py-0 font-semibold text-primary drop-shadow-lg group-hover:left-12 group-hover:w-fit group-hover:px-2 group-hover:py-1`}
          >
            {menu.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}

