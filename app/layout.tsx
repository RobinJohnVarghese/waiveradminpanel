import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/auth-provider";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/provider/toaster-provider";
import NextProgress from "@/components/next-progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waiver",
  description: "Waiver staff protal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("h-screen overflow-hidden", inter.className)}>
      <ToastProvider />
      <NextProgress />
      <NextAuthProvider>
        {children}
      </NextAuthProvider>
      </body>
      
    </html>
  );
}
