"use client";

import NotificationBell from "./NotificationBell";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  type?: "back" | "logo";
}

const Header = ({ title, type = "logo" }: HeaderProps) => {
  const router = useRouter();
  return (
    <header className="w-full h-11 py-2.5 px-5 flex justify-between items-center">
      <button onClick={() => (type === "logo" ? router.push("/") : router.back())}>
        {type === "logo" ? <div /> : <ArrowLeftIcon className="size-6" />}
      </button>

      <h1 className="text-16_B h-fit">{title}</h1>

      <NotificationBell />
    </header>
  );
};

export default Header;
