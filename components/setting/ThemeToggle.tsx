"use client";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

const DarkModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="p-4 flex items-center justify-between">
      <label htmlFor="dark-mode" className="cursor-pointer">
        다크 모드로 전환
      </label>
      <Switch
        id="dark-mode"
        className="cursor-pointer"
        checked={isDark}
        onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
      />
    </div>
  );
};

export default DarkModeToggle;
