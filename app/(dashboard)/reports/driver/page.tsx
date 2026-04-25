import { getReportApi } from "@/actions/reports";

import { Client } from '@/app/(dashboard)/reports/driver/_components/client';

export default async function FleetOwnerPage() {
  const driverReport = await getReportApi("DVR");
  console.log('driverReport', driverReport);

  return (
    <div className="bg-white h-full p-4">
      <h2 className="text-2xl">Driver Reports</h2>
      <Client data={driverReport} />
    </div>
  );
}
