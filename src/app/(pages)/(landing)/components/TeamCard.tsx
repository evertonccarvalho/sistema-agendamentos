import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export interface Team {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
  description: string;
}

export interface SociaNetworkslProps {
  name: string;
  url: string;
}

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Github":
        return <FaGithub size="20" />;

      case "Instagram":
        return <Instagram size="20" />;
    }
  };
  return (
    <>
      <Card
        key={team.name}
        className=" relative mt-8 flex flex-col justify-center items-center"
      >
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src={team.imageUrl}
            alt={`${team.name} ${team.position}`}
            className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">{team.name}</CardTitle>
          <CardDescription className="text-primary">
            {team.position}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>{team.description}</p>
        </CardContent>

        <CardFooter>
          {team.socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
            <div key={name}>
              <Link
                href={url}
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <span className="sr-only">{name} icon</span>
                {socialIcon(name)}
              </Link>
            </div>
          ))}
        </CardFooter>
      </Card>
    </>
  );
};

export default TeamCard;
