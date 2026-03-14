import Link from "next/link";
import { ReactNode } from "react";

interface HomeSectionWrapperProps {
  title: string;
  href?: string;
  children?: ReactNode;
}

const HomeSectionWrapper = ({ title, href, children }: HomeSectionWrapperProps) => {
  return (
    <section className="flex flex-col gap-5 px-4 py-5 bg-white overflow-hidden dark:bg-zinc-800">
      <div className="flex justify-between items-center">
        <h2 className="text-16_B text-gray-950 dark:text-gray-100">{title}</h2>
        {href && (
          <Link href={href}>
            <span className="text-14_M text-gray-500 dark:text-gray-400 underline">더보기</span>
          </Link>
        )}
      </div>

      {children}
    </section>
  );
};

export default HomeSectionWrapper;
