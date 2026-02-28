import { BellIcon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="w-full h-11 py-2.5 px-5 flex justify-between items-center">
      <Link href="/">
        {/* 로고 아이콘 추후 추가 예정 */}
        <div className="w-6 h-6 bg-blue-400" />
      </Link>

      <h1 className="text-16_B h-fit">{title}</h1>

      {/* 나중에 알림 아이콘을 컴포넌트로 따로 빼야 함 */}
      <BellIcon className="w-6 h-6 bg-blue-400" />
    </header>
  );
};

export default Header;
