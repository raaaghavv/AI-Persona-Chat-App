import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isSticky ? "sticky top-0 inset-x-0" : ""
      } bg-[#FDF6EE] z-99 flex items-center justify-between p-4 sm:px-8 sm:py-6 m-4 mt-0 border-b border-x rounded-b-4xl transition-all duration-300`}
    >
      <Link href={"/"} className="font-bold text-xl">
        PersonaAI
      </Link>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/raaaghavv"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md font-[500] flex items-center gap-2"
        >
          <span className="hidden sm:inline">GitHub</span>

          <span className="sm:hidden">
            <IconBrandGithub />
          </span>
        </a>

        <Link
          href={"#personas"}
          className="bg-[#E8DED3]/60 text-black rounded-full px-4 py-2 text-md font-[500] text-center"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
