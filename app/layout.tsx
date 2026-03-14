import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import AuthProvider from "@/components/common/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import FcmProvider from "@/components/common/FcmProvider";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: {
    default: "리콜체크",
    template: "리콜체크"
  },
  description: "리콜 제품을 빠르게 확인하세요",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "리콜체크",
    description: "리콜 제품을 빠르게 확인하세요",
    url: "https://recall-check.site",
    siteName: "리콜체크",
    locale: "ko_KR",
    type: "website"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`flex justify-center`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <AuthProvider>
              <FcmProvider />
              <main className=" relative h-dvh w-93.75">{children}</main>
            </AuthProvider>
            <Toaster />
            <Analytics />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
