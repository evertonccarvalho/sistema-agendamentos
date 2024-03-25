"use client";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LogIn, LogInIcon, Menu } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { useSession } from "next-auth/react";


interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Recursos",
  },
  {
    href: "#testimonials",
    label: "Depoimentos",
  },
  {
    href: "#team",
    label: "Equipe",
  },
  {
    href: "#pricing",
    label: "Preços",
  },
];

export const Navbar = () => {
  const { data } = useSession();



  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0  z-40 w-full bg-background  dark:border-b-slate-700 ">

      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">

            <Link href="/" className="ml-2 font-bold text-xl flex">
              <div className="relative h-8 w-24 ">
                <Image fill alt="logo" src="/logo.png" />
              </div>
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <div className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                />
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    href="/login"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                    rel="noreferrer"
                  >
                    <LogInIcon className="mr-2 w-5 h-5" />
                    Entrar
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            {data?.user ? (
              <Link href="/dashboard" className={`border ${buttonVariants({ variant: "default" })}`}>
                <LogIn className="mr-2 w-5 h-5" />
                Minha Conta
              </Link>
            ) : (
              <Link href="/login" className={`border ${buttonVariants({ variant: "default" })}`}>
                <LogIn className="mr-2 w-5 h-5" />
                Entrar
              </Link>
            )}
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
