"use client"
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";

const EventPageHeader = () => {
  const { data } = useSession();

  if (!data?.user) {
    return null;
  }
  const username = data.user.email?.substring(0, data.user.email.indexOf("@"));
  const eventUrl = absoluteUrl(`/${username}`);
  return (
    <>
      <section className="flex w-full">
        <div className="flex w-full gap-3 items-center">
          <Avatar className="h-10 w-10 ">
            <AvatarImage
              src={data.user.image ?? ""}
              alt={data.user.name ?? ""}
            />
            <AvatarFallback className="uppercase">
              {data.user?.name ? data.user.name[0] : ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-base font-semibold ">{data.user.name}</h1>
            <Link className="text-base font-light text-blue-500 hover:underline"
              href={eventUrl}>
              {eventUrl}
            </Link>
          </div>
        </div>

        <Link href={"/dashboard/new"}>
          <Button variant='outline' className="bg-transparent rounded-full flex items-center gap-1">
            <Plus size={18} />  <p className="md:flex hidden"> Adicionar</p>
          </Button>
        </Link>
      </section >
    </>
  );
}

export default EventPageHeader;