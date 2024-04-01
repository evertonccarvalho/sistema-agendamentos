import Image from "next/image";
import Link from "next/link";

interface AuthSideProps {
  description: string;
}
const AuthSide = ({ description }: AuthSideProps) => {
  return (
    <>
      <div className="relative hidden h-full  items-center justify-center flex-col bg-background p-10 text-white  lg:flex">
        <div className="absolute top-5 left-5 z-20 flex items-center text-lg font-medium">
          <Link href="/">
            <Image
              alt="logo"
              width={100}
              height={100}
              src="/logo.png"
              className=""
            />
          </Link>
        </div>
        {/* <div className="absolute inset-0 bg-accent bg-gradient-to-tl to-primary/30 from-secondary" /> */}
        <div className="flex items-center  z-20 ">
          <div className="space-y-2 place-content-center flex items-center flex-col">
            <div className="flex w-full -mb-14 justify-center">
              <Image
                alt="logo"
                width={1000}
                height={1000}
                src="/login-img.png"
                className="w-[440px]"
              />
            </div>
            <h1 className="mb-4 text-2xl text-center font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-5xl">
              Estamos{" "}
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                ansiosos
              </span>
              <br />
              por{" "}
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                sua presença!
              </span>{" "}
            </h1>
            <div className="w-[60%]">
              <p className="text-base text-center font-normal text-muted-foreground lg:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="shadow" />
      </div>
    </>
  );
};

export default AuthSide;
