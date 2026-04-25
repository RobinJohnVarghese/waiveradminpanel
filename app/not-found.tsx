import { Navbar } from "@/components/navbar";
import NotFound from "@/components/not-found";
import Sidebar from "@/components/sidebar";
import NextAuthProvider from "@/provider/auth-provider";


export default function NotFoundPage() {
  return (
    <NextAuthProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 md:p-8 pt-2 p32 overflow-y-auto bg-muted">
            <NotFound />
          </main>
        </div>
      </div>
    </NextAuthProvider>
  );
}
