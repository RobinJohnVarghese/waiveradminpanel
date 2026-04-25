import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />

        <main className="flex-1 md:p-8 pt-2 p32 overflow-y-auto bg-muted">
          {children}
        </main>
      </div>
    </div>
  );
}
