import TabBar from "@/components/common/TabBar";

export default function TabBarLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
}
