import { VConsoleProvider } from "./components/VConsoleProvider";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AppLayout } from "@/components/app-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLMCostRank",
  description: "LLM Cost Ranking - Compare LLM API Costs",
  metadataBase: new URL("https://llmcostrank.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative overflow-x-hidden`}
      >
        {/* 动态背景 - 浅色模式 */}
        <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-200 via-violet-200 to-fuchsia-200 light:bg-grid-pattern light:bg-[length:40px_40px]" />
        
        {/* 浮动光晕 - 浅色模式 */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none light:block hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-violet-300/40 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-200/30 rounded-full blur-3xl" />
        </div>

        {/* 动态背景 - 深色模式 */}
        <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-slate-800 via-zinc-900 to-stone-800 dark:bg-grid-pattern dark:bg-[length:40px_40px]" />
        
        {/* 浮动光晕 - 深色模式 */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none dark:block hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '-10s' }} />
        </div>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <VConsoleProvider />
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
