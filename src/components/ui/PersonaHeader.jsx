import { ArrowLeft, Verified } from "lucide-react";
import Link from "next/link";

export default function PersonaHeader({ persona, messages }) {
  return (
    <header
      className={`z-99 flex items-center justify-between sm:px-8 sm:py-4 m-4`}
    >
      {messages.length > 0 && (
        <Link href={"/"} className="sm:hidden font-bold text-xl">
          <ArrowLeft />
        </Link>
      )}
      <Link
        href={"/"}
        className={`${
          messages.length > 0 ? "hidden" : ""
        } sm:block font-bold text-xl`}
      >
        PersonaAI
      </Link>
      {messages.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold overflow-hidden">
            {(
              <img
                src={persona.image}
                alt={persona.name}
                className="w-full h-full object-cover"
              />
            ) || persona.name[0]}
          </div>
          <div>
            <h2 className="font-semibold text-lg flex items-center gap-1">
              {persona.name} - Trial
              <span>
                <Verified className="text-white fill-orange-500 w-7 h-7" />
              </span>
            </h2>
          </div>
        </div>
      )}
      <div className="rounded-full px-2.5 py-1 bg-gray-200 flex items-center justify-center text-md font-[500]">
        Login
      </div>
    </header>
  );
}
