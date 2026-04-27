import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex h-full">
        <Sidebar session={session} />

        <main className="flex-1 md:p-8 pt-2 p32 overflow-y-auto bg-muted">
          {children}
        </main>
      </div>
    </div>
  );
}
