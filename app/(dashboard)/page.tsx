import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardStatsClient from "./_components/DashboardStatsClient";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const userPermissions = session?.user.permissions;

  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex-col w-full items-center justify-normal space-y-6 p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 w-full">
        Dashboard
      </h3>

      <DashboardStatsClient userPermissions={userPermissions} />
    </main>
  );
}
