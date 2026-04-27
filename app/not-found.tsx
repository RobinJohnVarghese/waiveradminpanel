import { Navbar } from "@/components/navbar";
import NotFound from "@/components/not-found";
import Sidebar from "@/components/sidebar";
import { authOptions } from "@/lib/auth";
import NextAuthProvider from "@/provider/auth-provider";
import { getServerSession } from "next-auth";

export default async function NotFoundPage() {
  const session = await getServerSession(authOptions);
  return (
    <NextAuthProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-full">
          <Sidebar session={session} />
          <main className="flex-1 md:p-8 pt-2 p32 overflow-y-auto bg-muted">
            <NotFound />
          </main>
        </div>
      </div>
    </NextAuthProvider>
  );
}
