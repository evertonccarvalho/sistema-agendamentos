import Image from "next/image";
import Link from "next/link";
interface LogosProps {
  isOpen: boolean;
}
const Logos = ({ isOpen }: LogosProps) => {
  return (<>
    <Link href={'/dashboard'} className={`${!isOpen && "w-8 justify-center"} h-8 py-12 pt-14 group flex gap-4 items-center text-sm text-secondary justify-start  font-medium  rounded-full`}					>
      <div className="rounded-full">
        <Image
          src="/ico.png"
          alt="iconlogo"
          width={100}
          height={100}
          className="w-8 h-8"
        />
      </div>

      <div className={`whitespace-pre  duration-500 ${!isOpen && "opacity-0 hidden translate-x-28 overflow-hidden"}`}>
        <Image
          src="/logo.png"
          alt="iconlogo"
          width={100}
          height={100}
          className="w-full h-8"
        />
      </div>
    </Link>

  </>);
}

export default Logos;