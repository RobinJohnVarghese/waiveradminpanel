import { getHomeStats } from "@/actions/get-home-stats";
import BarCharts from "@/components/pages/dashboard/bar-chart";
import PiChart from "@/components/pages/dashboard/pi-chart";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Home() {
  const stats = await getHomeStats();
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex-col w-full items-center justify-normal space-y-6 p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 w-full">Dashboard</h3>

      {/* Users Statistics */}
      <Section title="Users Statistics">
        <StatGrid>
          <StatTile stat={stats?.user.total} label="Total Users" icon="/images/assets/total-users.png" />
          <StatTile stat={stats?.user.active} label="Active Users" icon="/images/assets/active.png" />
          <StatTile stat={stats?.user.blocked} label="Blocked Users" icon="/images/assets/blocked.png" />
        </StatGrid>

        {/* <PiChart stats={stats} />  */}
      </Section>

      {/* Drivers Statistics */}
      <Section title="Drivers Statistics">
        <StatGrid>
          <StatTile stat={stats?.driver.total} label="Total Drivers" icon="/images/assets/total-drivers.png" />
          <StatTile stat={stats?.driver.active} label="Active Drivers" icon="/images/assets/active.png" />
          <StatTile stat={stats?.driver.blocked} label="Blocked Drivers" icon="/images/assets/blocked.png" />
          <StatTile stat={stats?.driver.pending} label="Pending Drivers" icon="/images/assets/pending.png" />
          <StatTile stat={stats?.driver.rejected} label="Rejected Drivers" icon="/images/assets/blocked.png" />
          <StatTile stat={stats?.driver.earning} label="Drivers Earned" icon="/images/assets/earnings.png" />
        </StatGrid>
        {/* <BarCharts stats={stats} /> */}
      </Section>

      {/* Chauffeurs Statistics */}
      <Section title="Chauffeurs Statistics" customClass={true}>
        <StatGrid>
          <StatTile stat={stats?.chauffeur.total} label="Total Chauffeurs" icon="/images/assets/total-chauffeurs.png" />
          <StatTile stat={stats?.chauffeur.active} label="Active Chauffeurs" icon="/images/assets/active.png" />
          <StatTile stat={stats?.chauffeur.blocked} label="Blocked Chauffeurs" icon="/images/assets/blocked.png" />
          <StatTile stat={stats?.chauffeur.pending} label="Pending Chauffeurs" icon="/images/assets/pending.png" />
          <StatTile stat={stats?.chauffeur.rejected} label="Rejected Chauffeurs" icon="/images/assets/blocked.png" />
          <StatTile stat={stats?.chauffeur.earning} label="Chauffeurs Earned" icon="/images/assets/earnings.png" />
        </StatGrid>
      </Section>
    </main>
  );
}

const Section = ({ children, title, customClass = false }: { title: string; children: ReactNode, customClass?: boolean }) => {

  return (
    <div className={cn("border rounded-lg shadow-md bg-white w-full p-4 sm:p-6", {
      '!mb-20 md:mb-0': customClass
    })}>
      <h4 className="text-base sm:text-[16px] md:text-lg font-semibold text-gray-700 mb-3">{title}</h4>
      {children}
    </div>
  );
}

const StatGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">{children}</div>
);

const StatTile = ({ stat, label, icon }: { stat: number; label: string; icon: string }) => (
  <div className="bg-gradient-to-r from-white to-gray-50 border rounded-md shadow-sm p-3 md:p-4 flex items-center space-x-3 hover:shadow-md transition-shadow">
    <Image src={icon} alt={label} width={40} height={40} className="rounded-full bg-gray-200 p-2 shadow-inner" />
    <div className="flex flex-col">
      <h2 className="text-base sm:text-[16px] font-bold text-gray-800">{stat ?? 0}</h2>
      <p className="text-xs sm:text-sm text-gray-600">{label}</p>
    </div>
  </div>
);